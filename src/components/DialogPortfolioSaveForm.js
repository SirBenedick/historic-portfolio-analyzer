import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DialogPortfolioSaveForm = ({ open, onClose, portfolioStore, notificationStore }) => {
  const [portfolioName, setPortfolioName] = React.useState("");

  const handleSavePortfolio = async () => {
    console.log(portfolioName);
    await portfolioStore.saveCurrentPortfolio(portfolioName);
    notificationStore.enqueueSnackbar({
      message: `Saved current Portfolio: ${portfolioName}`,
      options: {
        variant: "success",
        autoHideDuration: 2000,
      },
      key: `STORED-${portfolioName}`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Save the current Portfolio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          XXXXXX To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Portfolio Name"
          type="texts"
          fullWidth
          onChange={(e) => setPortfolioName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSavePortfolio} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPortfolioSaveForm;
