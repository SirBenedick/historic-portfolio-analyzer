import axios from "axios";
import idbSymbolDataStore from "../stores/SymbolDataStore";
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
      },
    });
      try {
        const res = await axios.get(configStore.alphaVantage.url, {
          params: {
            function: configStore.alphaVantageConstants.TIME_SERIES_DAILY_ADJUSTED,
            symbol: symbolTicker,
            outputsize: "full",
            apikey: configStore.alphaVantage.apiToken,
          },
        });
        if ("Note" in res.data) {
          console.log("Failed to fetch for: " + symbolTicker);
          notificationStore.enqueueSnackbar({
            message: `Failed to fetch data for: ${symbolTicker}`,
            options: {
              variant: "warning",
            },
          });
          return false
        } else {
          res.data["symbol"] = symbolTicker;
          await idbSymbolDataStore.set(res.data);
          // TODO check if received data was valid
          notificationStore.enqueueSnackbar({
            message: `Successfully fetched data for: ${symbolTicker}`,
            options: {
              variant: "success",
            },
          });
          return symbolTicker;
        }
      } catch (error) {
        console.log(Object.keys(error), error.message);
      }
    
  },
};

export default FetchDataService;
