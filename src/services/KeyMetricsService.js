import { std } from "mathjs";
import dataStore from "../stores/DataStore";

const KeyMetricsService = {
  async calculateAndStoreSharpRatio(portfolioDataset, annualizedPerformanceSinceStartPortfolio) {
    const dataSet = portfolioDataset.map((entry) => entry.value);
    const standardDeviation = std(dataSet);

    const riskFreeRate = 2;
    const sharpRatio = (annualizedPerformanceSinceStartPortfolio * 100 - riskFreeRate) / standardDeviation;

    dataStore.setSharpRatioForTicker("Portfolio", sharpRatio);
  },
};
export default KeyMetricsService;
