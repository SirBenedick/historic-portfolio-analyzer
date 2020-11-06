import { makeObservable, observable, action, computed, toJS, autorun } from "mobx";
import moment from "moment";
import FetchDataService from "../services/FetchDataService";
import configStore from "./ConfigStore";
import idbSymbolDataStore from "./idbSymbolDataStore";
import notificationStore from "./NotificationStore";
class DataStore {
  symbols = [
    {
      symbolTicker: "Portfolio",
      isVisible: true,
      value: 0,
      color: this.nextAvailableColorValue(),
    },
  ];
  pendingRequests = 0;
  appleData = [];
  portfolioStartingDate = "";
  triggerRecalculatePortfolio = false;
  triggerRerenderVisibleLines = false;

  constructor() {
    makeObservable(this, {
      symbols: observable,
      triggerRecalculatePortfolio: observable,
      triggerRerenderVisibleLines: observable,
      portfolioStartingDate: observable,
      toggleSymbolVisibility: action,
      addSymbol: action,
      setValueForTicker: action,
      setPerformanceSincePortfolioStartForTicker: action,
      setTriggerRecalculatePortfolio: action,
      setTriggerRerenderVisibleLines: action,
      setPortfolioStartingDate: action,
      totalValueOfSymbols: computed,
    });

    this.portfolioStartingDate = moment().subtract(1, "years").format("YYYY-MM-DD");

    this.addSymbol({ symbolTicker: "AAPL", name: "Apple Inc.", region: "testRegion", currency: "USD" });

    autorun(() => {
      const trigger = this.portfolioStartingDate;
      const trigger2 = this.totalValueOfSymbols;

      this.setTriggerRecalculatePortfolio(true);
      console.log("Autorun: triggering portfolio rercalculation" + JSON.stringify(trigger) + JSON.stringify(trigger2));
    });
  }

  setTriggerRecalculatePortfolio(bool) {
    this.triggerRecalculatePortfolio = bool;
  }

  setTriggerRerenderVisibleLines(bool) {
    this.triggerRerenderVisibleLines = bool;
  }

  async addSymbol(symbolSetSearchResult) {
    const compareSymbolSets = (a, b) => {
      if (b.symbolTicker === "Portfolio") {
        return 1;
      }
      if (a.symbolTicker < b.symbolTicker) {
        return -1;
      }
      if (a.symbolTicker > b.symbolTicker) {
        return 1;
      }
      return 0;
    };

    if (this.getSymbolSetForTicker(symbolSetSearchResult)) {
      notificationStore.enqueueSnackbar({
        message: `Symbol: ${symbolSetSearchResult.symbolTicker} already part of portfolio`,
        options: {
          variant: "info",
        },
      });
      return false;
    }
    if (!symbolSetSearchResult) return false;
    this.symbols.push({
      symbolTicker: symbolSetSearchResult.symbolTicker,
      name: symbolSetSearchResult.name,
      currency: symbolSetSearchResult.currency,
      performanceSincePortfolioStart: 1,
      isVisible: true,
      value: 100,
      color: this.nextAvailableColorValue(),
    });
    this.symbols.sort(compareSymbolSets);
    const doesDataAlreadyExists = await idbSymbolDataStore.doesTimesSeriesDailyAdjustedExistForSymbol(
      symbolSetSearchResult.symbolTicker
    );
    if (!doesDataAlreadyExists) {
      // Check if api token is set
      if (configStore.alphaVantage.apiToken) {
        await FetchDataService.fetchDataDailyAdjustedForSymbolAlphaVantage(symbolSetSearchResult.symbolTicker);
      } else {
        notificationStore.enqueueSnackbar({
          message: `Please enter an API key on the Settings Page`,
          options: {
            variant: "error",
            autoHideDuration: 10000,
          },
          key: notificationStore.keys.API_TOKEN_MISSING,
        });
      }
    }
    //  TODO check if this  could be optimized
    this.setTriggerRerenderVisibleLines(true);
    this.setTriggerRecalculatePortfolio(true);
  }

  toggleSymbolVisibility(changedSymbolbyTicker) {
    console.log(changedSymbolbyTicker);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolbyTicker) {
        symbol.isVisible = !symbol.isVisible;
      }
    });
    this.setTriggerRerenderVisibleLines(true);
  }

  setPortfolioStartingDate(date) {
    this.portfolioStartingDate = date;
  }

  get totalValueOfSymbols() {
    return this.symbols.reduce((pv, symbolSet) => {
      if (symbolSet.symbolTicker !== "Portfolio") return +pv + +symbolSet.value;
      else return pv;
    }, 0);
  }

  getSymbolSetForTicker(symbolTicker) {
    return toJS(this.symbols.find((symbolSet) => symbolSet.symbolTicker === symbolTicker));
  }

  getSymbolsWithoutAll() {
    return this.symbols.filter((symbolSet) => symbolSet.symbolTicker !== "Portfolio");
  }

  setValueForTicker(changedSymbolByTicker, value) {
    console.log("Updating value: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.value = value;
      }
    });
  }

  setPerformanceSincePortfolioStartForTicker(changedSymbolByTicker, value) {
    console.log("Updating performanceSincePortfolioStart: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.performanceSincePortfolioStart = value;
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
