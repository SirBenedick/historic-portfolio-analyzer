import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@material-ui/core";
const DialogPortfolioList = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Load a saved Portfolio</DialogTitle>
      <List>
        <ListItem button onClick={() => handleListItemClick("email")} key={"email"}>
          <ListItemText primary={"Portfolio1"} />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick("email")} key={"email"}>
          <ListItemText primary={"Portfolio2"} />
        </ListItem>
      </List>
    </Dialog>
  );
};
export default DialogPortfolioList;
