import { openDB } from "idb";
import dataStore from "./DataStore";
import moment from "moment";
import fetchDataService from "../services/FetchDataService";

if (!("indexedDB" in window)) {
  console.log("This browser doesn't support IndexedDB");
}

const dbPromise = openDB("keyval-store", 1, {
  upgrade(db) {
    console.log("Creating new symbolDataStore");
    if (!db.objectStoreNames.contains("symbolDataStore")) {
      db.createObjectStore("symbolDataStore", {
        keyPath: "symbol",
        autoIncrement: false,
      });
    }
  },
});

const idbSymbolDataStore = {
  async get(key) {
    return (await dbPromise).get("symbolDataStore", key);
  },
  async getAdjustedCloseByTickerAndDate(key, date) {
    const data = await this.get(key);
    if (data["Time Series (Daily)"][date]) return data["Time Series (Daily)"][date]["5. adjusted close"];
    else return false;
  },
  async getDataChartFormatBySymbol(key) {
    console.log("getDataChartFormatBySymbol: " + key);
    // TODO ensure consistent order old -> new
    if (key !== "All") {
      return (await dbPromise).get("symbolDataStore", key).then((symbolData) => {
        return formateDataToChartFormat(symbolData);
      });
    } else {
      // TODO check if has to be await call
      return formateDataToChartForPortfolio();
    }
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

const formateDataToChartForPortfolio = async () => {
  console.log("formateDataToChartForPortfolio");
  if (!dataStore.isDataFetchedForAllSymbols()) {
    await fetchDataService.fetchDataForAllSymbolsAlphaVantage();
  }

  //  Calculate the quanity of each asset at the starting day
  let symbolQuantityMap = {};
  await Promise.all(
    dataStore.getSymbolsWithoutAll().map(async (symbolSet) => {
      const startingDatePriceValue = await idbSymbolDataStore.getAdjustedCloseByTickerAndDate(
        symbolSet.symbolTicker,
        dataStore.portfolioStartingDate
      );
      const startingDatePortfolioValue = dataStore.getSymbolSetForTicker(symbolSet.symbolTicker)["value"];
      symbolQuantityMap[symbolSet.symbolTicker] =
        parseFloat(startingDatePortfolioValue) / parseFloat(startingDatePriceValue);
    })
  );

  // Generate a list of all days between dataStore.portfolioStartingDate and today (including both days)
  let datesToCheck = [];
  let date = moment(dataStore.portfolioStartingDate);
  while (date.isBefore()) {
    datesToCheck.push(date.format("YYYY-MM-DD"));
    date.add(1, "days");
  }

  // Iterate through all days and calculate the total value
  let result = [];
  await Promise.all(
    datesToCheck.map(async (date) => {
      let tempSumForDate = 0;
      await Promise.all(
        dataStore.getSymbolsWithoutAll().map(async (symbolSet) => {
          let tempValue = await idbSymbolDataStore.getAdjustedCloseByTickerAndDate(symbolSet.symbolTicker, date);
          if (!tempValue) return;
          tempSumForDate += tempValue * symbolQuantityMap[symbolSet.symbolTicker];
        })
      );
      if (tempSumForDate) result.push({ time: date, value: tempSumForDate });
    })
  );
  return result;
};

export default idbSymbolDataStore;
