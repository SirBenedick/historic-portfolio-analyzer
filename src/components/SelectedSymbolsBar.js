import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { observer } from "mobx-react-lite";

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
    <Paper component="ul" className={classes.root}>
      {dataStore.symbols.map((symbolSet) => {
        return (
          <li key={symbolSet.symbolTicker}>
            <Chip
              label={symbolSet.symbolTicker}
              onClick={toggleVisibility(symbolSet.symbolTicker)}
              onDelete={symbolSet.symbolTicker !== "Portfolio" ? () => handleDelete(symbolSet.symbolTicker) : false}
              className={classes.chip}
              color={symbolSet.isVisible ? "primary" : "default"}
              clickable={true}
              style={{ backgroundColor: symbolSet.isVisible ? symbolSet.color : "#eeeeee" }}
            />
          </li>
        );
      })}
    </Paper>
  );
});
export default SelectedSymbolsBar;
