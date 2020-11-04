import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Chip, Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import SearchForSymbolInput from "../components/SearchForSymbolInput";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const SelectedSymbolsBar = observer(({ dataStore }) => {
  const classes = useStyles();

  const toggleVisibility = (symbolTickerToHide) => () => {
    dataStore.toggleSymbolVisibility(symbolTickerToHide);
  };

  const handleDelete = (symbolTickerToDelete) => {
    console.log("Deleting symbol: " + symbolTickerToDelete);
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={8}>
          <Grid container direction="row" justify="center" alignItems="center">
            {dataStore.symbols.map((symbolSet) => {
              return (
                <Chip
                  key={symbolSet.symbolTicker}
                  label={symbolSet.symbolTicker}
                  onClick={toggleVisibility(symbolSet.symbolTicker)}
                  onDelete={symbolSet.symbolTicker !== "Portfolio" ? () => handleDelete(symbolSet.symbolTicker) : false}
                  className={classes.chip}
                  color={symbolSet.isVisible ? "primary" : "default"}
                  clickable={true}
                  style={{ backgroundColor: symbolSet.isVisible ? symbolSet.color : "#eeeeee" }}
                />
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="row" justify="center" alignItems="center">
            <SearchForSymbolInput dataStore={dataStore} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
});
export default SelectedSymbolsBar;
