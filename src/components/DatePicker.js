import React from "react";
import { observer } from "mobx-react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const DatePicker = observer(({ dataStore }) => {
  const handleDateChange = (date) => {
    const dateString = date.format("YYYY-MM-DD");

    // Regex to evaluate YYYY-MM-DD  format
    const patternDateFormat = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

    // If a match exists then set portfolioStartingDate
    if (patternDateFormat.exec(dateString)) {
      dataStore.setPortfolioStartingDate(dateString);
    }
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
