import { makeObservable, observable, action } from "mobx";

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
}

const symbolDataStore = new SymbolDataStore();
export default symbolDataStore;
