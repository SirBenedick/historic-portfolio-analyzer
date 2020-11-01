import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { observer } from "mobx-react";

import PortfolioListValueField from "./PortfolioListValueField";
import DatePicker from "./DatePicker";

const useStyles = makeStyles({});

export default function PortfolioBuilder(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            {/* <TableCell align="right">Entry Date</TableCell> */}
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataStore.symbols.map((symbolSet) => {
            if (symbolSet.symbolTicker !== "All")
              return (
                <TableRow key={symbolSet.symbolTicker}>
                  <TableCell component="th" scope="row">
                    {symbolSet.symbolTicker}
                  </TableCell>
                  {/* <TableCell align="right">
                    <DatePicker entryDate={symbolSet.entryDate}/>
                  </TableCell> */}
                  <TableCell align="right">
                    <PortfolioListValueField dataStore={props.dataStore} symbolSet={symbolSet} />
                  </TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
      <SummaryOfPortfolio dataStore={props.dataStore} />
      <DatePicker dataStore={props.dataStore}/>
    </TableContainer>
  );
}

const SummaryOfPortfolio = observer(({ dataStore }) => {
  return <div>Total: ${dataStore.totalValueOfSymbols}</div>;
});
