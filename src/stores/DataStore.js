import { makeObservable, observable, action, computed } from "mobx";

class DataStore {
  symbols = [];
  pendingRequests = 0;
  appleData = [];
  allData = [];

  constructor() {
    makeObservable(this, {
      symbols: observable,
      allData: observable,
      toggleSymbolVisibility: action,
      addSymbol: action,
      addSymbolDataToAllData: action,
      symbolsTickerAndDataFetchedOnlyValid: computed,
    });

    this.addSymbol({ symbolTicker: "All", isVisible: true, dataFetched: false });
    this.addSymbol({ symbolTicker: "AAPL", isVisible: true, dataFetched: false });
    this.addSymbol({ symbolTicker: "MSFT", isVisible: true, dataFetched: false });
    this.addSymbol({ symbolTicker: "AMZN", isVisible: true, dataFetched: false });
  }

  addSymbolDataToAllData(symbolTicker, data) {
    // data = [{ time: "2019-04-11", value: 80.01 }]
    // result = [{ time: "2019-04-11", assets: { AAPL: { symbolTicker: "AAPL", value: 80.21 } } }];
    if (this.allData.length === 0) {
      data.forEach((entry) => {
        const assetTemp = {};
        assetTemp[symbolTicker] = { symbolTicker: symbolTicker, value: entry.value };

        this.allData.push({
          time: entry.time,
          assets: assetTemp,
        });
      });
    }
    data.forEach((entry) => {
      let timestampEntryIndex = this.allData.findIndex((entryAllData) => entry.time === entryAllData.time);
      if (timestampEntryIndex >= 0) {
        this.allData[timestampEntryIndex]["assets"][symbolTicker] = { symbolTicker: symbolTicker, value: entry.value };
      }else{
				const assetTemp = {};
        assetTemp[symbolTicker] = { symbolTicker: symbolTicker, value: entry.value };

        this.allData.push({
          time: entry.time,
          assets: assetTemp,
        });
			}
    });
    this.setSymbolsDataFetched(symbolTicker, true);
  }

  setAppleData(data) {
    this.appleData = data;
    return true;
  }

  addSymbol(newSymbol) {
    this.symbols.push(newSymbol);
  }

  toggleSymbolVisibility(changedSymbolbyTicker) {
    console.log(changedSymbolbyTicker);
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolbyTicker) {
        symbol.isVisible = !symbol.isVisible;
      }
    });
  }

  setSymbolsDataFetched(changedSymbolbyTicker, dataFetched) {
    this.symbols.forEach((symbol) => {
      if (symbol.symbolTicker === changedSymbolbyTicker) {
        symbol.dataFetched = dataFetched;
      }
    });
  }

  get symbolsTickerAndDataFetchedOnlyValid() {
    let tempResult = this.symbols.map((symbolSet) => {
      if (symbolSet.symbolTicker != "All") {
        return { symbolTicker: symbolSet.symbolTicker, dataFetched: symbolSet.dataFetched };
      } else return false;
    });
    return tempResult.filter((symbolSet) => symbolSet);
	}
	
	tempAllComputedEvenWeight(){
		// = [{ time: "2019-04-11", assets: { AAPL: { symbol: "AAPL", value: 80.21 }, "AMZN"... } }];
		const temp = this.allData.map(entry=>{
			let tempValue = 0
			Object.keys(entry.assets).forEach(key =>{
				tempValue += entry.assets[key].value * 1/3
			})
			return {time: entry.time, value: tempValue}
			
		})
		return {symbol: "All", data: temp}
	}

	dataForSymbolTicker(symbolTicker){
		const temp = this.allData.map(entry=>{
			return {time: entry.time, value: entry.assets[symbolTicker].value}
		})
		return {symbol: symbolTicker, data: temp}

	}
}

const dataStore = new DataStore();
export default dataStore;
