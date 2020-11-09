import dbPromise from "./dbPromise";
import dataStore from "./DataStore";
import moment from "moment";
import notificationStore from "./NotificationStore";
import symbolDataStore from "./SymbolDataStore";
import keyMetricsStore from "./KeyMetricsStore";

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
  async getTimeSeriesDailyByTicker(key) {
    const data = await this.get(key);
    if (data && "Time Series (Daily)" in data && data["Time Series (Daily)"]) return data["Time Series (Daily)"];
    return false;
  },
  async getTimeSeriesDailyByTickerFormated(key) {
    console.log("getTimeSeriesDailyByTickerFormated: " + key);
    const data = await this.get(key);
    if (data && "Time Series (Daily)" in data && data["Time Series (Daily)"]) return formateDataToChartFormat(data);
    return false;
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
    let sumOfDividends = 0;
    datesToCheck.forEach((date) => {
      let tempSumForDate = 0;
      for (const [symbolTicker, dataset] of Object.entries(tempSymbolDatasetMap)) {
        if (dataset && !(date in dataset)) return;
        const dividend = dataset[date]["7. dividend amount"];
        sumOfDividends += dividend * symbolQuantityMap[symbolTicker];
        const stockValue = dataset[date]["5. adjusted close"];
        tempSumForDate += stockValue * symbolQuantityMap[symbolTicker];
      }
      if (tempSumForDate) result.push({ time: date, value: tempSumForDate });
    });

    symbolDataStore.setTimeseriesForTicker("Portfolio", result).then((res) => {
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

        dataStore.setTotalDividendPayoutForTicker("Portfolio", sumOfDividends);
        dataStore.setEndValueForTicker("Portfolio", startingDatePriceValuePortfolio);

        // Calculate key metrics
        keyMetricsStore.calculateAndSetPortfolioSharpRatio();
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
