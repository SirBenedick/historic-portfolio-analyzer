import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  DialogContent,
  DialogContentText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  DialogActions,
} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import DeleteIcon from "@material-ui/icons/Delete";

const DialogPortfolioList = ({ onClose, selectedValue, open, portfolioStore, notificationStore }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [portfolioToDelete, setPortfolioToDelete] = useState("");

  useEffect(() => {
    getPortfolios();
  });

  const getPortfolios = async () => {
    const _portfolios = await portfolioStore.getListOfAllSavedPortfolioNames();
    setPortfolios(_portfolios);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleLoadPortfolio = (portfolioName) => {
    portfolioStore.loadSavedPortfolio(portfolioName);
    onClose();
  };

  const handleDialogAlertDeletePortfolioClose = () => {
    setPortfolioToDelete("");
  };

  const handleOpenDialogAlertDeletePortfolioClose = (portfolioName) => {
    setPortfolioToDelete(portfolioName);
  };

  const handleDeletePortfolio = async (portfolioName) => {
    setPortfolioToDelete("");
    await portfolioStore.deleteSavedPortfolio(portfolioName);
    await getPortfolios();
    notificationStore.enqueueSnackbar({
      message: `Deleted portfolio: ${portfolioName}`,
      options: {
        variant: "info",
        autoHideDuration: 2000,
      },
      key: `DELETED-PORTFOLIO-${portfolioName}`,
    });
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Load a saved Portfolio</DialogTitle>
      {portfolios.length === 0 && (
        <DialogContent>
          <DialogContentText>No portfolio saved! Save a portfolio to review it later.</DialogContentText>
        </DialogContent>
      )}
      <DialogAlertDeletePortfolio
        open={portfolioToDelete}
        handleClose={handleDialogAlertDeletePortfolioClose}
        handleDelete={handleDeletePortfolio}
      />
      <List>
        {portfolios.map(
          (storedPortfolio) =>
            storedPortfolio && (
              <ListItem button onClick={() => handleLoadPortfolio(storedPortfolio.name)} key={storedPortfolio.name}>
                <ListItemAvatar>
                  <Avatar>
                    <DonutLargeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={storedPortfolio.name} secondary={storedPortfolio.creationDate} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleOpenDialogAlertDeletePortfolioClose(storedPortfolio.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
        )}
      </List>
    </Dialog>
  );
};

const DialogAlertDeletePortfolio = ({ open, handleClose, handleDelete }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete the portfolio: {open}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the portfolio {open}. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(open)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DialogPortfolioList;
