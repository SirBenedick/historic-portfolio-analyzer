import configStore from "../stores/ConfigStore";
import PortfolioAnalytics from "portfolio-analytics";

const KeyMetricsService = {
  async calculateAndStoreSharpRatio(timeseries) {
    const riskFreeRate = configStore.riskFreeRate / 100 + 1;

    // Create lists for PortfolioAnalytics.sharpRatio()
    let dataSetTemp = [];
    let riskFreeTemp = [];
    timeseries.forEach((entry, i) => {
      dataSetTemp.push(entry.value);
      riskFreeTemp.push(riskFreeRate ** ((1 / 252) * i));
    });

    const sharpDaily = PortfolioAnalytics.sharpeRatio(dataSetTemp, riskFreeTemp);
    // Multiply sharpDaily ratio by square root of trading days in a year
    // Assumption: 252 trading days in a regular year
    const sharpAnnulized = sharpDaily * 252 ** 0.5;
    return sharpAnnulized;
  },
  async calculatePortfolioDrawdownTimeSeries(portfolioTimeseries) {
    let values = portfolioTimeseries.map((timeseriesObj) => timeseriesObj.value);

    const drawdownFunction = PortfolioAnalytics.drawdownFunction(values);

    let result = [];
    portfolioTimeseries.forEach((e, i) => result.push({ time: e.time, value: drawdownFunction[i] * -100 }));

    return result;
  },
};
export default KeyMetricsService;
