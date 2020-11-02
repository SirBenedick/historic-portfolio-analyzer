import axios from "axios";
import dataStore from "../stores/DataStore";
import idbSymbolDataStore from "../stores/SymbolDataStore";
import notificationStore from "../stores/NotificationStore";

const alpha_vantage = { url: "https://www.alphavantage.co/query", api_token: "-" };

const FetchDataService = {
  async fetchDataForAllSymbolsAlphaVantage() {
    console.log("fetchDataForAllSymbolsAlphaVantage");
    let fetchedSymbols = [];
    await Promise.all(
      dataStore.symbolsTickerAndDataFetchedOnlyValid.map(async (symbolSet) => {
        if (!symbolSet.dataFetched) {
          console.log(`Fetching data for ${symbolSet.symbolTicker}`);
          notificationStore.enqueueSnackbar({
            message: `Fetching data for: ${symbolSet.symbolTicker}`,
            options: {
              variant: "info",
            },
          });
          try {
            const res = await axios.get(alpha_vantage.url, {
              params: {
                function: "TIME_SERIES_DAILY_ADJUSTED",
                symbol: symbolSet.symbolTicker,
                outputsize: "full",
                apikey: alpha_vantage.api_token,
              },
            });
            if ("Note" in res.data) {
              // TODO snackbar notification
              console.log("Failed to fetch for: " + symbolSet.symbolTicker);
              notificationStore.enqueueSnackbar({
                message: `Failed to fetch data for: ${symbolSet.symbolTicker}`,
                options: {
                  variant: "warning",
                },
              });
            } else {
              res.data["symbol"] = symbolSet.symbolTicker;
              await idbSymbolDataStore.set(res.data);
              // TODO check if received data was valid
              dataStore.setSymbolsDataFetched(symbolSet.symbolTicker, true);
              fetchedSymbols.push(symbolSet.symbolTicker);
              notificationStore.enqueueSnackbar({
                message: `Successfully fetched data for: ${symbolSet.symbolTicker}`,
                options: {
                  variant: "success",
                },
              });
            }
          } catch (error) {
            console.log(Object.keys(error), error.message);
          }
        }
      })
    );
    console.log(`Fetched Data for: ${fetchedSymbols.length !== 0 ? fetchedSymbols : "Nothing"}`);
    return fetchedSymbols;
  },
};

export default FetchDataService;
