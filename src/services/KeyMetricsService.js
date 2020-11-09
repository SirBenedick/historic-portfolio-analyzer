import { std } from "mathjs";
import configStore from "../stores/ConfigStore";

const KeyMetricsService = {
  async calculateAndStoreSharpRatio(timeseries, annualizedPerformanceSinceStartPortfolio) {
    const dataSet = timeseries.map((entry) => entry.value);
    const standardDeviation = std(dataSet);

    const riskFreeRate = configStore.riskFreeRate;
    const sharpRatio = (annualizedPerformanceSinceStartPortfolio * 100 - riskFreeRate) / standardDeviation;

    return sharpRatio;
  },
};
export default KeyMetricsService;
