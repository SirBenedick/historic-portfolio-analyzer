import { makeObservable, observable, action } from "mobx";
import symbolDataStore from "./SymbolDataStore";
import KeyMetricsService from "../services/KeyMetricsService";

class KeyMetricsStore {
  portfolioSharpRatio = 0;
  portfolioDrawdownTimeSeries = [];

  constructor() {
    makeObservable(this, {
      portfolioSharpRatio: observable,
      calculateAndSetPortfolioSharpRatio: action,
      portfolioDrawdownTimeSeries: observable,
      calculateAndSetPortfolioDrawdown: action,
    });
  }

  async calculateAndSetPortfolioSharpRatio() {
    this.portfolioSharpRatio = 0;

    const timeseries = await symbolDataStore.getSymbolTimeseriesDataFromMap("Portfolio");

    if (timeseries.length !== 0) {
      const res = await KeyMetricsService.calculateAndStoreSharpRatio(timeseries);
      this.portfolioSharpRatio = res;
    } else {
      this.portfolioSharpRatio = 0;
    }
  }

  async calculateAndSetPortfolioDrawdown(portfolioTimeseries) {
    this.portfolioDrawdownTimeSeries = [];
    this.portfolioDrawdownTimeSeries = await KeyMetricsService.calculatePortfolioDrawdownTimeSeries(
      portfolioTimeseries
    );
  }
}

const keyMetricsStore = new KeyMetricsStore();
export default keyMetricsStore;
