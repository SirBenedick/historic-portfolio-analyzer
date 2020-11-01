import { makeObservable, observable, action, computed, toJS } from "mobx";

class DataStore {
  symbols = [];
  pendingRequests = 0;
  appleData = [];
  allData = [];
  portfolioStartingDate = "";

  constructor() {
    makeObservable(this, {
      symbols: observable, // = { symbolTicker: "All", isVisible: true, dataFetched: false }
      allData: observable, // = [{ time: "2019-04-11", assets: { AAPL: { symbol: "AAPL", value: 80.21 }, "AMZN"... } }];
      portfolioStartingDate: observable,
      toggleSymbolVisibility: action,
      addSymbol: action,
      setValueForTicker: action,
      setSymbolsDataFetched: action,
      addSymbolDataToAllData: action,
      setPortfolioStartingDate: action,
      symbolsTickerAndDataFetchedOnlyValid: computed,
      totalValueOfSymbols: computed,
    });

    const d = new Date();
    this.portfolioStartingDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    this.addSymbol({
      symbolTicker: "All",
      isVisible: true,
      dataFetched: false,
      value: 0,
      color: this.nextAvailableColorValue(),
    });
    this.addSymbol({
      symbolTicker: "AAPL",
      isVisible: true,
      dataFetched: false,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
    this.addSymbol({
      symbolTicker: "MSFT",
      isVisible: true,
      dataFetched: false,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
    this.addSymbol({
      symbolTicker: "AMZN",
      isVisible: true,
      dataFetched: false,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
  }

  addSymbolDataToAllData(symbolTicker, data) {
    // data = [{ time: "2019-04-11", value: 80.01 }]
    // result = [{ time: "2019-04-11", assets: { AAPL: { symbolTicker: "AAPL", value: 80.21 } } }];
    if (this.allData.length === 0) {
      data.forEach((entry) => {
        const assetTemp = {};
        assetTemp[symbolTicker] = { symbolTicker: symbolTicker, value: entry.value };

        this.allData.push({
          time: entry.time,
          assets: assetTemp,
        });
      });
    }
    data.forEach((entry) => {
      let timestampEntryIndex = this.allData.findIndex((entryAllData) => entry.time === entryAllData.time);
      if (timestampEntryIndex >= 0) {
        this.allData[timestampEntryIndex]["assets"][symbolTicker] = { symbolTicker: symbolTicker, value: entry.value };
      } else {
        const assetTemp = {};
        assetTemp[symbolTicker] = { symbolTicker: symbolTicker, value: entry.value };

        this.allData.push({
          time: entry.time,
          assets: assetTemp,
        });
      }
    });
    this.setSymbolsDataFetched(symbolTicker, true);
  }

  addSymbol(newSymbol) {
    this.symbols.push(newSymbol);
  }

  toggleSymbolVisibility(changedSymbolbyTicker) {
    console.log(changedSymbolbyTicker);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolbyTicker) {
        symbol.isVisible = !symbol.isVisible;
      }
    });
  }

  setSymbolsDataFetched(changedSymbolbyTicker, dataFetched) {
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolbyTicker) {
        symbol.dataFetched = dataFetched;
      }
    });
  }

  setPortfolioStartingDate(date) {
    this.portfolioStartingDate = date;
  }

  get symbolsTickerAndDataFetchedOnlyValid() {
    let tempResult = this.symbols.map((symbolSet) => {
      if (symbolSet.symbolTicker != "All") {
        return { symbolTicker: symbolSet.symbolTicker, dataFetched: symbolSet.dataFetched };
      } else return false;
    });
    return tempResult.filter((symbolSet) => symbolSet);
  }

  get totalValueOfSymbols() {
    return this.symbols.reduce((pv, symbolSet) => {
      if (symbolSet.symbolTicker !== "All") return +pv + +symbolSet.value;
      else return pv;
    }, 0);
  }

  isDataFetchedForAllSymbols() {
    console.log("isDataFetchedForAllSymbols");
    let bool = true;
    this.symbols.forEach((symbolSet) => {
      if (symbolSet.symbolTicker === "All") return;
      if (!symbolSet.dataFetched) bool = false;
    });
    return bool;
  }

  dataForAllCalculated() {
    console.log("dataForAllCalculated");
    //TODO Make sure its a trading day or identify next trading day
    if (!this.isDataFetchedForAllSymbols()) return { symbol: "All", data: false };

    const startingDayAssets = toJS(this.allData.find((entry) => entry.time === toJS(this.portfolioStartingDate)));

    const tickerValueMap = {};
    this.symbols.forEach((symbolSet) => {
      if (symbolSet.symbolTicker === "All") return;
      const quantity = parseFloat(symbolSet.value) / parseFloat(startingDayAssets.assets[symbolSet.symbolTicker].value);
      tickerValueMap[symbolSet.symbolTicker] = { startingValue: symbolSet.value, quantity: quantity };
    });

    const temp = this.allData.map((entry) => {
      if (entry.time < this.portfolioStartingDate) return null;
      let tempValue = 0;
      Object.keys(entry.assets).forEach((key) => {
        const price = entry.assets[key].value;
        const quantity = tickerValueMap[key].quantity;
        tempValue += +price * +quantity;
      });
      return { time: entry.time, value: tempValue };
    });
    const temp2 = temp.filter((entry) => {
      console.log(entry)
      if (entry) return entry;
    });


    return { symbol: "All", data: temp2 };
  }

  getSymbolSetForTicker(symbolTicker) {
    return this.symbols.find((symbolSet) => symbolSet.symbolTicker === symbolTicker);
  }

  setValueForTicker(changedSymbolByTicker, value) {
    console.log("Updating value: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.value = value;
      }
    });
  }

  dataForSymbolTicker(symbolTicker) {
    if (symbolTicker === "All") return this.dataForAllCalculated();
    const temp = this.allData.map((entry) => {
      return { time: entry.time, value: entry.assets[symbolTicker].value };
    });
    return { symbol: symbolTicker, data: temp };
  }

  nextAvailableColorValue() {
    let availableColorValue = null;
    for (let index = 0; index < chartColorsForSeries.length; index++) {
      const element = chartColorsForSeries[index];
      if (!element.isBegingUsed) {
        availableColorValue = element.colorValue;
        element.isBegingUsed = true;
        break;
      }
    }
    return availableColorValue;
  }

  removeColorInUse(colorValue) {
    for (let index = 0; index < chartColorsForSeries.length; index++) {
      const element = chartColorsForSeries[index];
      if (element.colorValue === colorValue) {
        element.isBegingUsed = false;
        break;
      }
    }
  }
}

const chartColorsForSeries = [
  { colorValue: "#3f51b5", isBegingUsed: false },
  { colorValue: "#2196f3", isBegingUsed: false },
  { colorValue: "#03a9f4", isBegingUsed: false },
  { colorValue: "#00bcd4", isBegingUsed: false },
  { colorValue: "#009688", isBegingUsed: false },
  { colorValue: "#4caf50", isBegingUsed: false },
  { colorValue: "#8bc34a", isBegingUsed: false },
  { colorValue: "#cddc39", isBegingUsed: false },
];

const dataStore = new DataStore();
export default dataStore;
