import { makeObservable, observable, action } from "mobx";
import idbConfigStore from "./idbConfigStore";
import notificationStore from "./NotificationStore";

class ConfigStore {
  alphaVantage = { url: "https://www.alphavantage.co/query", apiToken: "" };
  alphaVantageConstants = { SYMBOL_SEARCH: "SYMBOL_SEARCH", TIME_SERIES_DAILY_ADJUSTED: "TIME_SERIES_DAILY_ADJUSTED" };

  constructor() {
    // Load stored API token from idbConfigStore
    idbConfigStore.get("alphaVantagAPIToken").then((token) => this.setAlphaVantageAPIToken(token));

    makeObservable(this, {
      alphaVantage: observable,
      setAlphaVantageAPIToken: action,
    });
  }

  setAlphaVantageAPIToken(newToken) {
    this.alphaVantage.apiToken = newToken;
  }

  // Store new alphaVantagAPIToken to idbConfigStore
  async setAlphaVantageAPITokenIDB(newToken) {
    await idbConfigStore.set("alphaVantagAPIToken", newToken);
    notificationStore.enqueueSnackbar({
      message: "Stored new API-Token",
      options: {
        variant: "success",
      },
      key: notificationStore.keys.API_TOKEN_STORED,
    });
    this.setAlphaVantageAPIToken(newToken);
  }
}

const configStore = new ConfigStore();
export default configStore;
