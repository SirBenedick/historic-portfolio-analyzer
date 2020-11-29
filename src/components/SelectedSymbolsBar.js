import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Chip, Grid, Menu, MenuItem, ListItemIcon, Typography, Badge } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import TodayIcon from "@material-ui/icons/Today";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MoneyIcon from "@material-ui/icons/Money";
import RefreshIcon from "@material-ui/icons/Refresh";
import { observer } from "mobx-react-lite";
import SearchForSymbolInput from "../components/SearchForSymbolInput";
import moment from "moment";

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

  const handleRemoveFromPortfolio = (symbolTickerToRemove) => {
    dataStore.removeSelectedSymbol(symbolTickerToRemove);
    handleClose();
  };

  const handleDeleteDataSet = (symbolTickerToDelete) => {
    dataStore.removeAndDeleteSymbol(symbolTickerToDelete);
    handleClose();
  };

  const handleReloadDataSet = (symbolTickerToDelete) => {
    dataStore.reloadDataFor(symbolTickerToDelete);
    handleClose();
  };

  const handleMenuClick = (event, symbolSet) => {
    setMenuSelectedSymbolSet(symbolSet);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isBadgeInvisible = (symbolSet) => {
    if (symbolSet.symbolTicker === "Portfolio") return true;
    if (symbolSet.dateFetched === "-") return false;

    let dateFetched = moment(symbolSet.dateFetched);
    let today = moment();

    if (dateFetched.diff(today, "days") === 0) return false;
    else if (today.isoWeekday() === 6 || today.isoWeekday() === 7) {
      if (today.diff(dateFetched, "days") < 3) return true;
    }
    return false;
  };

  const getBadgeContent = (symbolSet) => {
    if (symbolSet.symbolTicker === "Portfolio") return "";
    if (symbolSet.dateFetched === "-") return "...";

    let dateFetched = moment(symbolSet.dateFetched);
    let today = moment();

    if (dateFetched.diff(today, "days") === 0) return "";
    else if (today.isoWeekday() === 6 || today.isoWeekday() === 7) {
      if (today.diff(dateFetched, "days") < 3) return "date";
    }
    return "";
  };

  return (
    <Paper className={classes.root}>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            {menuSelectedSymbolSet ? menuSelectedSymbolSet.name : null}
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
        <MenuItem>{/* Empty to have some space between information above and actions below */}</MenuItem>
        <MenuItem onClick={() => handleReloadDataSet(menuSelectedSymbolSet.symbolTicker)}>
          <ListItemIcon>
            <RefreshIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap color="primary">
            Reload data
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleRemoveFromPortfolio(menuSelectedSymbolSet.symbolTicker)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap color="error">
            Remove from Portfolio
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleDeleteDataSet(menuSelectedSymbolSet.symbolTicker)}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap color="error">
            Delete Dataset
          </Typography>
        </MenuItem>
      </Menu>

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={8}>
          <Grid container direction="row" justify="center" alignItems="center">
            {dataStore.symbolsSortedByTickerPortfolioFirst.map((symbolSet) => {
              return (
                <Badge
                  color="error"
                  overlap="circle"
                  badgeContent={getBadgeContent(symbolSet)}
                  invisible={isBadgeInvisible(symbolSet)}
                >
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
                </Badge>
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
