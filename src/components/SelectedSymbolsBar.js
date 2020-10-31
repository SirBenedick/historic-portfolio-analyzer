import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { observer } from "mobx-react-lite"

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


const SelectedSymbolsBar = observer(({dataStore}) => {
  const classes = useStyles();

  const toggleVisibility = (symbolTickerToHide) => () => {
    dataStore.toggleSymbolVisibility(symbolTickerToHide)
    // Can be deleted in future
    if(symbolTickerToHide != "All") console.log(JSON.stringify(dataStore.dataForSymbolTicker(symbolTickerToHide)))
    if(symbolTickerToHide === "All") console.log(JSON.stringify(dataStore.tempAllComputedEvenWeight()))
  };

  return (
    <Paper component="ul" className={classes.root}>
      {dataStore.symbols.map((symbol) => {

        return (
          <li key={symbol.symbolTicker}>
            <Chip
              label={symbol.symbolTicker}
              onClick={toggleVisibility(symbol.symbolTicker)}
              className={classes.chip}
              color={symbol.isVisible ? "primary" : "default"}
              clickable={true}
            />
          </li>
        );
      })}
    </Paper>
  );
})
export default SelectedSymbolsBar