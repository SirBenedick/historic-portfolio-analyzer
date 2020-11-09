import { std } from "mathjs";
import configStore from "../stores/ConfigStore";

const KeyMetricsService = {
  async calculateAndStoreSharpRatio(timeseries, annualizedPerformanceSinceStartPortfolio) {
    const startValue = timeseries[0].value;
    const riskFreeRate = configStore.riskFreeRate;

    let dataSet = timeseries.map((entry) => entry.value);
    dataSet = dataSet.map((value) => (value / startValue) * 100 - riskFreeRate);

    const standardDeviation = std(dataSet);

    const sharpRatio = (annualizedPerformanceSinceStartPortfolio * 100 - riskFreeRate) / standardDeviation;

    return sharpRatio;
  },
};
export default KeyMetricsService;
