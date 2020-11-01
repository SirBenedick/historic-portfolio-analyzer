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
    this.chartColorsForSeries = [
      { colorValue: "#3f51b5", isBegingUsed: false },
      { colorValue: "#2196f3", isBegingUsed: false },
      { colorValue: "#03a9f4", isBegingUsed: false },
      { colorValue: "#00bcd4", isBegingUsed: false },
      { colorValue: "#009688", isBegingUsed: false },
      { colorValue: "#4caf50", isBegingUsed: false },
      { colorValue: "#8bc34a", isBegingUsed: false },
      { colorValue: "#cddc39", isBegingUsed: false },
    ];

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
					this.removeColorInUse(this.lineSeriesObj[symbolSet.symbolTicker]["color"])
					this.lineSeriesObj[symbolSet.symbolTicker] = null;
        }
      }
    });
  }

  addLineSeriesData(symbolSet) {
    console.log("addLineSeriesData");
		// TODO: Update existing series
    if (!this.lineSeriesObj[symbolSet.symbolTicker]) {
			const dataForSymbol = dataStore.dataForSymbolTicker(symbolSet.symbolTicker).data;
			const seriesColor = this.nextAvailableColorValue()
			let tempLineSeries = this.chart.addLineSeries({
				color: seriesColor,
			});
			tempLineSeries.setData(dataForSymbol);
			
			// Create new lineSeries Object
			this.lineSeriesObj[symbolSet.symbolTicker] = { series: tempLineSeries, color: seriesColor}
    }
  }

  nextAvailableColorValue() {
    let availableColorValue = null;
    for (let index = 0; index < this.chartColorsForSeries.length; index++) {
      const element = this.chartColorsForSeries[index];
      if (!element.isBegingUsed) {
        availableColorValue = element.colorValue;
        element.isBegingUsed = true;
        break;
      }
		}
    return availableColorValue;
	}
	
	removeColorInUse(colorValue){
		for (let index = 0; index < this.chartColorsForSeries.length; index++) {
			const element = this.chartColorsForSeries[index];
      if (element.colorValue === colorValue) {
				element.isBegingUsed = false;
        break;
      }
		}
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
