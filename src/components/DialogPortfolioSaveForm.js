import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DialogPortfolioSaveForm = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Save the current Portfolio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          XXXXXX To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
        <TextField autoFocus margin="dense" id="name" label="Portfolio Name" type="texts" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPortfolioSaveForm;
