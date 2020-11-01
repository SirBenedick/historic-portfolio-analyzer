import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import SelectedSymbolsBar from "../components/SelectedSymbolsBar";
import Chart from "../components/Chart";
import PortfolioBuilder from "../components/PortfolioBuilder";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ChartingPage(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectedSymbolsBar dataStore={props.dataStore} />
        </Grid>
        <Grid item xs={12}>
          <Chart />
        </Grid>
        <Grid item xs={6}>
          {/* <PortfolioBuilder dataStore={props.dataStore}/> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default ChartingPage;
