import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Chip, Grid, Menu, MenuItem, ListItemIcon, Typography, Badge, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import TodayIcon from "@material-ui/icons/Today";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MoneyIcon from "@material-ui/icons/Money";
import SaveIcon from "@material-ui/icons/Save";
import FolderIcon from "@material-ui/icons/Folder";
import RefreshIcon from "@material-ui/icons/Refresh";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { observer } from "mobx-react-lite";
import SearchForSymbolInput from "../components/SearchForSymbolInput";
import moment from "moment";
import DialogPortfolioList from "./DialogPortfolioList";
import DialogPortfolioSaveForm from "./DialogPortfolioSaveForm";

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
  divider: { backgroundColor: "#829baf", width: "100%", height: "2px" },
}));

const SelectedSymbolsBar = observer(({ portfolioStore, notificationStore }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isNormalMenuOpen, setIsNormalMenuOpen] = React.useState(false);
  const [isPortfolioMenuOpen, setIsPortfolioMenuOpen] = React.useState(false);
  const [menuSelectedSymbolSet, setMenuSelectedSymbolSet] = React.useState(null);
  const [openDialogPortfolioList, setOpenDialogPortfolioList] = React.useState(false);
  const [selectedPortfolioValue, setSelectedPortfolioValue] = React.useState();
  const [openDialogPortfolioSaveForm, setOpenDialogPortfolioSaveForm] = React.useState(false);

  const toggleVisibility = (symbolTickerToHide) => () => {
    portfolioStore.toggleSymbolVisibility(symbolTickerToHide);
  };

  const handleOnlyShow = (symbolTickerToShow) => {
    portfolioStore.setVisibilityForHideOther(symbolTickerToShow);
    handleClose();
    handlePortfolioClose();
  };

  const handleMenuClick = (event, symbolSet) => {
    setMenuSelectedSymbolSet(symbolSet);
    setAnchorEl(event.currentTarget);
    setIsNormalMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsNormalMenuOpen(false);
  };

  const handlePortfolioOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsPortfolioMenuOpen(true);
  };

  const handlePortfolioClose = () => {
    setAnchorEl(null);
    setIsPortfolioMenuOpen(false);
  };

  const isBadgeInvisible = (symbolSet) => {
    if (symbolSet.symbolTicker === "Portfolio") return true;
    if (symbolSet.dateFetched === "-") return false;
    if (!symbolSet.dateFetched) return false;

    // If date exists then check the diffrence from today since data was fetched
    let dateFetched = moment(symbolSet.dateFetched);
    let today = moment();

    if (today.diff(dateFetched, "days") <= 1) return true;

    const isoWeekday = today.isoWeekday();
    switch (isoWeekday) {
      // Saturday
      case 6:
        if (today.diff(dateFetched, "days") <= 1) return true;
        break;
      // Sunday
      case 7:
        if (today.diff(dateFetched, "days") <= 2) return true;
        break;
      // Monday
      case 1:
        if (today.diff(dateFetched, "days") <= 3) return true;
        break;

      default:
        break;
    }
    return false;
  };

  const getBadgeContent = (symbolSet) => {
    if (symbolSet.dateFetched === "-") return "...";
    if (!symbolSet.dateFetched) return "...";
    return "date";
  };

  const handleDialogPortfolioListOpen = () => {
    setOpenDialogPortfolioList(true);
  };

  const handleDialogPortfolioListClose = (value) => {
    setOpenDialogPortfolioList(false);
    setSelectedPortfolioValue(value);
  };

  const handleDialogPortfolioSaveFormOpen = () => {
    setOpenDialogPortfolioSaveForm(true);
  };

  const handleDialogPortfolioSaveFormClose = () => {
    setOpenDialogPortfolioSaveForm(false);
  };

  return (
    <Paper className={classes.root}>
      <ChipMenuPortfolio
        anchorEl={anchorEl}
        isPortfolioMenuOpen={isPortfolioMenuOpen}
        handlePortfolioClose={handlePortfolioClose}
        handleOnlyShow={handleOnlyShow}
      />

      <ChipMenuNormal
        anchorEl={anchorEl}
        isNormalMenuOpen={isNormalMenuOpen}
        handleClose={handleClose}
        handleOnlyShow={handleOnlyShow}
        menuSelectedSymbolSet={menuSelectedSymbolSet}
        portfolioStore={portfolioStore}
      />

      {openDialogPortfolioList && (
        <DialogPortfolioList
          selectedValue={selectedPortfolioValue}
          open={openDialogPortfolioList}
          onClose={handleDialogPortfolioListClose}
          portfolioStore={portfolioStore}
          notificationStore={notificationStore}
        />
      )}

      <DialogPortfolioSaveForm
        open={openDialogPortfolioSaveForm}
        onClose={handleDialogPortfolioSaveFormClose}
        portfolioStore={portfolioStore}
        notificationStore={notificationStore}
      />

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={2}>
          <IconButton component="span" onClick={handleDialogPortfolioListOpen}>
            <FolderIcon />
          </IconButton>
          <IconButton component="span" onClick={handleDialogPortfolioSaveFormOpen}>
            <SaveIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row" justify="center" alignItems="center">
            {portfolioStore.symbolsSortedByTickerPortfolioFirst.map((symbolSet) => {
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
                      symbolSet.symbolTicker !== "Portfolio"
                        ? (event) => handleMenuClick(event, symbolSet)
                        : (event) => handlePortfolioOpen(event)
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
          <SearchForSymbolInput portfolioStore={portfolioStore} notificationStore={notificationStore} />
        </Grid>
      </Grid>
    </Paper>
  );
});

const ChipMenuPortfolio = ({ isPortfolioMenuOpen, handlePortfolioClose, handleOnlyShow, anchorEl }) => {
  return (
    <Menu
      id="simple-menu-portfolio"
      anchorEl={anchorEl}
      keepMounted
      open={isPortfolioMenuOpen}
      onClose={handlePortfolioClose}
    >
      <MenuItem onClick={() => handleOnlyShow("Portfolio")}>
        <ListItemIcon>
          <VisibilityIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap color="primary">
          Hide other assets
        </Typography>
      </MenuItem>
    </Menu>
  );
};

const ChipMenuNormal = ({
  anchorEl,
  isNormalMenuOpen,
  handleClose,
  handleOnlyShow,
  menuSelectedSymbolSet,
  portfolioStore,
}) => {
  const classes = useStyles();
  const handleRemoveFromPortfolio = (symbolTickerToRemove) => {
    portfolioStore.removeSelectedSymbol(symbolTickerToRemove);
    handleClose();
  };

  const handleDeleteDataSet = (symbolTickerToDelete) => {
    portfolioStore.removeAndDeleteSymbol(symbolTickerToDelete);
    handleClose();
  };

  const handleReloadDataSet = (symbolTickerToDelete) => {
    portfolioStore.reloadDataFor(symbolTickerToDelete);
    handleClose();
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={isNormalMenuOpen}
      onClose={handleClose}
      handleOnlyShow={handleOnlyShow}
    >
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
      <MenuItem>
        <span className={classes.divider} />
      </MenuItem>
      <MenuItem onClick={() => handleOnlyShow(menuSelectedSymbolSet.symbolTicker)}>
        <ListItemIcon>
          <VisibilityIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap color="primary">
          Hide other assets
        </Typography>
      </MenuItem>
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
  );
};

export default SelectedSymbolsBar;
