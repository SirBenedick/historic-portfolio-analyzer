import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";

export default function ChartSwitchStyle({ selectedChartStyleType, switchStyle }) {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    switchStyle();
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label={selectedChartStyleType}
      />
    </FormGroup>
  );
}
