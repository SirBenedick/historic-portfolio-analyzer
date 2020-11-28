import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, CircularProgress } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import KeyMetricsDialog from "./KeyMetricsDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  grid: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 16,
  },
}));
const KeyMetricCard = ({
  titel,
  description,
  value = 0,
  showPercent = false,
  showProgress = true,
  dialogTitle,
  dialogText,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("click");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          container
          item
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          className={classes.grid}
        >
          <Grid item container direction="row" justify="space-between">
            <Grid item>
              <Typography className={classes.title} color="textPrimary">
                {titel}
              </Typography>
            </Grid>
            <Grid item>
              <InfoOutlinedIcon onClick={handleClickOpen} style={{ cursor: "pointer" }} />
            </Grid>
          </Grid>
          <Grid item style={{ alignSelf: "center" }}>
            <Typography variant="h3" component="h2">
              {value ? (
                showPercent ? (
                  performanceToPercent(value)
                ) : (
                  value.toFixed(2)
                )
              ) : showProgress ? (
                <CircularProgress />
              ) : (
                value
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" component="p">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <KeyMetricsDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        dialogTitle={dialogTitle}
        dialogText={dialogText}
      />
    </div>
  );
};

function performanceToPercent(performance) {
  return (parseFloat(performance) * 100).toFixed(0) + "%";
}

export default KeyMetricCard;
