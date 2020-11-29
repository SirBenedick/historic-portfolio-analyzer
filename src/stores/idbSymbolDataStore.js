import dbPromise from "./dbPromise";
import portfolioStore from "./DataStore";
import moment from "moment";
import notificationStore from "./NotificationStore";
import symbolDataStore from "./SymbolDataStore";
import keyMetricsStore from "./KeyMetricsStore";

/**
 * primary key: symbol
 * Format of object stored (example):
{
  symbol: "AAPL", 
  meta_data: {
  symbol_ticker: "AAPL"
  data_fetched: "2020-11-18",
  time_zone: "US/Eastern",
  },
  time_series_daily:{
    "2020-11-10": {...}
  } 
}
 */
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
    if (data && "time_series_daily" in data) {
      if (data["time_series_daily"][date]) return data["time_series_daily"][date]["5. adjusted close"];
    }
    return false;
  },
  async getTimeSeriesDailyByTicker(key) {
    const data = await this.get(key);
    if (data && "time_series_daily" in data && data["time_series_daily"]) return data["time_series_daily"];
    return false;
  },
  async getTimeSeriesDailyByTickerFormated(key) {
    console.log("getTimeSeriesDailyByTickerFormated: " + key);
    const data = await this.get(key);
    if (data && "time_series_daily" in data && data["time_series_daily"]) return formateDataToChartFormat(data);
    return false;
  },
  async formatAndStoreSymbolData(symbolTicker, rawData) {
    let meta_data = {
      symbol_ticker: rawData["Meta Data"]["2. Symbol"],
      date_fetched: rawData["Meta Data"]["3. Last Refreshed"],
      time_zone: rawData["Meta Data"]["5. Time Zone"],
    };

    let formatedData = {
      symbol: symbolTicker,
      meta_data: meta_data,
      time_series_daily: rawData["Time Series (Daily)"],
    };
    await this.set(formatedData);
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
    let startingDate = moment(portfolioStore.portfolioStartingDate);
    let endDate = moment();
    const daysSinceStart = endDate.diff(startingDate, "days") + 1;
    await Promise.all(
      portfolioStore.symbolsWithoutPortfolio.map(async (symbolSet) => {
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
        portfolioStore.setPerformanceSincePortfolioStartForTicker(symbolSet.symbolTicker, performanceSinceStart);
        // Calculate yearlyPerformanceSinceStart for this symbol and store the value
        const yearlyPerformanceSinceStart = performanceSinceStart * (365 / daysSinceStart);
        portfolioStore.setYearlyPerformanceSincePortfolioStartForTicker(
          symbolSet.symbolTicker,
          yearlyPerformanceSinceStart
        );

        // Calculate quantity for this symbol
        const startingDateValueOfThisSymbol = portfolioStore.getSymbolSetForTicker(symbolSet.symbolTicker)["value"];
        const quantity = parseFloat(startingDateValueOfThisSymbol) / parseFloat(startingDatePriceValue);

        symbolQuantityMap[symbolSet.symbolTicker] = quantity;

        const endValue = endDatePriceValue * quantity;
        portfolioStore.setEndValueForTicker(symbolSet.symbolTicker, endValue);
      })
    );

    // Generate a list of all days between portfolioStore.portfolioStartingDate and today (including both days)
    console.log("Portfolio - list of dates");
    let datesToCheck = [];
    let date = moment(portfolioStore.portfolioStartingDate);
    while (date.isBefore()) {
      datesToCheck.push(date.format("YYYY-MM-DD"));
      date.add(1, "days");
    }

    // Iterate through all days and calculate the total value
    console.log("Portfolio - calculating for each day");
    let tempSymbolDatasetMap = {};
    await Promise.all(
      portfolioStore.symbolsWithoutPortfolio.map(async (symbolSet) => {
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
        portfolioStore.setPerformanceSincePortfolioStartForTicker("Portfolio", performanceSinceStartPortfolio);
        // Calculate yearlyPerformanceSinceStart for portfolio and store the value
        const yearlyPerformanceSinceStartPortfolio = performanceSinceStartPortfolio * (365 / daysSinceStart);
        portfolioStore.setYearlyPerformanceSincePortfolioStartForTicker(
          "Portfolio",
          yearlyPerformanceSinceStartPortfolio
        );

        portfolioStore.setTotalDividendPayoutForTicker("Portfolio", sumOfDividends);
        portfolioStore.setEndValueForTicker("Portfolio", startingDatePriceValuePortfolio);

        // Calculate key metrics
        keyMetricsStore.calculateAndSetPortfolioSharpRatio();

        // Calculate drawdown function
        keyMetricsStore.calculateAndSetPortfolioDrawdown(result);
      }
    });

    symbolDataStore.setIsCalculatingPortfolioPerformance(false);
    return result;
  },
};

const formateDataToChartFormat = (symbolData) => {
  let temp = [];
  for (const [key, dailyInformation] of Object.entries(symbolData["time_series_daily"])) {
    temp.push({ time: String(key), value: parseFloat(dailyInformation["5. adjusted close"]) });
  }
  return temp.reverse();
};

export default idbSymbolDataStore;
