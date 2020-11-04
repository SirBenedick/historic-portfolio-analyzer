import React from "react";
import { observer } from "mobx-react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const DatePicker = observer(({ dataStore }) => {
  const handleDateChange = (date) => {
    dataStore.setPortfolioStartingDate(date.format("YYYY-MM-DD"));
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="yyyy-MM-DD"
        margin="normal"
        id="date-picker-starting-datet"
        label="Starting date"
        value={dataStore.portfolioStartingDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
});

export default DatePicker;
