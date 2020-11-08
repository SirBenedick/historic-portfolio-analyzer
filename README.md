# Historic-Portfolio-Analyzer

[Click here to try it](https://sirbenedick.github.io/historic-portfolio-analyzer)

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

### Versioning (MAJOR.MINOR.X)

- MAJOR: Reflectes the progress within the roadmap
- MINOR: Bumps on the next completed feature set
- X: Increase towards the next feature set (Is going to be forgotten often)

### Progress (Add/Style/Remove/Improve/Refactor/Fix):

#### 0.4.0

- [ ] Refactor: Dataflow, no direct acces from outside to idb\_\_\_Stores,
- [ ] Refactor: Store calculated data in symbolDataStore (symbolDataStore should wraps idbSymbolDataStore)
- [ ] Improve: Sharpratio calculation should not trigger recalculation of portfolio (needs portfolio stored somewhere)
- [ ] Fix: Check if sharp ratio is calculated correctly (risk free rate has little impact atm)
- [ ] Fix: symbolDataStore.isCalculatingPortfolioPerformance stays true when api failed

#### 0.5.0

- Add: portfolio calculation granularity to speed up calculation
- Improve: Redesign KeyMetricsService
  - Every indicator should have its own loading indicator

#### Idea dump

- Add: Store meta data for symbol in symbolstore (change data flow, (full name, currency, region)
- Add: Store for symbols to be fetched (in case API limit is reached)(set version of index db to current date)
- Add: Store datet of fetched data, refresh if is too old
- Add: Choose time of entry for each position
- Add: Different Backends to call stock data from different sources
- Clean up README.md: Add UCs, scenarios, technoglogies...
- Add timeframe for all data
- Remove: moment.js to decrease bundle size(?)
- Add: Setting to fetch monthly data, or daily
- Add: Store different portfolio setups to save for later and to compare

#### 1.0.0

- Add: Sortino Ratio
- Add: Jensen-Alpha
- Add: tooltip with link to ratio definition
- Add: Heatmap for daily/weekly/montly return
- Add: Card performance weighted compared to single asset and market
