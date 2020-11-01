import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, FormControl, InputLabel, Input } from "@material-ui/core";
import { observer } from "mobx-react"

import dataStore from "../stores/DataStore";
import DatePicker from "./DatePicker";
import PortfolioListValueField from "./PortfolioListValueField"

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

export default function PortfolioBuilder(props) {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onCellChange = (symbolSet, value) => {
    props.dataStore.setValueForSymbolTicker(symbolSet.symbolTicker, value)
  };

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
            if (symbolSet.name !== "All")
              return (
                <TableRow key={symbolSet.symbolTicker}>
                  <TableCell component="th" scope="row">
                    {symbolSet.name}
                  </TableCell>
                  {/* <TableCell align="right">
                    <DatePicker entryDate={symbolSet.entryDate}/>
                  </TableCell> */}
                  <TableCell align="right">
                      <PortfolioListValueField dataStore={props.dataStore} />
                    <TextField value={symbolSet.value} onChange={(event) => onCellChange(symbolSet, event.target.value)} />
                    {/* <FormControl fullWidth className={classes.margin}>
                      <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                      <Input
                        id="standard-adornment-amount"
                        value={"values.amount"}
                        onChange={handleChange("amount")}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />
                    </FormControl> */}
                  </TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
      {/* <p>{props.dataStore.symbols.reduce((pv, symbolSet) => pv + symbolSet.value, 0)}</p> */}
      {/* <p>{props.dataStore.symbols}</p> */}
    </TableContainer>
  );
}
