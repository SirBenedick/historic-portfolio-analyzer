import { makeObservable, observable, action, computed, toJS, autorun } from "mobx";
import moment from "moment";
import FetchDataService from "../services/FetchDataService";
import idbSymbolDataStore from "./SymbolDataStore";
class DataStore {
  symbols = [
    {
      symbolTicker: "All",
      isVisible: true,
      value: 0,
      color: this.nextAvailableColorValue(),
    },
  ];
  pendingRequests = 0;
  appleData = [];
  portfolioStartingDate = "";
  triggerRerenderOfPortfolio = false;

  constructor() {
    makeObservable(this, {
      symbols: observable,
      triggerRerenderOfPortfolio: observable,
      portfolioStartingDate: observable,
      toggleSymbolVisibility: action,
      addSymbol: action,
      setValueForTicker: action,
      setTriggerRerenderOfPortfolio: action,
      setPortfolioStartingDate: action,
      totalValueOfSymbols: computed,
    });

    this.portfolioStartingDate = moment().subtract(1, "weeks").format("YYYY-MM-DD");

    this.addSymbol({
      symbolTicker: "AAPL",
      isVisible: true,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
    this.addSymbol({
      symbolTicker: "MSFT",
      isVisible: true,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
    this.addSymbol({
      symbolTicker: "IBM",
      isVisible: true,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
    this.addSymbol({
      symbolTicker: "BA",
      isVisible: true,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
    this.addSymbol({
      symbolTicker: "DAI.DEX",
      isVisible: true,
      value: 100,
      color: this.nextAvailableColorValue(),
    });

    autorun(() => {
      const trigger = this.portfolioStartingDate;
      const trigger2 = this.totalValueOfSymbols;
      this.setTriggerRerenderOfPortfolio(true);
      console.log("Autorun");
    });
  }

  setTriggerRerenderOfPortfolio(bool) {
    this.triggerRerenderOfPortfolio = bool;
  }

  async addSymbol(newSymbol) {
    this.symbols.push(newSymbol);
    const doesDataAlreadyExists = await idbSymbolDataStore.doesTimesSeriesDailyAdjustedExistForSymbol(
      newSymbol.symbolTicker
    );
    if (!doesDataAlreadyExists) FetchDataService.fetchDataDailyAdjustedForSymbolAlphaVantage(newSymbol.symbolTicker);
  }

  toggleSymbolVisibility(changedSymbolbyTicker) {
    console.log(changedSymbolbyTicker);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolbyTicker) {
        symbol.isVisible = !symbol.isVisible;
      }
    });
  }

  setPortfolioStartingDate(date) {
    this.portfolioStartingDate = date;
  }

  get totalValueOfSymbols() {
    return this.symbols.reduce((pv, symbolSet) => {
      if (symbolSet.symbolTicker !== "All") return +pv + +symbolSet.value;
      else return pv;
    }, 0);
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
