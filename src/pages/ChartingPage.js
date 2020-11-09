import React from "react";
import Grid from "@material-ui/core/Grid";

import SelectedSymbolsBar from "../components/SelectedSymbolsBar";
import Chart from "../components/Chart";
import PortfolioBuilder from "../components/PortfolioBuilder";
import KeyMetricRow from "../components/KeyMetricRow";
import ChartConfigurationCard from "../components/ChartConfigurationCard";

const ChartingPage = ({ dataStore, notificationStore, configStore, symbolDataStore, keyMetricsStore }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} spacing={3}>
          <SelectedSymbolsBar dataStore={dataStore} notificationStore={notificationStore} />
        </Grid>
        <Grid item xs={12} spacing={3}>
          <KeyMetricRow dataStore={dataStore} keyMetricsStore={keyMetricsStore} />
        </Grid>
        <Grid item xs={12}>
          <Chart dataStore={dataStore} configStore={configStore} symbolDataStore={symbolDataStore} />
        </Grid>
        <Grid item xs={12}>
          <PortfolioBuilder dataStore={dataStore} />
        </Grid>
        <Grid item xs={12}>
          <ChartConfigurationCard configStore={configStore} dataStore={dataStore} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChartingPage;
