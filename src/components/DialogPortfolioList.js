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
} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";

const DialogPortfolioList = ({ onClose, selectedValue, open, portfolioStore }) => {
  const [portfolios, setPortfolios] = useState([]);

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

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Load a saved Portfolio</DialogTitle>
      {portfolios.length === 0 && (
        <DialogContent>
          <DialogContentText>No portfolio saved! Save a portfolio to review it later.</DialogContentText>
        </DialogContent>
      )}
      <List>
        {portfolios.map((storedPortfolio) => (
          <ListItem button onClick={() => handleLoadPortfolio(storedPortfolio.name)} key={storedPortfolio.name}>
            <ListItemAvatar>
              <Avatar>
                <DonutLargeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={storedPortfolio.name} secondary={storedPortfolio.creationDate} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
export default DialogPortfolioList;
