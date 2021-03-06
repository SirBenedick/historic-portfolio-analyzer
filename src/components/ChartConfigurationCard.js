import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Slider, Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import DatePicker from "./DatePicker";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(2),
  },
  gridItem: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const marks = [
  {
    value: -1.5,
    label: "-1.5%",
  },
  {
    value: 0,
    label: "0%",
  },
  {
    value: 1,
    label: "1%",
  },
  {
    value: 5,
    label: "5%",
  },
  {
    value: 10,
    label: "10%",
  },
];

function valuetext(value) {
  return `${value}%`;
}

const ChartConfigurationCard = observer(({ configStore, portfolioStore }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h4" gutterBottom>
        Configurations
      </Typography>
      <Grid container spacing={3} xs={12} justify="center" alignItems="center">
        <Grid item xs={6} style={{ backgroundColor: "" }} className={classes.gridItem}>
          <DatePicker portfolioStore={portfolioStore} />
        </Grid>
        <Grid item xs={6} style={{ backgroundColor: "" }} className={classes.gridItem}>
          <Typography id="discrete-slider-custom" gutterBottom>
            Risk Free Rate: {JSON.stringify(configStore.riskFreeRate)}%
          </Typography>
          <Slider
            defaultValue={configStore.riskFreeRate}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            min={-1.5}
            max={10}
            step={0.1}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={(e, val) => configStore.setRiskFreeRate(val)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
});

export default ChartConfigurationCard;
