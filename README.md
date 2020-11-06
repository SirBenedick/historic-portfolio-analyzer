# Historic-Portfolio-Analyzer

## Roadmap

1. Create a plattform to analyze historic portfolio performance
2. Add metrics to quantify portfolio performance based on research
3. Automate portfolio optimization

## Development

### Feature focused annoyance driven development

Only features that result in a direct increase in usability or performance will be implemented.
There is no benefit in changing the application to suit features that might be implemented.
Being annoyed by the current application architecture is the key indicator for needed changes. If it does not feel right change it.

### Technologies

- [react](https://reactjs.org)
- [mobx](https://mobx.js.org/README.html)
- [material-ui](https://material-ui.com)
- [lightweight-charts](https://github.com/tradingview/lightweight-charts) by [tradingview](https://www.tradingview.com/lightweight-charts/)
- [IndexDB](https://developer.mozilla.org/de/docs/Web/API/IndexedDB_API)
- Stock data API: [Alpha Vantage](https://www.alphavantage.co)
- [Semantic Versioning](https://semver.org) as a rule of thumb (MAJOR will refelct the roadmap progress)

### To-Dos:

- Add: random API-Token generator
- Style: Find a place for DatePicker
- Style: Switch default/percent
- Style: Searchbar bigger
- Add: Calculation of yearly portfolio performance
- Add: Calculation of average year asset performance
- Version: bump to 0.2.0 (if all of the above are completed)
- Add Loading indicator while Portfolio is calculating (Backdrop)
- Add: Calculation of dividends to portfolio performance
- Add: Calculation of sharp ratio
- Add: Store meta data for symbol in symbolstore (change data flow, (full name, currency, region)
- Version: bump to 0.3.0 (if all of the above are completed)
- Add: Store for symbols to be fetched (in case API limit is reached)(set version of index db to current date)
- Add: Store datet of fetched data, refresh if is too old
- Add: Choose time of entry for each position
- Add: Heatmap for daily/weekly/montly return
- Add: Card performance weighted compared to single asset and market
- Add: Different Backends to call stock data from different sources
- Clean up README.md: Add UCs, scenarios, technoglogies...
- Add timeframe for all data

- Add/Style/Remove/Optimize/Refactor/Fix
