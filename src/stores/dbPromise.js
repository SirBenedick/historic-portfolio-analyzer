import { openDB } from "idb";

if (!("indexedDB" in window)) {
  console.log("This browser doesn't support IndexedDB");
}

const dbPromise = openDB("historic-portfolio-anazyler", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("symbolDataStore")) {
      console.log("Creating new symbolDataStore");
      db.createObjectStore("symbolDataStore", {
        keyPath: "symbol",
        autoIncrement: false,
      });
    }
    if (!db.objectStoreNames.contains("portfolioStore")) {
      console.log("Creating new portfolioStore");
      db.createObjectStore("portfolioStore");
    }
    if (!db.objectStoreNames.contains("configStore")) {
      console.log("Creating new configStore");
      db.createObjectStore("configStore");
    }
  },
});

export default dbPromise;
