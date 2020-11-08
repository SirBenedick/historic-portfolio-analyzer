import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  title: {
    fontSize: 14,
  },
}));
const KeyIndicatorCard = ({ titel, description, value = 0, showPercent = false }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container item direction="column" justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {titel}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" component="h2">
              {showPercent ? performanceToPercent(value) : value.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" component="p">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

function performanceToPercent(performance) {
  return (parseFloat(performance) * 100).toFixed(0) + "%";
}

export default KeyIndicatorCard;
