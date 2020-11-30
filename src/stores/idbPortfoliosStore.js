import dbPromise from "./dbPromise";

const idbPortfoliosStore = {
  async get(key) {
    return (await dbPromise).get("portfoliosStore", key);
  },
  async set(key, val) {
    return (await dbPromise).put("portfoliosStore", val, key);
  },
  async delete(key) {
    return (await dbPromise).delete("portfoliosStore", key);
  },
  async clear() {
    return (await dbPromise).clear("portfoliosStore");
  },
  async keys() {
    return (await dbPromise).getAllKeys("portfoliosStore");
  },
};

export default idbPortfoliosStore;
