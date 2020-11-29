import React from "react";
import Grid from "@material-ui/core/Grid";

import SelectedSymbolsBar from "../components/SelectedSymbolsBar";
import PortfolioBuilder from "../components/PortfolioBuilder";
import KeyMetricRow from "../components/KeyMetricRow";
import ChartConfigurationCard from "../components/ChartConfigurationCard";
import TabBar from "../components/TabBar";

const ChartingPage = ({ portfolioStore, notificationStore, configStore, symbolDataStore, keyMetricsStore }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} spacing={3}>
          <SelectedSymbolsBar portfolioStore={portfolioStore} notificationStore={notificationStore} />
        </Grid>
        <Grid item xs={12} spacing={3}>
          <KeyMetricRow portfolioStore={portfolioStore} keyMetricsStore={keyMetricsStore} />
        </Grid>
        <Grid item xs={12}>
          <TabBar
            portfolioStore={portfolioStore}
            configStore={configStore}
            symbolDataStore={symbolDataStore}
            keyMetricsStore={keyMetricsStore}
          />
        </Grid>
        <Grid item xs={12}>
          <PortfolioBuilder portfolioStore={portfolioStore} />
        </Grid>
        <Grid item xs={12}>
          <ChartConfigurationCard configStore={configStore} portfolioStore={portfolioStore} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ChartingPage;
