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

  const checkIfEnterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      handleSavePortfolio();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Save Portfolio</DialogTitle>
      <DialogContent>
        <DialogContentText>Save the current Portfolio to reuse later.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Portfolio Name"
          type="text"
          fullWidth
          onChange={(e) => setPortfolioName(e.target.value)}
          onKeyDown={checkIfEnterKeyPressed}
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
