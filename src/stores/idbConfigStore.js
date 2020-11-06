import dbPromise from "./dbPromise";

const idbConfigStore = {
  async get(key) {
    return (await dbPromise).get("configStore", key);
  },
  async set(key, val) {
    return (await dbPromise).put("configStore", val, key);
  },
  async delete(key) {
    return (await dbPromise).delete("configStore", key);
  },
  async clear() {
    return (await dbPromise).clear("configStore");
  },
  async keys() {
    return (await dbPromise).getAllKeys("configStore");
  },
};

export default idbConfigStore;
