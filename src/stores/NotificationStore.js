import { action, extendObservable } from "mobx";

const NotificationStore = function () {
  extendObservable(this, {
    notifications: [],
    keys: {
      API_TOKEN_MISSING: "API_TOKEN_MISSING",
      PORTFOLIO_CALCULATING: "PORTFOLIO_CALCULATING",
      API_TOKEN_STORED: "API_TOKEN_STORED",
      API_FAILED_RETRY: "API_FAILED_RETRY",
      COPY_URL_TO_CLIPBOARD: "COPY_URL_TO_CLIPBOARD",
    },

    enqueueSnackbar: action((note) => {
      this.notifications.push({
        key: note.key ? note.key : new Date().getTime() + Math.random(),
        ...note,
      });
    }),

    removeSnackbar: action((key) => {
      this.notifications = this.notifications.filter((notification) => notification.key !== key);
    }),
  });
};

const notificationStore = new NotificationStore();
export default notificationStore;
