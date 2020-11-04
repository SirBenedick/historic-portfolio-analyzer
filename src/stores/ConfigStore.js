import { makeObservable, observable } from "mobx";

const alphaVantageSearchMockedData = {
  data: {
    bestMatches: [
      {
        "1. symbol": "BA",
        "2. name": "The Boeing Company",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-05",
        "8. currency": "USD",
        "9. matchScore": "0.7273",
      },
      {
        "1. symbol": "BCO.DEX",
        "2. name": "The Boeing Company",
        "3. type": "Equity",
        "4. region": "XETRA",
        "5. marketOpen": "08:00",
        "6. marketClose": "20:00",
        "7. timezone": "UTC+01",
        "8. currency": "EUR",
        "9. matchScore": "0.6667",
      },
      {
        "1. symbol": "BOE.LON",
        "2. name": "The Boeing Company",
        "3. type": "Equity",
        "4. region": "United Kingdom",
        "5. marketOpen": "08:00",
        "6. marketClose": "16:30",
        "7. timezone": "UTC+00",
        "8. currency": "GBP",
        "9. matchScore": "0.6154",
      },
      {
        "1. symbol": "BOEI34.SAO",
        "2. name": "The Boeing Company",
        "3. type": "Equity",
        "4. region": "Brazil/Sao Paolo",
        "5. marketOpen": "10:00",
        "6. marketClose": "17:30",
        "7. timezone": "UTC-03",
        "8. currency": "BRL",
        "9. matchScore": "0.6000",
      },
      {
        "1. symbol": "BCO.FRK",
        "2. name": "The Boeing Company",
        "3. type": "Equity",
        "4. region": "Frankfurt",
        "5. marketOpen": "08:00",
        "6. marketClose": "20:00",
        "7. timezone": "UTC+01",
        "8. currency": "EUR",
        "9. matchScore": "0.4444",
      },
      {
        "1. symbol": "BOEI.BRU",
        "2. name": "The Boeing Company",
        "3. type": "Equity",
        "4. region": "Brussels",
        "5. marketOpen": "09:00",
        "6. marketClose": "17:00",
        "7. timezone": "UTC+01",
        "8. currency": "EUR",
        "9. matchScore": "0.3636",
      },
    ],
  },
};

class ConfigStore {
  alphaVantage = { url: "https://www.alphavantage.co/query", apiToken: "-" };
  alphaVantageConstants = { SYMBOL_SEARCH: "SYMBOL_SEARCH", TIME_SERIES_DAILY_ADJUSTED: "TIME_SERIES_DAILY_ADJUSTED" };
  alphaVantageSearchExample = alphaVantageSearchMockedData;

  constructor() {
    makeObservable(this, {
      alphaVantage: observable,
    });
  }
}

const configStore = new ConfigStore();
export default configStore;
