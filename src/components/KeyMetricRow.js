import React from "react";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Link } from "@material-ui/core";
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
const KeyIndicatorRow = observer(({ portfolioStore, keyMetricsStore }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="space-evenly" alignItems="center">
        <Grid item xs={2}>
          <KeyMetricCard
            titel={"Peformance"}
            description={"Portfolio performance since start"}
            value={portfolioStore.getSymbolSetForTicker("Portfolio").performanceSincePortfolioStart}
            showPercent={true}
            dialogTitle={"Performance since start"}
            dialogText={
              <div>
                <Typography>
                  Shows the performance of the portfolio since the given start date based on the configured start
                  values.
                </Typography>
                <Typography>Dividends are reinvested and not payed out.</Typography>
              </div>
            }
          />
        </Grid>
        <Grid item xs={2}>
          <KeyMetricCard
            titel={"Annualized"}
            description={"Annualized portfolio performance since start"}
            value={portfolioStore.getSymbolSetForTicker("Portfolio").yearlyPerformanceSincePortfolioStart}
            showPercent={true}
            dialogTitle={"Annualized Performance"}
            dialogText={
              <div>
                <Typography>
                  Shows the annualized performance of the portfolio since the given start date. Total perfomance is
                  divided by the number of days since start and then multiplied by 252 days.
                </Typography>
                <Typography>Assumption: A regular year has 252 trading days.</Typography>
              </div>
            }
          />
        </Grid>
        <Grid item xs={2}>
          <KeyMetricCard
            titel={"Dividend"}
            description={"Dividends accumulated since start"}
            value={portfolioStore.getSymbolSetForTicker("Portfolio").totalDividendPayout}
            showProgress={false}
            dialogTitle={"Dividends"}
            dialogText={
              <div>
                <Typography>
                  Total amount of dividends since portfolio start based on the amount of each share.
                </Typography>
                <Typography color="error">
                  IMPORTANT: Dividends are not payed out, they are reinvested into the stock which payed the dividend.
                </Typography>
              </div>
            }
          />
        </Grid>
        <Grid item xs={2}>
          <KeyMetricCard
            titel={"Sharp Ratio"}
            description={"Return compared to configured risk"}
            value={keyMetricsStore.portfolioSharpRatio}
            dialogTitle={"Sharp Ratio"}
            dialogText={
              <div>
                <Typography>
                  ‚The Sharpe ratio was developed by Nobel laureate William F. Sharpe and is used to help investors
                  understand the return of an investment compared to its risk. The ratio is the average return earned in
                  excess of the risk-free rate per unit of volatility or total risk. Volatility is a measure of the
                  price fluctuations of an asset or portfolio.’ -{" "}
                  <Link href="https://www.investopedia.com/terms/s/sharperatio.asp" target="_blank" rel="noreferrer">
                    Investopedia
                  </Link>
                </Typography>
                <Typography>Calculated with the configured risk free rate.</Typography>
              </div>
            }
          />
        </Grid>
      </Grid>
    </div>
  );
});

export default KeyIndicatorRow;
