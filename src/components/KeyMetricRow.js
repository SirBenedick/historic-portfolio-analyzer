import React from "react";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import KeyMetricCard from "./KeyMetricCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  title: {
    fontSize: 14,
  },
}));
const KeyIndicatorRow = observer(({ dataStore, keyMetricsStore }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="space-evenly" alignItems="center">
        <Grid item xs={2}>
          <KeyMetricCard
            titel={"Peformance"}
            description={"Portfolio performance since start"}
            value={dataStore.getSymbolSetForTicker("Portfolio").performanceSincePortfolioStart}
            showPercent={true}
          />
        </Grid>
        <Grid item xs={2}>
          <KeyMetricCard
            titel={"Peformance"}
            description={"Portfolio performance annualized since start"}
            value={dataStore.getSymbolSetForTicker("Portfolio").yearlyPerformanceSincePortfolioStart}
            showPercent={true}
          />
        </Grid>
        <Grid item xs={2}>
          <KeyMetricCard
            titel={"Dividend"}
            description={"Dividends payed out since start"}
            value={dataStore.getSymbolSetForTicker("Portfolio").totalDividendPayout}
          />
        </Grid>
        <Grid item xs={2}>
          <KeyMetricCard
            titel={"Sharp Ratio"}
            description={"Calculated based on set risk free rate"}
            value={keyMetricsStore.portfolioSharpRatio}
          />
        </Grid>
      </Grid>
    </div>
  );
});

export default KeyIndicatorRow;
