import { makeObservable, observable, action } from "mobx";
import idbConfigStore from "./idbConfigStore";
import notificationStore from "./NotificationStore";
import dataStore from "./DataStore";

class ConfigStore {
  alphaVantage = { url: "https://www.alphavantage.co/query", apiToken: "" };
  isRunningSetup = true;
  alphaVantageConstants = { SYMBOL_SEARCH: "SYMBOL_SEARCH", TIME_SERIES_DAILY_ADJUSTED: "TIME_SERIES_DAILY_ADJUSTED" };
  riskFreeRate = 1;

  constructor() {
    this.startSetup();

    makeObservable(this, {
      alphaVantage: observable,
      isRunningSetup: observable,
      riskFreeRate: observable,
      setAlphaVantageAPITokenHelper: action,
      setIsRunningSetup: action,
      setRiskFreeRate: action,
    });
  }

  async startSetup() {
    console.log("startSetup");
    // Load stored API token from idbConfigStore or create a Token
    const token = await idbConfigStore.get("alphaVantagAPIToken");
    if (token) this.setAlphaVantageAPITokenHelper(token);
    else {
      await this.setAlphaVantageAPITokenIDB(fakeToken(16));
    }

    // Add default symbols
    // If no deafult symbols added then dataStore trigger have to be called manually
    dataStore.addSymbol({ symbolTicker: "AAPL", name: "Apple Inc.", region: "testRegion", currency: "USD" });

    this.setIsRunningSetup(false);
  }

  setIsRunningSetup(bool) {
    this.isRunningSetup = bool;
  }

  // Store new alphaVantagAPIToken to idbConfigStore then store in mobx store
  async setAlphaVantageAPITokenIDB(newToken) {
    await idbConfigStore.set("alphaVantagAPIToken", newToken);
    notificationStore.enqueueSnackbar({
      message: `Stored new API-Token${this.alphaVantage.apiToken}`,
      options: {
        variant: "success",
        autoHideDuration: 1000,
      },
      key: notificationStore.keys.API_TOKEN_STORED,
    });
    this.setAlphaVantageAPITokenHelper(newToken);
  }

  setAlphaVantageAPITokenHelper(newToken) {
    console.log("setAlphaVantageAPITokenHelper: " + newToken);
    this.alphaVantage.apiToken = newToken;
  }
  setRiskFreeRate(newRate) {
    console.log("setRiskFreeRate: " + newRate);
    this.riskFreeRate = newRate;
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
