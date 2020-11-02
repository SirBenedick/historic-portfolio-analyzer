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
    if (key !== "All") {
      return (await dbPromise).get("symbolDataStore", key).then((symbolData) => {
        if (symbolData) return formateDataToChartFormat(symbolData);
        else return false;
      });
    } else {
      // TODO check if has to be await call
      if (dataStore.getSymbolSetForTicker("All").dataFetched) {
        return idbPortfolioStore.get("dataSeries");
      } else {
        return calculateAndStoreHistoricPortfolioPerformance();
      }
    }
  },
  async getTimeSeriesDailyByTicker(symbolTicker) {
    const data = await this.get(symbolTicker);
    return data["Time Series (Daily)"];
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
};

const formateDataToChartFormat = (symbolData) => {
  let temp = [];
  for (const [key, dailyInformation] of Object.entries(symbolData["Time Series (Daily)"])) {
    temp.push({ time: String(key), value: parseFloat(dailyInformation["5. adjusted close"]) });
  }
  return temp.reverse();
};

const calculateAndStoreHistoricPortfolioPerformance = async () => {
  console.log("calculateAndStoreHistoricPortfolioPerformance");
  const key_snackbar_notification = notificationStore.enqueueSnackbar({
    message: `Calculating Portfolio value`,
    options: {
      variant: "info",
      persistent: true
    },
  });
  if (!dataStore.isDataFetchedForAllSymbols()) {
    await FetchDataService.fetchDataForAllSymbolsAlphaVantage();
  }

  //  Calculate the quanity of each asset at the starting day
  console.log("Portfolio - calculating quantity");
  let symbolQuantityMap = {};
  let startingDate = moment(dataStore.portfolioStartingDate);
  await Promise.all(
    dataStore.getSymbolsWithoutAll().map(async (symbolSet) => {
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

      const startingDatePortfolioValue = dataStore.getSymbolSetForTicker(symbolSet.symbolTicker)["value"];
      symbolQuantityMap[symbolSet.symbolTicker] =
        parseFloat(startingDatePortfolioValue) / parseFloat(startingDatePriceValue);
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
  dataStore.setSymbolsDataFetched("All", true);
  notificationStore.removeSnackbar(key_snackbar_notification)
  return result;
};

export default idbSymbolDataStore;
