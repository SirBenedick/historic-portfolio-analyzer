import { RestaurantMenu } from "@material-ui/icons";
import { openDB } from "idb";

if (!("indexedDB" in window)) {
  console.log("This browser doesn't support IndexedDB");
}

const dbPromise = openDB("keyval-store", 1, {
  upgrade(db) {
    console.log("Creating new symbolDataStore");
    if (!db.objectStoreNames.contains("symbolDataStore")) {
      db.createObjectStore("symbolDataStore", {
        keyPath: "symbol",
        autoIncrement: false,
      });
    }
  },
});

const idbSymbolDataStore = {
  async get(key) {
    return (await dbPromise).get("symbolDataStore", key);
  },
  async getDataFormatedForChart(key) {
    return (await dbPromise).get("symbolDataStore", key).then((symbolData) => {
      let temp = [];
      for (const [key, dailyInformation] of Object.entries(symbolData["Time Series (Daily)"])) {
        temp.push({ time: key, value: parseFloat(dailyInformation["5. adjusted close"]) });
      }
      return { symbol: symbolData.symbol, data: temp };
    });
  },
  async set(val) {
    return (await dbPromise).put("symbolDataStore", val);
  },
  async delete(key) {
    return (await dbPromise).delete("symbolDataStore", key);
  },
  async clear() {
    return (await dbPromise).clear("symbolDataStore");
  },
  async keys() {
    return (await dbPromise).getAllKeys("symbolDataStore");
  },
};

export default idbSymbolDataStore;
