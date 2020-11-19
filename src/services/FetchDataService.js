import axios from "axios";
import idbSymbolDataStore from "../stores/idbSymbolDataStore";
import notificationStore from "../stores/NotificationStore";
import configStore from "../stores/ConfigStore";

const FetchDataService = {
  async fetchDataDailyAdjustedForSymbolAlphaVantage(symbolTicker) {
    console.log("fetchDataDailyAdjustedForSymbolAlphaVantage");
    console.log(`Fetching data for ${symbolTicker}`);
    notificationStore.enqueueSnackbar({
      message: `Fetching data for: ${symbolTicker}`,
      options: {
        variant: "info",
        autoHideDuration: 1500,
      },
      key: `FETCHING-${symbolTicker}`,
    });
    try {
      //  Call API
      const res = await axios.get(configStore.alphaVantage.url, {
        params: {
          function: configStore.alphaVantageConstants.TIME_SERIES_DAILY_ADJUSTED,
          symbol: symbolTicker,
          outputsize: "full",
          apikey: configStore.alphaVantage.apiToken,
        },
      });
      // Failed request
      if ("Note" in res.data) {
        console.log("Failed to fetch for: " + symbolTicker);
        notificationStore.enqueueSnackbar({
          message: `Failed to fetch data for: ${symbolTicker}`,
          options: {
            variant: "warning",
            autoHideDuration: 1500,
          },
          key: `FETCHING-FAILED-${symbolTicker}`,
        });
        return false;
      } else {
        //  Store request results
        // TODO check if received data was valid
        await idbSymbolDataStore.formatAndStoreSymbolData(symbolTicker, res.data);
        notificationStore.enqueueSnackbar({
          message: `Successfully fetched data for: ${symbolTicker}`,
          options: {
            variant: "success",
            autoHideDuration: 1500,
          },
          key: `FETCHING-SUCCESS-${symbolTicker}`,
        });
        return symbolTicker;
      }
    } catch (error) {
      console.log(Object.keys(error), error.message);
    }
  },
  async searchAlphaVantageByKeywords(keywords) {
    console.log("searchAlphaVantageByKeywords: " + keywords);
    const res = await axios.get(configStore.alphaVantage.url, {
      params: {
        function: configStore.alphaVantageConstants.SYMBOL_SEARCH,
        keywords: keywords,
        apikey: configStore.alphaVantage.apiToken,
      },
    });
    if ("Note" in res.data) {
      console.log("Failed to search for:" + keywords);
      notificationStore.enqueueSnackbar({
        message: `Failed to search for: ${keywords}`,
        options: {
          variant: "warning",
        },
      });
      return false;
    } else {
      const matches = res.data["bestMatches"];
      if (!matches) return [];
      const searchResultsFormated = matches.map((result) => ({
        symbolTicker: result["1. symbol"],
        name: result["2. name"],
        region: result["4. region"],
        currency: result["8. currency"],
      }));
      return searchResultsFormated;
    }
  },
};

export default FetchDataService;
