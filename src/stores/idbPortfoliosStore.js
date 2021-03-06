import dbPromise from "./dbPromise";

const idbPortfoliosStore = {
  async get(key) {
    return (await dbPromise).get("portfoliosStore", key);
  },
  async set(val) {
    return (await dbPromise).put("portfoliosStore", val);
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
  async getInfoOfAllSavedPortfolios() {
    const allSavedPortfolioNames = await this.keys();
    const getSavedPortfolio = allSavedPortfolioNames.map(async (name) => {
      return await this.get(name);
    });
    return Promise.all(getSavedPortfolio);
  },
};

export default idbPortfoliosStore;
