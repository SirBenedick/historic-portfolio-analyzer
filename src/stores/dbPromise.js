import { openDB } from "idb";

if (!("indexedDB" in window)) {
  console.log("This browser doesn't support IndexedDB");
}

const dbPromise = openDB("keyval-store", 1, {
  upgrade(db) {
    console.log("Creating symbolDataStore");
    if (!db.objectStoreNames.contains("symbolDataStore")) {
      db.createObjectStore("symbolDataStore", {
        keyPath: "symbol",
        autoIncrement: false,
      });
    }
    console.log("Creating portfolioStore");
    if (!db.objectStoreNames.contains("portfolioStore")) {
      db.createObjectStore("portfolioStore");
    }
  },
});

export default dbPromise;
