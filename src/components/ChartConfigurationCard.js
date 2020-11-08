import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Slider, Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  paper: {
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
    value: 2,
    label: "2%",
  },
  {
    value: 5,
    label: "5%",
  },
];

function valuetext(value) {
  return `${value}%`;
}

const ChartConfigurationCard = observer(({ configStore }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={1}>
      <Grid container spacing={3} xs={8}>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Configurations
          </Typography>
        </Grid>
        <Grid container item>
          <Grid item xs={6}>
            <Typography>Risk free Rate</Typography>
          </Grid>
          <Grid item xs={6}>
            <Slider
              defaultValue={configStore.riskFreeRate}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-custom"
              min={-1.5}
              max={5}
              step={0.1}
              valueLabelDisplay="auto"
              marks={marks}
              onChangeCommitted={(e, val) => configStore.setRiskFreeRate(val)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default ChartConfigurationCard;
