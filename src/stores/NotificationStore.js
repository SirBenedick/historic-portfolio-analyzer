import { action, extendObservable } from "mobx";

const NotificationStore = function () {
  extendObservable(this, {
    notifications: [],

    enqueueSnackbar: action((note) => {
      this.notifications.push({
        key: new Date().getTime() + Math.random(),
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
