import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@material-ui/core";

const DialogPortfolioList = ({ onClose, selectedValue, open, portfolioStore }) => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    getPortfolios();
  }, portfolios);

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
      <List>
        {portfolios.map((name) => (
          <ListItem button onClick={() => handleLoadPortfolio(name)} key={name}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
export default DialogPortfolioList;
