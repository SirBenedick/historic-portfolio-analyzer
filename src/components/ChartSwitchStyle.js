import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
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
