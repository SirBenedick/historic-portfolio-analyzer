import dbPromise from "./dbPromise";

const idbPortfolioStore = {
  async get(key) {
    return (await dbPromise).get("portfolioStore", key);
  },
  async set(key, val) {
    return (await dbPromise).put("portfolioStore", val, key);
  },
  async delete(key) {
    return (await dbPromise).delete("portfolioStore", key);
  },
  async clear() {
    return (await dbPromise).clear("portfolioStore");
  },
  async keys() {
    return (await dbPromise).getAllKeys("portfolioStore");
  },
  async doesDataSeriesExist() {
    const data = await this.get("dataSeries");
    if (data) return true;
    else return false;
  },
};

export default idbPortfolioStore;
