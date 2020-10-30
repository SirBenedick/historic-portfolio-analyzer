import { makeObservable, observable, action } from "mobx";

class DataStore {
  symbols = [];
  pendingRequests = 0;
	appleData = [];
	allData = [];

  constructor() {
    makeObservable(this, {
      symbols: observable,
			allData: observable,
			toggleSymbol: action,
			addSymbol: action,
			addSymbolDataToAllData: action,
			
    });

    this.addSymbol({ symbol: "AAPL", isVisible: true });
    this.addSymbol({ symbol: "MSFT", isVisible: true });
    this.addSymbol({ symbol: "AMZN", isVisible: true });
	}
	
	addSymbolDataToAllData(data){

	}

  setAppleData(data) {
    this.appleData = data;
    return true;
	}
	
  addSymbol(newSymbol) {
    this.symbols.push(newSymbol);
  }

  toggleSymbol(changedSymbolByName) {
    console.log(changedSymbolByName);
    this.symbols.forEach((symbol) => {
      if (symbol.symbol === changedSymbolByName) {
        symbol.isVisible = !symbol.isVisible;
      }
		});
		
  }

  //   toggle() {
  //     this.finished = !this.finished;
  //     // let test = { time: "2019-04-11", value: 80.01 };
       test2 = [{ time: "2019-04-11", assets: {AAPL: { symbol: "AAPL", value: 80.21 }} }];
  //   }
}

const dataStore = new DataStore();
export default dataStore;
