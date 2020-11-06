import { Component } from "react";
import { withSnackbar } from "notistack";
import { inject, observer } from "mobx-react";
import { autorun } from "mobx";

class Notifier extends Component {
  displayed = [];

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  removeDisplayedNotificationByKey(removeKey) {
    this.displayed = this.displayed.filter((key) => removeKey !== key);
  }

  componentDidMount() {
    autorun(() => {
      const { notifications = [] } = this.props.notificationStore;

      notifications.forEach((notification) => {
        // Do nothing if snackbar is already displayed
        if (this.displayed.includes(notification.key)) return;
        // Display snackbar using notistack
        this.props.enqueueSnackbar(notification.message, notification.options);
        // Keep track of snackbars that we've displayed
        this.storeDisplayed(notification.key);
        // Dispatch action to remove snackbar from mobx store
        this.props.notificationStore.removeSnackbar(notification.key);

        // Calculate delay to remove notification from this.displayed
        let delayUntilRemoveMs = 0;
        if (notification.options && notification.options.autoHideDuration) {
          delayUntilRemoveMs = notification.options.autoHideDuration + 100;
        } else {
          delayUntilRemoveMs = 2100;
        }
        // Remove notifaction from this.disyplayed after dealy
        setTimeout(
          function () {
            this.removeDisplayedNotificationByKey(notification.key);
          }.bind(this),
          delayUntilRemoveMs
        );
      });
    });
  }

  render() {
    return null;
  }
}

export default withSnackbar(inject("notificationStore")(observer(Notifier)));
