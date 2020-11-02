import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Grid from "@material-ui/core/Grid";

import SelectedSymbolsBar from "../components/SelectedSymbolsBar";
import Chart from "../components/Chart";
import PortfolioBuilder from "../components/PortfolioBuilder";

const ChartingPage = forwardRef((props, ref) => {
  const chartRef = useRef();

  useImperativeHandle(ref, () => ({
    rerenderChartRef() {
      chartRef.current.rerenderChartRef();
    },
  }));

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectedSymbolsBar dataStore={props.dataStore} />
        </Grid>
        <Grid item xs={12}>
          <Chart ref={chartRef} />
        </Grid>
        <Grid item xs={6}>
          <PortfolioBuilder dataStore={props.dataStore} />
        </Grid>
      </Grid>
    </div>
  );
});

export default ChartingPage;
