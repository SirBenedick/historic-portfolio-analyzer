import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Chip, Grid, Menu, MenuItem, ListItemIcon, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import TodayIcon from "@material-ui/icons/Today";
import DeleteIcon from "@material-ui/icons/Delete";
import MoneyIcon from "@material-ui/icons/Money";
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

const SelectedSymbolsBar = observer(({ dataStore, notificationStore }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuSelectedSymbolSet, setMenuSelectedSymbolSet] = React.useState(null);

  const toggleVisibility = (symbolTickerToHide) => () => {
    dataStore.toggleSymbolVisibility(symbolTickerToHide);
  };

  const handleDelete = (symbolTickerToDelete) => {
    dataStore.removeSelectedSymbol(symbolTickerToDelete);
    handleClose();
  };

  const handleMenuClick = (event, symbolSet) => {
    setMenuSelectedSymbolSet(symbolSet);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper className={classes.root}>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            {menuSelectedSymbolSet ? menuSelectedSymbolSet.symbolTicker : null}
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <MoneyIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            {menuSelectedSymbolSet ? menuSelectedSymbolSet.currency : "-"}
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <TodayIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            {menuSelectedSymbolSet ? menuSelectedSymbolSet.dateFetched : "-"}
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleDelete(menuSelectedSymbolSet.symbolTicker)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap color="error">
            Remove
          </Typography>
        </MenuItem>
      </Menu>

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={8}>
          <Grid container direction="row" justify="center" alignItems="center">
            {dataStore.symbolsSortedByTickerPortfolioFirst.map((symbolSet) => {
              return (
                <Chip
                  key={symbolSet.symbolTicker}
                  label={symbolSet.symbolTicker}
                  onClick={toggleVisibility(symbolSet.symbolTicker)}
                  onDelete={
                    symbolSet.symbolTicker !== "Portfolio" ? (event) => handleMenuClick(event, symbolSet) : false
                  }
                  deleteIcon={<InfoIcon />}
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
          <SearchForSymbolInput dataStore={dataStore} notificationStore={notificationStore} />
        </Grid>
      </Grid>
    </Paper>
  );
});
export default SelectedSymbolsBar;
