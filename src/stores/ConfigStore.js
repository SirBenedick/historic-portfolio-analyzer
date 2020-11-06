import { makeObservable, observable, action } from "mobx";
import idbConfigStore from "./idbConfigStore";
import notificationStore from "./NotificationStore";

class ConfigStore {
  alphaVantage = { url: "https://www.alphavantage.co/query", apiToken: "" };
  alphaVantageConstants = { SYMBOL_SEARCH: "SYMBOL_SEARCH", TIME_SERIES_DAILY_ADJUSTED: "TIME_SERIES_DAILY_ADJUSTED" };

  constructor() {
    // Load stored API token from idbConfigStore or create a Token
    idbConfigStore.get("alphaVantagAPIToken").then((token) => {
      if (token) this.setAlphaVantageAPITokenHelper(token);
      else {
        this.setAlphaVantageAPITokenIDB(fakeToken(16));
      }
    });

    makeObservable(this, {
      alphaVantage: observable,
      setAlphaVantageAPITokenHelper: action,
    });
  }

  // Store new alphaVantagAPIToken to idbConfigStore then store in mobx store
  async setAlphaVantageAPITokenIDB(newToken) {
    await idbConfigStore.set("alphaVantagAPIToken", newToken);
    notificationStore.enqueueSnackbar({
      message: "Stored new API-Token",
      options: {
        variant: "success",
        autoHideDuration: 1000,
      },
      key: notificationStore.keys.API_TOKEN_STORED,
    });
    this.setAlphaVantageAPITokenHelper(newToken);
  }

  setAlphaVantageAPITokenHelper(newToken) {
    this.alphaVantage.apiToken = newToken;
  }
}

function fakeToken(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const configStore = new ConfigStore();
export default configStore;
