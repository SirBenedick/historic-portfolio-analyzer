import React from "react";
import { createChart, PriceScaleMode } from "lightweight-charts";
import fetchDataService from "../services/FetchDataService";
import { Paper } from "@material-ui/core";
import dataStore from "../stores/DataStore";
import ChartSwitchStyle from "./ChartSwitchStyle";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedChartStyleType: "default",
    };
    this.myRef = React.createRef();
    this.chart = {};
    this.lineSeriesObj = {};

    this.renderChart = this.renderChart.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.switchStyle = this.switchStyle.bind(this);
    this.createGraphForSelectedSymbols = this.createGraphForSelectedSymbols.bind(this);
    this.addLineSeriesData = this.addLineSeriesData.bind(this);
  }

  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    console.log("renderChart");
    if (this.myRef.current.firstChild) {
      this.myRef.current.removeChild(this.myRef.current.firstChild);
      this.chart = null;
    }
    this.chart = createChart(this.myRef.current, styleDefault);

    console.log(this.chart);
    this.refreshData();
  }

  refreshData() {
    console.log("Does nothing");
  }

  switchStyle() {
    console.log("switching style");
    if (this.state.selectedChartStyleType === "default") {
      this.setState({ selectedChartStyleType: "percent" });
      this.chart.applyOptions(stylePercent);
    } else if (this.state.selectedChartStyleType === "percent") {
      this.setState({ selectedChartStyleType: "default" });
      this.chart.applyOptions(styleDefault);
    }
  }

  refreshDataAllData() {
    fetchDataService.fetchDataForAllSymbols().then((res) => console.log(`Fetched: ${res}`));
  }

  async createGraphForSelectedSymbols() {
    console.log("createGraphForSelectedSymbols");

    dataStore.symbols.forEach((symbolSet) => {
      if (symbolSet.isVisible) {
        this.addLineSeriesData(symbolSet);
      } else {
        if (this.lineSeriesObj[symbolSet.symbolTicker] && this.lineSeriesObj[symbolSet.symbolTicker]["series"]) {
          let tempLineSeries = this.lineSeriesObj[symbolSet.symbolTicker]["series"];
          this.chart.removeSeries(tempLineSeries);
          this.lineSeriesObj[symbolSet.symbolTicker] = null;
        }
      }
    });
  }

  addLineSeriesData(symbolSet) {
    console.log("addLineSeriesData");
    const dataForSymbol = dataStore.dataForSymbolTicker(symbolSet.symbolTicker).data;

    if (!this.lineSeriesObj[symbolSet.symbolTicker]) {
      // If lineSeriesObj for ticker does not exist then create new lineSeriesObj
      let tempLineSeries = this.chart.addLineSeries({
        color: symbolSet.color,
      });
      if (dataForSymbol && dataForSymbol.length !== 0) tempLineSeries.setData(dataForSymbol);

      // Create new lineSeries Object
      this.lineSeriesObj[symbolSet.symbolTicker] = { series: tempLineSeries, color: symbolSet.color };
    } else {
      // If lineSeries exists then only update data, keep color
      if (dataForSymbol && dataForSymbol.length !== 0) this.lineSeriesObj[symbolSet.symbolTicker]["series"].setData(dataForSymbol);
    }
    console.log(this.lineSeriesObj[symbolSet.symbolTicker]);
  }

  render() {
    return (
      <Paper style={{ padding: "10px", marginTop: "10px" }}>
        <ChartSwitchStyle
          refreshData={this.refreshData}
          switchStyle={this.switchStyle}
          selectedChartStyleType={this.state.selectedChartStyleType === "default" ? "default" : "percent"}
          refreshDataAllData={this.refreshDataAllData}
          createGraphForSelectedSymbols={this.createGraphForSelectedSymbols}
        />
        <div ref={this.myRef} id="here"></div>
      </Paper>
    );
  }
}

const styleDefault = {
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
const stylePercent = {
  height: 300,
  rightPriceScale: {
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
    mode: PriceScaleMode.Percentage,
    borderColor: "rgba(197, 203, 206, 0.4)",
  },
};
