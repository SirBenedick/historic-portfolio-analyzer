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
      symbolTicker: "IBM",
      isVisible: true,
      dataFetched: false,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
    this.addSymbol({
      symbolTicker: "BA",
      isVisible: true,
      dataFetched: false,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
    this.addSymbol({
      symbolTicker: "DAI.DEX",
      isVisible: true,
      dataFetched: false,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
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
      if (symbolSet.symbolTicker !== "All") {
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

  getSymbolSetForTicker(symbolTicker) {
    return toJS(this.symbols.find((symbolSet) => symbolSet.symbolTicker === symbolTicker));
  }

  getSymbolsWithoutAll() {
    return this.symbols.filter((symbolSet) => symbolSet.symbolTicker !== "All");
  }

  setValueForTicker(changedSymbolByTicker, value) {
    console.log("Updating value: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.value = value;
      }
    });
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
