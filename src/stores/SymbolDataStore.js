import { makeObservable, observable, action } from "mobx";
import idbSymbolDataStore from "../stores/idbSymbolDataStore";

class SymbolDataStore {
  isCalculatingPortfolioPerformance = false;

  constructor() {
    makeObservable(this, {
      isCalculatingPortfolioPerformance: observable,
      setIsCalculatingPortfolioPerformance: action,
    });
  }

  setIsCalculatingPortfolioPerformance(bool) {
    this.isCalculatingPortfolioPerformance = bool;
  }

  async calculateAndStoreHistoricPortfolioPerformance() {
    return await idbSymbolDataStore.calculateAndStoreHistoricPortfolioPerformance();
  }

  async getDataChartFormatBySymbol(symbolTicker) {
    return await idbSymbolDataStore.getDataChartFormatBySymbol(symbolTicker);
  }
}

const symbolDataStore = new SymbolDataStore();
export default symbolDataStore;
