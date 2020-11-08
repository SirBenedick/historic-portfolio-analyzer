import React from "react";
import { observer } from "mobx-react-lite";
import { createChart, PriceScaleMode } from "lightweight-charts";
import { Paper, LinearProgress } from "@material-ui/core";
import ChartSwitchStyle from "./ChartSwitchStyle";
import idbSymbolDataStore from "../stores/idbSymbolDataStore";
import TriggerRecalculatePortfolio from "./TriggerRecalculatePortfolio";
import TriggerShowVisibleLines from "./TriggerShowVisibleLines";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedChartStyleType: "percent",
    };
    this.myRef = React.createRef();
    this.chart = {};
    this.lineSeriesObj = {};

    this.recalculateAndRenderPortfolio = this.recalculateAndRenderPortfolio.bind(this);
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

  async recalculateAndRenderPortfolio() {
    await idbSymbolDataStore.calculateAndStoreHistoricPortfolioPerformance();
    this.addLineSeriesData(this.props.dataStore.getSymbolSetForTicker("Portfolio"));
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
    const tempListOfAllSymbols = this.props.dataStore.listOfSymbolTickers;
    for (const [symbolTicker, lineSeries] of Object.entries(this.lineSeriesObj)) {
      // Check if ticker in dataStore symbols, if then remove lineseries
      if (!tempListOfAllSymbols.includes(symbolTicker)) {
        this.chart.removeSeries(lineSeries["series"]);
        delete this.lineSeriesObj[symbolTicker];
      }
    }

    this.props.dataStore.symbols.forEach((symbolSet) => {
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
    const dataForSymbol = await idbSymbolDataStore.getDataChartFormatBySymbol(symbolSet.symbolTicker);

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
      <Paper style={{ padding: "10px", marginTop: "10px" }}>
        <ChartSwitchStyle
          refreshData={this.refreshData}
          switchStyle={this.switchStyle}
          selectedChartStyleType={this.state.selectedChartStyleType === "absolut" ? "absolut" : "percent"}
          dataStore={this.props.dataStore}
        />
        <CalculatingProgress symbolDataStore={this.props.symbolDataStore} />
        <div ref={this.myRef} id="chart-ref"></div>
        <TriggerRecalculatePortfolio
          dataStore={this.props.dataStore}
          recalculateAndRenderPortfolio={this.recalculateAndRenderPortfolio}
        />
        <TriggerShowVisibleLines dataStore={this.props.dataStore} rerenderVisibleLines={this.rerenderVisibleLines} />
      </Paper>
    );
  }
}

const CalculatingProgress = observer(({ symbolDataStore }) => (
  <div>{symbolDataStore.isCalculatingPortfolioPerformance ? <LinearProgress /> : null}</div>
));

const styleAbsolut = {
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
