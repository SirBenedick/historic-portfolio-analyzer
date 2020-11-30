import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@material-ui/core";
import { observer } from "mobx-react";

const useStyles = makeStyles({ tabellCellClickable: { cursor: "pointer" } });

const PortfolioBuilder = observer(({ portfolioStore }) => {
  const classes = useStyles();
  let index = 1;

  const getItemNumber = (symbolTicker) => {
    if (symbolTicker === "Portfolio") {
      return null;
    } else {
      const result = index + ".";
      index++;
      return result;
    }
  };

  const setPortfolioBuilderSetting = (newVal) => {
    portfolioStore.setPortfolioBuilderSetting(newVal);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell onClick={() => setPortfolioBuilderSetting("ticker")} className={classes.tabellCellClickable}>
              Symbol
            </TableCell>
            <TableCell onClick={() => setPortfolioBuilderSetting("name")} className={classes.tabellCellClickable}>
              Name
            </TableCell>
            <TableCell
              id="annualized"
              align="right"
              onClick={() => setPortfolioBuilderSetting("performance_annualized")}
              className={classes.tabellCellClickable}
            >
              Annualized Performance
            </TableCell>
            <TableCell
              id="performance"
              align="right"
              onClick={() => setPortfolioBuilderSetting("performance_since_start")}
              className={classes.tabellCellClickable}
            >
              Performance since start
            </TableCell>
            <TableCell
              align="right"
              style={{ maxWidth: "80px" }}
              onClick={() => setPortfolioBuilderSetting("value")}
              className={classes.tabellCellClickable}
            >
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolioStore.symbolsSortedByPortfolioBuilderSetting.map((symbolSet) => {
            return (
              <TableRow key={symbolSet.symbolTicker}>
                <TableCell component="th" scope="row">
                  {getItemNumber(symbolSet.symbolTicker)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {symbolSet.symbolTicker === "Portfolio" ? <b>{symbolSet.symbolTicker}</b> : symbolSet.symbolTicker}
                </TableCell>
                <TableCell align="left">
                  {symbolSet.name === "Portfolio" ? <b>{symbolSet.name}</b> : symbolSet.name}
                </TableCell>
                <TableCell align="right">
                  {performanceToPercent(symbolSet.annualizedPerformanceSincePortfolioStart)}
                </TableCell>
                <TableCell align="right">{performanceToPercent(symbolSet.performanceSincePortfolioStart)}</TableCell>
                <TableCell align="right">
                  {symbolSet.symbolTicker === "Portfolio" ? (
                    <Typography noWrap>End: ${symbolSet.endValue.toFixed(2)}</Typography>
                  ) : (
                    <input
                      type="text"
                      value={symbolSet.value}
                      onChange={(event) => portfolioStore.setValueForTicker(symbolSet.symbolTicker, event.target.value)}
                      style={{ maxWidth: "60px" }}
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell align="right">
            <Typography noWrap>Total: ${portfolioStore.totalValueOfSymbols}</Typography>
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
});

function performanceToPercent(performance) {
  return (parseFloat(performance) * 100).toFixed(2) + "%";
}

export default PortfolioBuilder;
