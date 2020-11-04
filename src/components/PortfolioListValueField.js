import React from "react";
import { FormControl, InputLabel, Input, InputAdornment } from "@material-ui/core";
import { observer } from "mobx-react-lite";

const PortfolioListValueField = observer(({ dataStore, symbolSet }) => {
  const onValueChange = (value) => {
    dataStore.setValueForTicker(symbolSet.symbolTicker, value);
  };
  return (
    <FormControl style={{ maxWidth: "80px" }}>
      <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
      <Input
        id={`standard-adornment-amount-${symbolSet.symbolTicker}`}
        size="small"
        value={symbolSet.value}
        onChange={(event) => onValueChange(event.target.value)}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
    </FormControl>
  );
});

export default PortfolioListValueField;
