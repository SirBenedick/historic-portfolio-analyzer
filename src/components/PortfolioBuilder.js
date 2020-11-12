import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@material-ui/core";
import { observer } from "mobx-react";

const useStyles = makeStyles({});

const PortfolioBuilder = observer(({ dataStore }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell id="annualized" align="right">
              Annualized Performance
            </TableCell>
            <TableCell id="performance" align="right">
              Performance since start
            </TableCell>
            <TableCell align="right" style={{ maxWidth: "80px" }}>
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataStore.symbols.map((symbolSet, index) => {
            return (
              <TableRow key={symbolSet.symbolTicker}>
                <TableCell component="th" scope="row">
                  {index !== 0 ? index + "." : null}
                </TableCell>
                <TableCell component="th" scope="row">
                  {symbolSet.symbolTicker}
                </TableCell>
                <TableCell align="left">{symbolSet.name}</TableCell>
                <TableCell align="right">
                  {performanceToPercent(symbolSet.yearlyPerformanceSincePortfolioStart)}
                </TableCell>
                <TableCell align="right">{performanceToPercent(symbolSet.performanceSincePortfolioStart)}</TableCell>
                <TableCell align="right">
                  {symbolSet.symbolTicker === "Portfolio" ? (
                    <Typography noWrap>End: ${symbolSet.endValue.toFixed(2)}</Typography>
                  ) : (
                    <input
                      type="text"
                      value={symbolSet.value}
                      onChange={(event) => dataStore.setValueForTicker(symbolSet.symbolTicker, event.target.value)}
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
          <TableCell align="right">
            <Typography noWrap>Total: ${dataStore.totalValueOfSymbols}</Typography>
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
