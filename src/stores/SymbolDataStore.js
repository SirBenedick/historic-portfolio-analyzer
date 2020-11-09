import { makeObservable, observable, action } from "mobx";
import idbSymbolDataStore from "./idbSymbolDataStore";
import configStore from "./ConfigStore";
import notificationStore from "./NotificationStore";
import FetchDataService from "../services/FetchDataService";
class SymbolDataStore {
  isCalculatingPortfolioPerformance = false;
  symbolChartDataMap = {};

  constructor() {
    makeObservable(this, {
      isCalculatingPortfolioPerformance: observable,
      symbolChartDataMap: observable,
      setIsCalculatingPortfolioPerformance: action,
      addSymbolToMap: action,
      removeSymbolFromMap: action,
    });
  }

  setIsCalculatingPortfolioPerformance(bool) {
    this.isCalculatingPortfolioPerformance = bool;
  }

  async addSymbolToMap(symbolTicker) {
    const dataForSymbol = await idbSymbolDataStore.getTimeSeriesDailyByTickerFormated(symbolTicker);
    if (dataForSymbol) {
      this.symbolChartDataMap[symbolTicker] = dataForSymbol;
    } else {
      // Check if api token is set
      if (configStore.alphaVantage.apiToken) {
        await FetchDataService.fetchDataDailyAdjustedForSymbolAlphaVantage(symbolTicker);
        const dataForSymbol = await idbSymbolDataStore.getTimeSeriesDailyByTickerFormated(symbolTicker);
        if (dataForSymbol) this.symbolChartDataMap[symbolTicker] = dataForSymbol;
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
    delete this.symbolChartDataMap[symbolTicker];
  }

  async getSymbolDataFromMap(symbolTicker) {
    if (symbolDataStore[symbolTicker]) return symbolDataStore[symbolTicker];
    else {
      await FetchDataService.fetchDataDailyAdjustedForSymbolAlphaVantage(symbolTicker);
      const dataForSymbol = await idbSymbolDataStore.getTimeSeriesDailyByTickerFormated(symbolTicker);
      if (dataForSymbol) this.symbolChartDataMap[symbolTicker] = dataForSymbol;
      return dataForSymbol;
    }
  }

  async calculateAndStoreHistoricPortfolioPerformance() {
    return await idbSymbolDataStore.calculateAndStoreHistoricPortfolioPerformance();
  }

  async getDataChartFormatBySymbol(symbolTicker) {
    return await idbSymbolDataStore.getDataChartFormatBySymbol(symbolTicker);
  }
}

const symbolDataStore = new SymbolDataStore();
export default symbolDataStore;
