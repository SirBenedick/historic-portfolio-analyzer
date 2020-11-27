import React from "react";
import { createChart, PriceScaleMode } from "lightweight-charts";
import keyMetricsStore from "../stores/KeyMetricsStore";
import { Paper } from "@material-ui/core";

export default class ChartDrawdown extends React.Component {
  constructor(props) {
    super(props);
    this.drawdownChartRef = React.createRef();
    this.chart = {};
    this.drawdownTimeseriesData = {};

    this.addDrawdownLineSeries = this.addDrawdownLineSeries.bind(this);
  }
  /**
   * TODO
   * trigger rerender
   * color red
   * show full width?
   * show when is calculating
   * label in percent
   */
  async componentDidMount() {
    this.renderChart();

    this.addDrawdownLineSeries();
  }

  renderChart() {
    console.log("rednder drawdownchart");
    if (this.drawdownChartRef.current.firstChild) {
      this.drawdownChartRef.current.removeChild(this.drawdownChartRef.current.firstChild);
      this.chart = null;
    }
    this.chart = createChart(this.drawdownChartRef.current, stylePercent);
  }

  async addDrawdownLineSeries() {
    console.log("addDrawdownLineSeries");
    let tempLineSeries = this.chart.addLineSeries({ color: "#f44336" });
    this.drawdownTimeseriesData = keyMetricsStore.portfolioDrawdownTimeSeries;
    tempLineSeries.setData(this.drawdownTimeseriesData);
  }

  render() {
    return (
      <Paper style={{ padding: "10px" }}>
        <div ref={this.drawdownChartRef} id="chart-ref"></div>
        {/* <TriggerRerenderPortfolio dataStore={this.props.dataStore} rerenderPortfolio={this.rerenderPortfolio} />
        <TriggerShowVisibleLines dataStore={this.props.dataStore} rerenderVisibleLines={this.rerenderVisibleLines} /> */}
      </Paper>
    );
  }
}

const stylePercent = {
  height: 300,
  rightPriceScale: {
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
    mode: PriceScaleMode.Normal,
    borderColor: "rgba(197, 203, 206, 0.4)",
  },
};
