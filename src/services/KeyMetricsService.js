import { std } from "mathjs";
import dataStore from "../stores/DataStore";
import configStore from "../stores/ConfigStore";

const KeyMetricsService = {
  async calculateAndStoreSharpRatio(portfolioDataset, annualizedPerformanceSinceStartPortfolio) {
    const dataSet = portfolioDataset.map((entry) => entry.value);
    const standardDeviation = std(dataSet);

    const riskFreeRate = configStore.riskFreeRate;
    const sharpRatio = (annualizedPerformanceSinceStartPortfolio * 100 - riskFreeRate) / standardDeviation;

    dataStore.setSharpRatioForTicker("Portfolio", sharpRatio);
  },
};
export default KeyMetricsService;
