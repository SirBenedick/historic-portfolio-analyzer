import { makeObservable, observable, action, autorun } from "mobx";
import idbConfigStore from "./idbConfigStore";
import notificationStore from "./NotificationStore";
import portfolioStore from "./PortfolioStore";
import keyMetricsStore from "./KeyMetricsStore";
import queryString from "query-string";
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

    autorun(() => {
      const trigger = this.riskFreeRate;

      if (!this.isRunningSetup) keyMetricsStore.calculateAndSetPortfolioSharpRatio();
      console.log("Autorun: triggering sharp ratio rercalculation: " + JSON.stringify(trigger));
    });
  }
  // isRunningSetup operations
  async startSetup() {
    console.log("startSetup");
    // Load stored API token from idbConfigStore or create a Token
    const token = await idbConfigStore.get("alphaVantagAPIToken");
    if (token) this.setAlphaVantageAPITokenHelper(token);
    else {
      await this.setAlphaVantageAPITokenIDB(fakeToken(16));
    }

    // Check if open page with default portfolio or load based on query parameters
    const urlParameters = queryString.parse(window.location.search, { arrayFormat: "comma" });
    if (urlParameters.command === "load_portfolio") {
      if (urlParameters.tickers && urlParameters.tickers.length !== 0) {
        let symbols = [];
        if (Array.isArray(urlParameters.tickers)) {
          for (let index = 0; index < urlParameters.tickers.length; index++) {
            symbols.push({
              symbolTicker: urlParameters.tickers[index],
              name: urlParameters.names[index],
              currency: urlParameters.currencies[index],
            });
          }
        } else {
          symbols.push({
            symbolTicker: urlParameters.tickers,
            name: urlParameters.names,
            currency: urlParameters.currencies,
          });
        }
        await portfolioStore.loadPortfolioFromUrl(symbols);
      }
    } else {
      // Add default symbols
      // If no deafult symbols added then portfolioStore trigger have to be called manually
      await portfolioStore.addSymbol({
        symbolTicker: "AAPL",
        name: "Apple Inc.",
        region: "testRegion",
        currency: "USD",
      });
    }

    await this.setIsRunningSetup(false);
    portfolioStore.initStoreAfterConfigSetupIsComplete();
  }

  async setIsRunningSetup(bool) {
    this.isRunningSetup = bool;
  }

  // alphaVantage operations
  // Store new alphaVantagAPIToken to idbConfigStore then store in mobx store
  async setAlphaVantageAPITokenIDB(newToken) {
    await idbConfigStore.set("alphaVantagAPIToken", newToken);
    notificationStore.enqueueSnackbar({
      message: `Stored new API-Token: ${newToken}`,
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

  // riskFreeRate operations
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
