import { makeObservable, observable, action } from "mobx";
import idbSymbolDataStore from "./idbSymbolDataStore";
import configStore from "./ConfigStore";
import notificationStore from "./NotificationStore";
import portfolioStore from "./PortfolioStore";
import FetchDataService from "../services/FetchDataService";
class SymbolDataStore {
  isCalculatingPortfolioPerformance = true;
  symbolChartTimeseriesDataMap = { Portfolio: [] };
  symbolFetchQueue = [];
  triggerFetchQueueTimeout = null;

  constructor() {
    makeObservable(this, {
      isCalculatingPortfolioPerformance: observable,
      symbolChartTimeseriesDataMap: observable,
      setIsCalculatingPortfolioPerformance: action,
      addSymbolToMap: action,
      removeSymbolFromMap: action,
      resetStore: action,
      setTimeseriesForTicker: action,
    });
  }

  setIsCalculatingPortfolioPerformance(bool) {
    this.isCalculatingPortfolioPerformance = bool;
  }

  async addSymbolToMap(symbolTicker) {
    console.log("addSymbolToMap: " + symbolTicker);
    if (symbolTicker === "Portfolio") return false;

    const dataForSymbol = await idbSymbolDataStore.getTimeSeriesDailyByTickerFormated(symbolTicker);
    if (dataForSymbol) {
      this.setTimeseriesForTicker(symbolTicker, dataForSymbol);
    } else {
      // Check if api token is set
      if (configStore.alphaVantage.apiToken) {
        const fetchWasSuccessful = await FetchDataService.fetchDataDailyAdjustedForSymbolAlphaVantage(symbolTicker);
        if (fetchWasSuccessful) {
          const dataForSymbol = await idbSymbolDataStore.getTimeSeriesDailyByTickerFormated(symbolTicker);
          if (dataForSymbol) this.setTimeseriesForTicker(symbolTicker, dataForSymbol);
        } else {
          this.addToFetchQueue(symbolTicker);
          return false;
        }
      } else {
        notificationStore.enqueueSnackbar({
          message: `Please enter an API key on the Settings Page`,
          options: {
            variant: "error",
            autoHideDuration: 2500,
          },
          key: notificationStore.keys.API_TOKEN_MISSING,
        });
        return false;
      }
    }
    return true;
  }

  addToFetchQueue(symbolTicker) {
    const debounceFetchQueue = async () => {
      await Promise.all(
        this.symbolFetchQueue.map(async (symbolTicker) => {
          const addedToMap = await this.addSymbolToMap(symbolTicker);
          if (addedToMap) {
            portfolioStore.getMetaDataAndStoreIt(symbolTicker);
            await this.removeFromFetchQueue(symbolTicker);
          }
        })
      );
      if (this.symbolFetchQueue.length === 0) {
        portfolioStore.setTriggerRerenderPortfolio(true);
        portfolioStore.setTriggerRerenderVisibleLines(true);
        this.calculateAndStoreHistoricPortfolioPerformance();
      }
    };

    // Store symbolTicker in Queue
    if (!this.symbolFetchQueue.includes(symbolTicker)) this.symbolFetchQueue.push(symbolTicker);

    // Set timeout to trigger function to run over queue
    if (this.triggerFetchQueueTimeout) clearTimeout(this.triggerFetchQueueTimeout);
    notificationStore.enqueueSnackbar({
      message: `API failed - retrying in 10 seconds`,
      options: {
        variant: "error",
        autoHideDuration: 10000,
      },
      key: notificationStore.keys.API_FAILED_RETRY,
    });
    const timeout = setTimeout(async () => {
      await debounceFetchQueue();
    }, 10000);
    this.triggerFetchQueueTimeout = timeout;
  }

  async removeFromFetchQueue(symbolTickerToRemove) {
    this.symbolFetchQueue = this.symbolFetchQueue.filter((symbolTicker) => symbolTicker !== symbolTickerToRemove);
  }

  async removeSymbolFromMap(symbolTicker) {
    delete this.symbolChartTimeseriesDataMap[symbolTicker];
  }

  async deleteDataSet(symbolToDelete) {
    await idbSymbolDataStore.delete(symbolToDelete);
  }

  async resetStore() {
    this.isCalculatingPortfolioPerformance = false;
    this.symbolChartTimeseriesDataMap = { Portfolio: [] };
  }

  async getSymbolTimeseriesDataFromMap(symbolTicker) {
    console.log("getSymbolTimeseriesDataFromMap: " + symbolTicker);
    if (this.symbolChartTimeseriesDataMap[symbolTicker]) return this.symbolChartTimeseriesDataMap[symbolTicker];
    else {
      if (symbolTicker === "Portfolio") {
        return;
      } else {
        await FetchDataService.fetchDataDailyAdjustedForSymbolAlphaVantage(symbolTicker);
        const dataForSymbol = await idbSymbolDataStore.getTimeSeriesDailyByTickerFormated(symbolTicker);
        if (dataForSymbol) this.setTimeseriesForTicker(symbolTicker, dataForSymbol);
        return dataForSymbol;
      }
    }
  }

  async setTimeseriesForTicker(symbolTicker, timeseries) {
    console.log("setTimeseriesForTicker: " + symbolTicker);
    this.symbolChartTimeseriesDataMap[symbolTicker] = timeseries;
  }

  async calculateAndStoreHistoricPortfolioPerformance() {
    return await idbSymbolDataStore.calculateAndStoreHistoricPortfolioPerformance();
  }

  async getMetaDataForSymbol(symbolTicker) {
    const data = await idbSymbolDataStore.get(symbolTicker);
    return data ? data.meta_data : false;
  }
}

const symbolDataStore = new SymbolDataStore();
export default symbolDataStore;
