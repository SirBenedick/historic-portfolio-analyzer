import dbPromise from "./dbPromise";
import dataStore from "./DataStore";
import moment from "moment";
import FetchDataService from "../services/FetchDataService";
import idbPortfolioStore from "./idbPortfolioStore";
import notificationStore from "./NotificationStore";
import configStore from "./ConfigStore";
import symbolDataStore from "./SymbolDataStore";

const idbSymbolDataStore = {
  async get(key) {
    return (await dbPromise).get("symbolDataStore", key);
  },
  async set(val) {
    return (await dbPromise).put("symbolDataStore", val);
  },
  async delete(key) {
    return (await dbPromise).delete("symbolDataStore", key);
  },
  async clear() {
    return (await dbPromise).clear("symbolDataStore");
  },
  async keys() {
    return (await dbPromise).getAllKeys("symbolDataStore");
  },
  async getAdjustedCloseByTickerAndDate(key, date) {
    const data = await this.get(key);
    if (data && "Time Series (Daily)" in data) {
      if (data["Time Series (Daily)"][date]) return data["Time Series (Daily)"][date]["5. adjusted close"];
    }
    return false;
  },
  async getDataChartFormatBySymbol(key) {
    console.log("getDataChartFormatBySymbol: " + key);
    // TODO ensure consistent order old -> new
    if (key === "Portfolio") {
      const doesPortfolioDataExist = await idbPortfolioStore.doesDataSeriesExist();
      if (doesPortfolioDataExist) {
        return idbPortfolioStore.get("dataSeries");
      } else {
        return this.calculateAndStoreHistoricPortfolioPerformance();
      }
    } else {
      return (await dbPromise).get("symbolDataStore", key).then(async (symbolData) => {
        // Check doesTimesSeriesDailyAdjustedExistForSymbol else fetch data
        if (symbolData && "Time Series (Daily)" in symbolData && symbolData["Time Series (Daily)"]) {
          return formateDataToChartFormat(symbolData);
        } else {
          // Check if api token exist
          if (configStore.alphaVantage.apiToken) {
            const wasDataFetched = await FetchDataService.fetchDataDailyAdjustedForSymbolAlphaVantage(key);
            if (wasDataFetched) return this.getDataChartFormatBySymbol(key);
          } else {
            notificationStore.enqueueSnackbar({
              message: `Please enter an API key on the Settings Page`,
              options: {
                variant: "error",
                autoHideDuration: 2500,
              },
              key: notificationStore.keys.API_TOKEN_MISSING,
            });
          }
        }
      });
    }
  },
  async doesTimesSeriesDailyAdjustedExistForSymbol(key) {
    const data = await this.get(key);
    if (data && "Time Series (Daily)" in data && data["Time Series (Daily)"]) return true;
    return false;
  },
  async getTimeSeriesDailyByTicker(symbolTicker) {
    const data = await this.get(symbolTicker);
    return data["Time Series (Daily)"];
  },
  async calculateAndStoreHistoricPortfolioPerformance() {
    console.log("calculateAndStoreHistoricPortfolioPerformance");
    notificationStore.enqueueSnackbar({
      message: `Calculating Portfolio value`,
      options: {
        variant: "info",
        autoHideDuration: 2000,
      },
      key: notificationStore.keys.PORTFOLIO_CALCULATING,
    });
    symbolDataStore.setIsCalculatingPortfolioPerformance(true);

    //  Calculate for each asset the quantity at portfolio start and the performance since
    console.log("Portfolio - calculating quantity");
    let symbolQuantityMap = {};
    let startingDate = moment(dataStore.portfolioStartingDate);
    let endDate = moment();
    const daysSinceStart = endDate.diff(startingDate, "days") + 1;
    await Promise.all(
      dataStore.getSymbolsWithoutPortfolio().map(async (symbolSet) => {
        // Get price of asset for the portfolio starting date
        let startingDatePriceValue = await idbSymbolDataStore.getAdjustedCloseByTickerAndDate(
          symbolSet.symbolTicker,
          startingDate.format("YYYY-MM-DD")
        );

        while (!startingDatePriceValue) {
          startingDate.add(1, "days");
          startingDatePriceValue = await idbSymbolDataStore.getAdjustedCloseByTickerAndDate(
            symbolSet.symbolTicker,
            startingDate.format("YYYY-MM-DD")
          );
        }

        // Get price of asset for the portfolio end date
        let endDatePriceValue = await idbSymbolDataStore.getAdjustedCloseByTickerAndDate(
          symbolSet.symbolTicker,
          endDate.format("YYYY-MM-DD")
        );

        while (!endDatePriceValue) {
          endDate.subtract(1, "days");
          endDatePriceValue = await idbSymbolDataStore.getAdjustedCloseByTickerAndDate(
            symbolSet.symbolTicker,
            endDate.format("YYYY-MM-DD")
          );
        }

        // Calculate performanceSinceStart for this symbol and store the value
        const performanceSinceStart = parseFloat(endDatePriceValue) / parseFloat(startingDatePriceValue) - 1;
        dataStore.setPerformanceSincePortfolioStartForTicker(symbolSet.symbolTicker, performanceSinceStart);
        // Calculate yearlyPerformanceSinceStart for this symbol and store the value
        const yearlyPerformanceSinceStart = performanceSinceStart * (365 / daysSinceStart);
        dataStore.setYearlyPerformanceSincePortfolioStartForTicker(symbolSet.symbolTicker, yearlyPerformanceSinceStart);

        // Calculate quantity for this symbol
        const startingDateValueOfThisSymbol = dataStore.getSymbolSetForTicker(symbolSet.symbolTicker)["value"];
        const quantity = parseFloat(startingDateValueOfThisSymbol) / parseFloat(startingDatePriceValue);

        symbolQuantityMap[symbolSet.symbolTicker] = quantity;

        const endValue = endDatePriceValue * quantity;
        dataStore.setEndValueForTicker(symbolSet.symbolTicker, endValue);
      })
    );

    // Generate a list of all days between dataStore.portfolioStartingDate and today (including both days)
    console.log("Portfolio - list of dates");
    let datesToCheck = [];
    let date = moment(dataStore.portfolioStartingDate);
    while (date.isBefore()) {
      datesToCheck.push(date.format("YYYY-MM-DD"));
      date.add(1, "days");
    }

    // Iterate through all days and calculate the total value
    console.log("Portfolio - calculating for each day");
    let tempSymbolDatasetMap = {};
    await Promise.all(
      dataStore.getSymbolsWithoutPortfolio().map(async (symbolSet) => {
        let tempDataSet = await idbSymbolDataStore.getTimeSeriesDailyByTicker(symbolSet.symbolTicker);
        tempSymbolDatasetMap[symbolSet.symbolTicker] = tempDataSet;
      })
    );

    let result = [];
    datesToCheck.forEach((date) => {
      let tempSumForDate = 0;
      for (const [symbolTicker, dataset] of Object.entries(tempSymbolDatasetMap)) {
        if (!(date in dataset)) return;
        let tempValue = dataset[date]["5. adjusted close"];
        tempSumForDate += tempValue * symbolQuantityMap[symbolTicker];
      }
      if (tempSumForDate) result.push({ time: date, value: tempSumForDate });
    });

    idbPortfolioStore.set("dataSeries", result).then((res) => {
      if (result.length !== 0) {
        const endDatePriceValuePortfolio = result[0].value;
        const startingDatePriceValuePortfolio = result[result.length - 1].value;
        // Calculate performanceSinceStart for portfolio and store the value
        const performanceSinceStartPortfolio =
          parseFloat(startingDatePriceValuePortfolio) / parseFloat(endDatePriceValuePortfolio) - 1;
        dataStore.setPerformanceSincePortfolioStartForTicker("Portfolio", performanceSinceStartPortfolio);
        // Calculate yearlyPerformanceSinceStart for portfolio and store the value
        const yearlyPerformanceSinceStartPortfolio = performanceSinceStartPortfolio * (365 / daysSinceStart);
        dataStore.setYearlyPerformanceSincePortfolioStartForTicker("Portfolio", yearlyPerformanceSinceStartPortfolio);

        dataStore.setEndValueForTicker("Portfolio", startingDatePriceValuePortfolio);
      }
    });

    symbolDataStore.setIsCalculatingPortfolioPerformance(false);
    return result;
  },
};

const formateDataToChartFormat = (symbolData) => {
  let temp = [];
  for (const [key, dailyInformation] of Object.entries(symbolData["Time Series (Daily)"])) {
    temp.push({ time: String(key), value: parseFloat(dailyInformation["5. adjusted close"]) });
  }
  return temp.reverse();
};

export default idbSymbolDataStore;
