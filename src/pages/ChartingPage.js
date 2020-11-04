import React from "react";
import Grid from "@material-ui/core/Grid";

import SelectedSymbolsBar from "../components/SelectedSymbolsBar";
import Chart from "../components/Chart";
import PortfolioBuilder from "../components/PortfolioBuilder";

const ChartingPage = (props) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectedSymbolsBar dataStore={props.dataStore} />
        </Grid>
        <Grid item xs={12}>
          <Chart dataStore={props.dataStore} />
        </Grid>
        <Grid item xs={12}>
          <PortfolioBuilder dataStore={props.dataStore} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChartingPage;
