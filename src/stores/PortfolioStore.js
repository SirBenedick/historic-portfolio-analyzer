import { makeObservable, observable, action, computed, autorun, toJS } from "mobx";
import moment from "moment";
import idbPortfoliosStore from "./idbPortfoliosStore";
import symbolDataStore from "./SymbolDataStore";
import chartColors from "../helper/chartColors";
import defaultPortfolio from "../helper/defaultPortfolio";
import {
  compareSymbolSetsByName,
  compareSymbolSetsByPerformanceAnnulized,
  compareSymbolSetsByPerformanceSinceStart,
  compareSymbolSetsByTicker,
  compareSymbolSetsByTickerPortfolioFirst,
  compareSymbolSetsByValue,
} from "../helper/symbolSetCompareHelper";
class PortfolioStore {
  symbols = [defaultPortfolio];
  portfolioStartingDate = "";
  portfolioBuilderSetting = "ticker"; // "ticker", "name", "value", "performance_since_start", "performance_annualized"
  triggerRerenderPortfolio = false;
  triggerRerenderVisibleLines = false;
  triggerRecalculatePortfolioTimeout = null;
  areTriggersEnabled = false;

  constructor() {
    makeObservable(this, {
      symbols: observable,
      portfolioBuilderSetting: observable,
      triggerRerenderPortfolio: observable,
      triggerRerenderVisibleLines: observable,
      portfolioStartingDate: observable,
      areTriggersEnabled: observable,
      initStoreAfterConfigSetupIsComplete: action,
      toggleSymbolVisibility: action,
      setVisibilityForHideOther: action,
      addSymbol: action,
      addSymbolFromSavedPortfolio: action,
      resetSymbols: action,
      removeSelectedSymbol: action,
      setValueForTicker: action,
      setDateFetchedForTicker: action,
      setPerformanceSincePortfolioStartForTicker: action,
      setAnnualizedPerformanceSincePortfolioStartForTicker: action,
      setEndValueForTicker: action,
      setTriggerRerenderPortfolio: action,
      setTriggerRerenderVisibleLines: action,
      setTotalDividendPayoutForTicker: action,
      setSharpRatioForTicker: action,
      setPortfolioStartingDate: action,
      setPortfolioBuilderSetting: action,
      setAreTriggersEnabled: action,
      loadSavedPortfolio: action,
      totalValueOfSymbols: computed,
      listOfSymbolTickers: computed,
      symbolsWithoutPortfolio: computed,
      symbolPortfolioOnly: computed,
      symbolsSortedByTickerPortfolioFirst: computed,
      symbolsSortedByTickerWithoutPortfolio: computed,
      symbolsSortedByPortfolioBuilderSetting: computed,
    });

    this.portfolioStartingDate = moment().subtract(1, "years").format("YYYY-MM-DD");

    autorun(() => {
      if (this.areTriggersEnabled) {
        // triggerRerenderPortfolio
        const trigger = this.portfolioStartingDate;
        const trigger2 = this.totalValueOfSymbols;

        // Debounce
        const debouncePortfolioRecalculation = async () => {
          console.log(
            "Autorun: triggering portfolio rercalculation" + JSON.stringify(trigger) + JSON.stringify(trigger2)
          );
          await symbolDataStore.calculateAndStoreHistoricPortfolioPerformance();
          this.setTriggerRerenderPortfolio(true);
        };

        //  Check if timeout exists, if so clear and start a new one
        if (this.triggerRecalculatePortfolioTimeout) clearTimeout(this.triggerRecalculatePortfolioTimeout);
        const timeout = setTimeout(async () => {
          await debouncePortfolioRecalculation();
        }, 500);
        this.triggerRecalculatePortfolioTimeout = timeout;
      }
    });
  }

  initStoreAfterConfigSetupIsComplete() {
    this.setAreTriggersEnabled(true);
    this.setTriggerRerenderPortfolio();
    this.setTriggerRerenderPortfolio();
  }

  // symbols operations
  async addSymbol(symbolSetSearchResult) {
    if (!symbolSetSearchResult || !symbolSetSearchResult.symbolTicker) return false;
    this.symbols.push({
      symbolTicker: symbolSetSearchResult.symbolTicker,
      name: symbolSetSearchResult.name,
      currency: symbolSetSearchResult.currency,
      performanceSincePortfolioStart: 1,
      annualizedPerformanceSincePortfolioStart: 1,
      isVisible: true,
      value: 100,
      endValue: 0,
      totalDividendPayout: 0,
      color: chartColors.nextAvailableColorValue(),
      dateFetched: "-",
    });

    await symbolDataStore.addSymbolToMap(symbolSetSearchResult.symbolTicker);
    await this.getMetaDataAndStoreIt(symbolSetSearchResult.symbolTicker);

    this.setTriggerRerenderVisibleLines(true);
    this.setTriggerRerenderPortfolio(true);
  }

  async addSymbolFromSavedPortfolio(symbolSet) {
    if (!symbolSet || !symbolSet.symbolTicker) return false;
    this.symbols.push(symbolSet);

    await symbolDataStore.addSymbolToMap(symbolSet.symbolTicker);
    await this.getMetaDataAndStoreIt(symbolSet.symbolTicker);
  }

  async removeAndDeleteSymbol(symbolTickerToDelete) {
    await this.removeSelectedSymbol(symbolTickerToDelete);
    await this.deleteDataSetForSymbol(symbolTickerToDelete);
  }

  async removeSelectedSymbol(symbolTickerToRemove) {
    chartColors.removeColorInUse(this.getSymbolSetForTicker(symbolTickerToRemove).color);
    this.symbols = this.symbols.filter((symbolSet) => symbolSet.symbolTicker !== symbolTickerToRemove);

    await symbolDataStore.removeSymbolFromMap(symbolTickerToRemove);

    this.setTriggerRerenderVisibleLines(true);
    this.setTriggerRerenderPortfolio(true);
  }

  async deleteDataSetForSymbol(symbolTickerToDelete) {
    await symbolDataStore.deleteDataSet(symbolTickerToDelete);
  }

  async resetSymbols() {
    // Clear colors
    this.symbols.forEach((symbolSet) => chartColors.removeColorInUse(symbolSet.color));
    // Reset symbols
    this.symbols = [defaultPortfolio];
    // Reset symbolDataStore
    await symbolDataStore.resetStore();
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

  setVisibilityForHideOther(symbolToShow) {
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === symbolToShow) {
        symbol.isVisible = true;
      } else {
        symbol.isVisible = false;
      }
    });
    this.setTriggerRerenderVisibleLines(true);
  }

  setValueForTicker(changedSymbolByTicker, value) {
    console.log("Updating value: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.value = value;
      }
    });
  }

  setDateFetchedForTicker(changedSymbolByTicker, date) {
    console.log("Updating dateFetched: " + date);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.dateFetched = date;
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

  setAnnualizedPerformanceSincePortfolioStartForTicker(changedSymbolByTicker, value) {
    console.log("Updating setAnnualizedPerformanceSincePortfolioStartForTicker: " + value);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolByTicker) {
        symbol.annualizedPerformanceSincePortfolioStart = value;
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

  // portfolioStartingDate operations
  setPortfolioStartingDate(date) {
    this.portfolioStartingDate = date;
  }

  // portfolioBuilderSetting operations
  setPortfolioBuilderSetting(newVal) {
    this.portfolioBuilderSetting = newVal;
  }

  // areTriggersEnabled operations
  setAreTriggersEnabled(val) {
    this.areTriggersEnabled = val;
  }
  // triggerRerenderPortfolio operations
  setTriggerRerenderPortfolio(bool) {
    this.triggerRerenderPortfolio = bool;
  }

  // triggerRerenderVisibleLines operations
  setTriggerRerenderVisibleLines(bool) {
    this.triggerRerenderVisibleLines = bool;
  }

  // Computed methodes
  get totalValueOfSymbols() {
    return this.symbols.reduce((pv, symbolSet) => {
      if (symbolSet.symbolTicker !== "Portfolio") return +pv + +symbolSet.value;
      else return pv;
    }, 0);
  }

  get symbolsWithoutPortfolio() {
    return this.symbols.filter((symbolSet) => symbolSet.symbolTicker !== "Portfolio");
  }

  get symbolPortfolioOnly() {
    return this.symbols.filter((symbolSet) => symbolSet.symbolTicker === "Portfolio");
  }

  get symbolsSortedByTickerPortfolioFirst() {
    let temp = this.symbols;
    temp = temp.slice().sort(compareSymbolSetsByTickerPortfolioFirst);
    return temp;
  }

  get symbolsSortedByPortfolioBuilderSetting() {
    let temp = this.symbols;
    if (this.portfolioBuilderSetting === "ticker") {
      temp = temp.slice().sort(compareSymbolSetsByTicker);
    } else if (this.portfolioBuilderSetting === "name") {
      temp = temp.slice().sort(compareSymbolSetsByName);
    } else if (this.portfolioBuilderSetting === "performance_annualized") {
      temp = temp.slice().sort(compareSymbolSetsByPerformanceAnnulized);
    } else if (this.portfolioBuilderSetting === "performance_since_start") {
      temp = temp.slice().sort(compareSymbolSetsByPerformanceSinceStart);
    } else if (this.portfolioBuilderSetting === "value") {
      temp = temp.slice().sort(compareSymbolSetsByValue);
    }
    return temp;
  }

  get symbolsSortedByTickerWithoutPortfolio() {
    let temp = this.symbols;
    temp = temp.filter((symbolSet) => symbolSet.symbolTicker !== "Portfolio");
    temp = temp.slice().sort(compareSymbolSetsByTickerPortfolioFirst);
    return temp;
  }

  get listOfSymbolTickers() {
    return this.symbols.map((symbolSet) => symbolSet.symbolTicker);
  }

  // Helper operations
  async getMetaDataAndStoreIt(symbolTicker) {
    //  Get meta data and store it inside this store
    const metaData = await symbolDataStore.getMetaDataForSymbol(symbolTicker);
    this.setDateFetchedForTicker(symbolTicker, metaData.date_fetched);
  }

  async reloadDataFor(symbolTickerToReload) {
    this.setDateFetchedForTicker(symbolTickerToReload, "-");
    await this.deleteDataSetForSymbol(symbolTickerToReload);
    await symbolDataStore.removeSymbolFromMap(symbolTickerToReload);
    await symbolDataStore.addSymbolToMap(symbolTickerToReload);
    await this.getMetaDataAndStoreIt(symbolTickerToReload);
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

  async saveCurrentPortfolio(name) {
    console.log("saveCurrentPortfolio");
    // Reset calculated fields to 0 --> UI shows calculating
    await idbPortfoliosStore.set({
      name: name,
      creationDate: moment().format(),
      symbols: toJS(this.symbols).map((symbolSet) => ({
        symbolTicker: symbolSet.symbolTicker,
        name: symbolSet.name,
        isVisible: true,
        value: symbolSet.value,
        currency: symbolSet.currency,
        performanceSincePortfolioStart: 0,
        annualizedPerformanceSincePortfolioStart: 0,
        color: symbolSet.color,
        endValue: 0,
        dateFetched: "-",
      })),
    });
  }

  async getListOfAllSavedPortfolioNames() {
    return await idbPortfoliosStore.getInfoOfAllSavedPortfolios();
  }

  async loadSavedPortfolio(portfolioName) {
    console.log("loadSavedPortfolio: " + portfolioName);
    this.setAreTriggersEnabled(false);
    const savedPortfolio = await idbPortfoliosStore.get(portfolioName);
    if (!savedPortfolio) {
      console.log("Failed to load portfolio: " + portfolioName);
      this.setAreTriggersEnabled(true);
      return;
    }

    await this.resetSymbols();
    // Remove defaultPortfolio from symbols
    this.symbols = [];

    await Promise.all(
      savedPortfolio.symbols.map(async (symbolSet) => {
        await this.addSymbolFromSavedPortfolio(symbolSet);
      })
    );
    // Trigger line and recalculation
    this.setAreTriggersEnabled(true);
    this.setTriggerRerenderVisibleLines(true);
    this.setTriggerRerenderPortfolio(true);
  }
  async deleteSavedPortfolio(portfolioName) {
    await idbPortfoliosStore.delete(portfolioName);
  }
}

const portfolioStore = new PortfolioStore();
export default portfolioStore;
