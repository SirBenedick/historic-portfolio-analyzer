import axios from "axios";
import dataStore from "../stores/DataStore";
import idbSymbolDataStore from "../stores/SymbolDataStore";

const alpha_vantage = { url: "https://www.alphavantage.co/query", api_token: "-" };

class FetchDataService {
  async fetchDataForAllSymbolsAlphaVantage() {
    console.log("fetchDataForAllSymbolsAlphaVantage");
    let fetchedSymbols = [];
    await Promise.all(
      dataStore.symbolsTickerAndDataFetchedOnlyValid.map(async (symbolSet) => {
        if (!symbolSet.dataFetched) {
          console.log(`Fetching data for ${symbolSet.symbolTicker}`);
          const res = await axios.get(alpha_vantage.url, {
            params: {
              function: "TIME_SERIES_DAILY_ADJUSTED",
              symbol: symbolSet.symbolTicker,
              outputsize: "compact",
              apikey: alpha_vantage.api_token,
            },
          });
          res.data["symbol"] = symbolSet.symbolTicker;
          console.log(res.data);
          await idbSymbolDataStore.set(res.data);
          // TODO check if received data was valid
          dataStore.setSymbolsDataFetched(symbolSet.symbolTicker, true);
          fetchedSymbols.push(symbolSet.symbolTicker);
        }
      })
    );
    console.log(`Fetched Data for: ${fetchedSymbols.length !== 0 ? fetchedSymbols : "Nothing"}`);
    return fetchedSymbols;
  }
}

const fetchDataService = new FetchDataService();
export default fetchDataService;
