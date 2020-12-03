import React from "react";
import { observer } from "mobx-react-lite";
import { createChart, PriceScaleMode } from "lightweight-charts";
import keyMetricsStore from "../stores/KeyMetricsStore";
import { Paper, LinearProgress } from "@material-ui/core";
import TriggerRerenderDrawdown from "./TriggerRerenderDrawdown";

export default class ChartDrawdown extends React.Component {
  constructor(props) {
    super(props);
    this.drawdownChartRef = React.createRef();
    this.chart = {};
    this.drawdownLineSeries = null;

    this.addDrawdownLineSeries = this.addDrawdownLineSeries.bind(this);
    this.rerenderDrawdown = this.rerenderDrawdown.bind(this);
  }

  async componentDidMount() {
    this.renderChart();
    this.addDrawdownLineSeries();
  }

  renderChart() {
    if (this.drawdownChartRef.current.firstChild) {
      this.drawdownChartRef.current.removeChild(this.drawdownChartRef.current.firstChild);
      this.chart = null;
    }
    this.chart = createChart(this.drawdownChartRef.current, stylePercent);

    // Create lineSeries and add it to the chart
    this.drawdownLineSeries = this.chart.addLineSeries({
      color: "#f44336",
      priceLineVisible: false,
      priceFormat: {
        type: "custom",
        minMove: 0.01,
        formatter: (value) => value.toFixed(2) + "%",
      },
    });
  }

  async addDrawdownLineSeries() {
    this.drawdownLineSeries.setData(keyMetricsStore.portfolioDrawdownTimeSeries);
  }

  rerenderDrawdown() {
    this.addDrawdownLineSeries();
  }

  render() {
    return (
      <Paper style={{ padding: "10px" }}>
        <CalculatingProgress keyMetricsStore={this.props.keyMetricsStore} />
        <div ref={this.drawdownChartRef} id="chart-ref"></div>
        <TriggerRerenderDrawdown
          keyMetricsStore={this.props.keyMetricsStore}
          rerenderDrawdown={this.rerenderDrawdown}
        />
      </Paper>
    );
  }
}

const CalculatingProgress = observer(({ keyMetricsStore }) => (
  <div>{keyMetricsStore.portfolioDrawdownTimeSeries.length === 0 ? <LinearProgress /> : null}</div>
));

const stylePercent = {
  height: 400,
  rightPriceScale: {
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
    mode: PriceScaleMode.Normal,
    borderColor: "rgba(197, 203, 206, 0.4)",
  },
};
