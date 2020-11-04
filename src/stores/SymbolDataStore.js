import dbPromise from "./dbPromise";
import dataStore from "./DataStore";
import moment from "moment";
import FetchDataService from "../services/FetchDataService";
import idbPortfolioStore from "./PortfolioStore";
import notificationStore from "./NotificationStore";

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
          const wasDataFetched = await FetchDataService.fetchDataDailyAdjustedForSymbolAlphaVantage(key);
          if (wasDataFetched) return this.getDataChartFormatBySymbol(key);
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
    });

    //  Calculate for each asset the quantity at portfolio start and the performance since
    console.log("Portfolio - calculating quantity");
    let symbolQuantityMap = {};
    let startingDate = moment(dataStore.portfolioStartingDate);
    let endDate = moment();
    await Promise.all(
      dataStore.getSymbolsWithoutAll().map(async (symbolSet) => {
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
        const performanceSinceStart = parseFloat(endDatePriceValue) / parseFloat(startingDatePriceValue);
        dataStore.setPerformanceSincePortfolioStartForTicker(symbolSet.symbolTicker, performanceSinceStart);

        // Calculate quantity for this symbol
        const startingDateValueOfThisSymbol = dataStore.getSymbolSetForTicker(symbolSet.symbolTicker)["value"];
        const quantity = parseFloat(startingDateValueOfThisSymbol) / parseFloat(startingDatePriceValue);

        symbolQuantityMap[symbolSet.symbolTicker] = quantity;
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
      dataStore.getSymbolsWithoutAll().map(async (symbolSet) => {
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

    await idbPortfolioStore.set("dataSeries", result);
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
