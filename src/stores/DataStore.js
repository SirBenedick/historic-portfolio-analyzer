import { makeObservable, observable, action, computed, autorun } from "mobx";
import moment from "moment";
import symbolDataStore from "./SymbolDataStore";
class DataStore {
  symbols = [
    {
      symbolTicker: "Portfolio",
      name: "Portfolio",
      isVisible: true,
      value: 0,
      currency: "USD",
      performanceSincePortfolioStart: 1,
      yearlyPerformanceSincePortfolioStart: 1,
      color: this.nextAvailableColorValue(),
      endValue: 0,
    },
  ];
  pendingRequests = 0;
  appleData = [];
  portfolioStartingDate = "";
  triggerRecalculatePortfolio = false;
  triggerRecalculatePortfolioTimeout = null;
  triggerRerenderVisibleLines = false;

  constructor() {
    makeObservable(this, {
      symbols: observable,
      triggerRecalculatePortfolio: observable,
      triggerRerenderVisibleLines: observable,
      portfolioStartingDate: observable,
      toggleSymbolVisibility: action,
      addSymbol: action,
      removeSelectedSymbol: action,
      setValueForTicker: action,
      setPerformanceSincePortfolioStartForTicker: action,
      setYearlyPerformanceSincePortfolioStartForTicker: action,
      setEndValueForTicker: action,
      setTriggerRecalculatePortfolio: action,
      setTriggerRerenderVisibleLines: action,
      setTotalDividendPayoutForTicker: action,
      setSharpRatioForTicker: action,
      setPortfolioStartingDate: action,
      totalValueOfSymbols: computed,
      listOfSymbolTickers: computed,
    });

    this.portfolioStartingDate = moment().subtract(1, "years").format("YYYY-MM-DD");

    autorun(() => {
      // triggerRecalculatePortfolio
      const trigger = this.portfolioStartingDate;
      const trigger2 = this.totalValueOfSymbols;

      // Debounce
      const debouncePortfolioRecalculation = () => {
        this.setTriggerRecalculatePortfolio(true);
        console.log(
          "Autorun: triggering portfolio rercalculation" + JSON.stringify(trigger) + JSON.stringify(trigger2)
        );
      };

      //  Check if timeout exists, if so clear and start a new one
      if (this.triggerRecalculatePortfolioTimeout) clearTimeout(this.triggerRecalculatePortfolioTimeout);
      const timeout = setTimeout(async () => {
        debouncePortfolioRecalculation();
      }, 500);
      this.triggerRecalculatePortfolioTimeout = timeout;
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

    if (!symbolSetSearchResult || !symbolSetSearchResult.symbolTicker) return false;
    this.symbols.push({
      symbolTicker: symbolSetSearchResult.symbolTicker,
      name: symbolSetSearchResult.name,
      currency: symbolSetSearchResult.currency,
      performanceSincePortfolioStart: 1,
      yearlyPerformanceSincePortfolioStart: 1,
      isVisible: true,
      value: 100,
      endValue: 0,
      totalDividendPayout: 0,
      color: this.nextAvailableColorValue(),
    });
    this.symbols.sort(compareSymbolSets);

    await symbolDataStore.addSymbolToMap(symbolSetSearchResult.symbolTicker);
    //  TODO check if this  could be optimized
    this.setTriggerRerenderVisibleLines(true);
    this.setTriggerRecalculatePortfolio(true);
  }

  async removeSelectedSymbol(symbolTickerToDelete) {
    this.removeColorInUse(this.getSymbolSetForTicker(symbolTickerToDelete).color);
    this.symbols = this.symbols.filter((symbolSet) => symbolSet.symbolTicker !== symbolTickerToDelete);

    await symbolDataStore.removeSymbolFromMap(symbolTickerToDelete);

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

  async doesSymbolExist(symbolTicker) {
    let doesExist = false;
    this.symbols.forEach((symbolSet) => {
      if (symbolSet.symbolTicker === symbolTicker) {
        doesExist = true;
      }
    });
    return doesExist;
  }

  getSymbolSetForTicker(symbolTicker) {
    return this.symbols.find((symbolSet) => symbolSet.symbolTicker === symbolTicker);
  }

  getSymbolsWithoutPortfolio() {
    return this.symbols.filter((symbolSet) => symbolSet.symbolTicker !== "Portfolio");
  }

  get listOfSymbolTickers() {
    return this.symbols.map((symbolSet) => symbolSet.symbolTicker);
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

  setYearlyPerformanceSincePortfolioStartForTicker(changedSymbolByTicker, value) {
    console.log("Updating setYearlyPerformanceSincePortfolioStartForTicker: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.yearlyPerformanceSincePortfolioStart = value;
      }
    });
  }

  setEndValueForTicker(changedSymbolByTicker, value) {
    console.log("Updating setEndValueForTicker: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.endValue = value;
      }
    });
  }

  setTotalDividendPayoutForTicker(changedSymbolByTicker, value) {
    console.log("Updating setTotalDividendPayoutForTicker: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.totalDividendPayout = value;
      }
    });
  }

  setSharpRatioForTicker(changedSymbolByTicker, value) {
    console.log("Updating setSharpRatioForTicker: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol["sharpRatio"] = value;
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
  { colorValue: "#ffeb3b", isBegingUsed: false },
  { colorValue: "#ffc107", isBegingUsed: false },
  { colorValue: "#ff9800", isBegingUsed: false },
  { colorValue: "#ff5722", isBegingUsed: false },
  { colorValue: "#f44336", isBegingUsed: false },
  { colorValue: "#e91e63", isBegingUsed: false },
  { colorValue: "#9c27b0", isBegingUsed: false },
  { colorValue: "#673ab7", isBegingUsed: false },
];

const dataStore = new DataStore();
export default dataStore;
