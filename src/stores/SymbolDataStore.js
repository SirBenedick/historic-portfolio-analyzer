import { makeObservable, observable, action } from "mobx";
import idbSymbolDataStore from "./idbSymbolDataStore";
import configStore from "./ConfigStore";
import notificationStore from "./NotificationStore";
import FetchDataService from "../services/FetchDataService";
class SymbolDataStore {
  isCalculatingPortfolioPerformance = true;
  symbolChartTimeseriesDataMap = { Portfolio: [] };

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
        await FetchDataService.fetchDataDailyAdjustedForSymbolAlphaVantage(symbolTicker);
        const dataForSymbol = await idbSymbolDataStore.getTimeSeriesDailyByTickerFormated(symbolTicker);
        if (dataForSymbol) this.setTimeseriesForTicker(symbolTicker, dataForSymbol);
      } else {
        notificationStore.enqueueSnackbar({
          message: `Please enter an API key on the Settings Page`,
          options: {
            variant: "error",
            autoHideDuration: 2500,
          },
          key: notificationStore.keys.API_TOKEN_MISSING,
        });
      }
    }
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
