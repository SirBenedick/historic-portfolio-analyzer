import React from "react";
import { observer } from "mobx-react-lite";
import { createChart, PriceScaleMode } from "lightweight-charts";
import { Paper, LinearProgress } from "@material-ui/core";
import ChartSwitchStyle from "./ChartSwitchStyle";
import TriggerRerenderPortfolio from "./TriggerRerenderPortfolio";
import TriggerShowVisibleLines from "./TriggerShowVisibleLines";
import symbolDataStore from "../stores/SymbolDataStore";

export default class ChartPortfolioOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedChartStyleType: "percent",
    };
    this.myRef = React.createRef();
    this.chart = {};
    this.lineSeriesObj = {};

    this.rerenderPortfolio = this.rerenderPortfolio.bind(this);
    this.rerenderVisibleLines = this.rerenderVisibleLines.bind(this);
    this.switchStyle = this.switchStyle.bind(this);
    this.createGraphForSelectedSymbols = this.createGraphForSelectedSymbols.bind(this);
    this.addLineSeriesData = this.addLineSeriesData.bind(this);
  }

  async componentDidMount() {
    this.renderChart();
    if (!this.props.configStore.isRunningSetup) this.createGraphForSelectedSymbols();
  }

  renderChart() {
    if (this.myRef.current.firstChild) {
      this.myRef.current.removeChild(this.myRef.current.firstChild);
      this.chart = null;
    }
    this.chart = createChart(
      this.myRef.current,
      this.state.selectedChartStyleType === "percent" ? stylePercent : styleAbsolut
    );
  }

  async rerenderPortfolio() {
    this.addLineSeriesData(this.props.portfolioStore.getSymbolSetForTicker("Portfolio"));
  }

  rerenderVisibleLines() {
    this.createGraphForSelectedSymbols();
  }

  switchStyle() {
    console.log("switching style");
    if (this.state.selectedChartStyleType === "absolut") {
      this.setState({ selectedChartStyleType: "percent" });
      this.chart.applyOptions(stylePercent);
    } else if (this.state.selectedChartStyleType === "percent") {
      this.setState({ selectedChartStyleType: "absolut" });
      this.chart.applyOptions(styleAbsolut);
    }
  }

  async createGraphForSelectedSymbols() {
    console.log("createGraphForSelectedSymbols");

    // Remove lines for deleted symbols
    const tempListOfAllSymbols = this.props.portfolioStore.listOfSymbolTickers;
    for (const [symbolTicker, lineSeries] of Object.entries(this.lineSeriesObj)) {
      // Check if ticker in portfolioStore symbols, if then remove lineseries
      if (!tempListOfAllSymbols.includes(symbolTicker)) {
        this.chart.removeSeries(lineSeries["series"]);
        delete this.lineSeriesObj[symbolTicker];
      }
    }

    this.props.portfolioStore.symbols.forEach((symbolSet) => {
      if (symbolSet.isVisible) {
        this.addLineSeriesData(symbolSet);
      } else {
        if (this.lineSeriesObj[symbolSet.symbolTicker] && this.lineSeriesObj[symbolSet.symbolTicker]["series"]) {
          let tempLineSeries = this.lineSeriesObj[symbolSet.symbolTicker]["series"];
          this.chart.removeSeries(tempLineSeries);
          delete this.lineSeriesObj[symbolSet.symbolTicker];
        }
      }
    });
  }

  async addLineSeriesData(symbolSet) {
    console.log("addLineSeriesData: " + symbolSet.symbolTicker);

    // TODO If data not availible then fetch data
    const dataForSymbol = await symbolDataStore.getSymbolTimeseriesDataFromMap(symbolSet.symbolTicker);

    if (!this.lineSeriesObj[symbolSet.symbolTicker]) {
      // If lineSeriesObj for ticker does not exist then create new lineSeriesObj
      let tempLineSeries = this.chart.addLineSeries({
        color: symbolSet.color,
      });
      if (dataForSymbol && dataForSymbol.length !== 0) {
        tempLineSeries.setData(dataForSymbol);
      }
      // Create new lineSeries Object
      this.lineSeriesObj[symbolSet.symbolTicker] = { series: tempLineSeries, color: symbolSet.color };
    } else {
      // If lineSeries exists then only update data, keep color
      if (dataForSymbol && dataForSymbol.length !== 0)
        this.lineSeriesObj[symbolSet.symbolTicker]["series"].setData(dataForSymbol);
    }
  }

  render() {
    return (
      <Paper style={{ padding: "10px" }}>
        <ChartSwitchStyle
          refreshData={this.refreshData}
          switchStyle={this.switchStyle}
          selectedChartStyleType={this.state.selectedChartStyleType === "absolut" ? "absolut" : "percent"}
        />
        <CalculatingProgress symbolDataStore={this.props.symbolDataStore} />
        <div ref={this.myRef} id="chart-ref"></div>
        <TriggerRerenderPortfolio
          portfolioStore={this.props.portfolioStore}
          rerenderPortfolio={this.rerenderPortfolio}
        />
        <TriggerShowVisibleLines
          portfolioStore={this.props.portfolioStore}
          rerenderVisibleLines={this.rerenderVisibleLines}
        />
      </Paper>
    );
  }
}

const CalculatingProgress = observer(({ symbolDataStore }) => (
  <div>{symbolDataStore.isCalculatingPortfolioPerformance ? <LinearProgress /> : null}</div>
));

const styleAbsolut = {
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
const stylePercent = {
  height: 400,
  rightPriceScale: {
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
    mode: PriceScaleMode.Percentage,
    borderColor: "rgba(197, 203, 206, 0.4)",
  },
};
