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
      selectedChartStyle: styleDefault,
      selectedChartStyleType: "default",
    };
    this.myRef = React.createRef();
    this.chart = {};
    this.lineSeries = {};
    this.lineSeries2 = {};
    this.refreshData = this.refreshData.bind(this);
    this.switchStyle = this.switchStyle.bind(this);
  }

  componentDidMount() {
    this.renderChart();
    fetchDataService.fetchApple().then((res) => {
      console.log("fetched data");
      this.refreshData();
    });
  }

  renderChart() {
    console.log("first");
    console.log(this.myRef.current.firstChild);
    if (this.myRef.current.firstChild) {
      this.myRef.current.removeChild(this.myRef.current.firstChild);
      this.chart = null;
    }
    this.chart = createChart(this.myRef.current, this.state.selectedChartStyle);
    console.log(this.myRef.current.firstChild);

    this.lineSeries = this.chart.addLineSeries();
    this.lineSeries2 = this.chart.addLineSeries();
    this.refreshData();
  }

  refreshData() {
    console.log("refres");
    this.setState({ data: dataStore.appleData });
    this.lineSeries.setData(dataStore.appleData);
    this.lineSeries2.setData(dataStore.appleData.map((entry) => ({ time: entry.time, value: entry.value + 10 })));
  }

  switchStyle() {
    console.log("switched");
    if (this.state.selectedChartStyleType === "default") {
      this.setState({ selectedChartStyleType: "percent", selectedChartStyle: stylePercent });
    } else {
      this.setState({ selectedChartStyleType: "default", selectedChartStyle: styleDefault });
    }
    console.log(this.state.selectedChartStyleType);
    this.renderChart();
  }

  render() {
    return (
      <Paper style={{ padding: "10px", marginTop: "10px" }}>
        <ChartSwitchStyle
          refreshData={this.refreshData}
          switchStyle={this.switchStyle}
          selectedChartStyleType={this.state.selectedChartStyleType === "default" ? "percent" : "default"}
        />
        <div ref={this.myRef} id="here"></div>
      </Paper>
    );
  }
}

const styleDefault = { height: 300 };
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
