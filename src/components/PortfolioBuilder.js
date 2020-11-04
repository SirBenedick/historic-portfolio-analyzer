import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { observer } from "mobx-react";

const useStyles = makeStyles({});

const PortfolioBuilder = observer(({ dataStore }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Performance</TableCell>
            <TableCell align="right" style={{ maxWidth: "80px" }}>
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataStore.symbols.map((symbolSet) => {
            if (symbolSet.symbolTicker !== "Portfolio")
              return (
                <TableRow key={symbolSet.symbolTicker}>
                  <TableCell component="th" scope="row">
                    {symbolSet.symbolTicker}
                  </TableCell>
                  <TableCell align="left">{symbolSet.name}</TableCell>
                  <TableCell align="right">{symbolSet.performanceSincePortfolioStart}</TableCell>
                  <TableCell align="right">
                    <input
                      type="text"
                      value={symbolSet.value}
                      onChange={(event) => dataStore.setValueForTicker(symbolSet.symbolTicker, event.target.value)}
                      style={{ maxWidth: "60px" }}
                    />
                  </TableCell>
                </TableRow>
              );
            else return null;
          })}
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

export default PortfolioBuilder;
