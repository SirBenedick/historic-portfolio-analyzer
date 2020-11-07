import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import DatePicker from "./DatePicker";

export default function ChartSwitchStyle({ dataStore, selectedChartStyleType, switchStyle }) {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    switchStyle();
  };

  return (
    <FormGroup row>
      <DatePicker dataStore={dataStore} />
      <FormControlLabel
        control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label={selectedChartStyleType}
      />
    </FormGroup>
  );
}
