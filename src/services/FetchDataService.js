import axios from "axios";
import dataStore from "../stores/DataStore";
import idbSymbolDataStore from "../stores/SymbolDataStore";
import notificationStore from "../stores/NotificationStore";

const alpha_vantage = { url: "https://www.alphavantage.co/query", api_token: "-" };

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
        const res = await axios.get(alpha_vantage.url, {
          params: {
            function: "TIME_SERIES_DAILY_ADJUSTED",
            symbol: symbolTicker,
            outputsize: "full",
            apikey: alpha_vantage.api_token,
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
