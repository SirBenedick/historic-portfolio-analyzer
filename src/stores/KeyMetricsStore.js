import { makeObservable, observable, action } from "mobx";
import dataStore from "./DataStore";
import symbolDataStore from "./SymbolDataStore";
import KeyMetricsService from "../services/KeyMetricsService";

class KeyMetricsStore {
  portfolioSharpRatio = 0;

  constructor() {
    makeObservable(this, {
      portfolioSharpRatio: observable,
      calculateAndSetPortfolioSharpRatio: action,
    });
  }

  async calculateAndSetPortfolioSharpRatio() {
    this.portfolioSharpRatio = 0;

    const timeseries = await symbolDataStore.getSymbolTimeseriesDataFromMap("Portfolio");
    const annualizedPerformanceSinceStartPortfolio = dataStore.getSymbolSetForTicker("Portfolio")
      .yearlyPerformanceSincePortfolioStart;

    if (timeseries.length !== 0) {
      const res = await KeyMetricsService.calculateAndStoreSharpRatio(
        timeseries,
        annualizedPerformanceSinceStartPortfolio
      );
      this.portfolioSharpRatio = res;
    } else {
      this.portfolioSharpRatio = 0;
    }
  }
}

const keyMetricsStore = new KeyMetricsStore();
export default keyMetricsStore;
