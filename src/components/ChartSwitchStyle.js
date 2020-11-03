import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

export default function ChartSwitchStyle(props) {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.switchStyle();
  };

  return (
    <FormGroup row>
      <Button variant="contained" onClick={props.createGraphForSelectedSymbols}>
        Display selected
      </Button>
      <FormControlLabel
        control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label={props.selectedChartStyleType}
      />
    </FormGroup>
  );
}
