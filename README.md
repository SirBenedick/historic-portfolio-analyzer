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

### Progress

###### To-Do-Types

Create: Add
Read: -
Update: Fix, Improve, Refactor, Style
Delete: Remove

#### 0.5.0

- [x] Improve: Sharpratio calculation does not trigger portfoliorecalculation
- [x] Improve: Debounce value input inside portfoliobuilder and DatePicker
- [x] Style: KeyMetric annualized needs to be more self explaining (change title)
- [x] Style: Portfoliobuilder number of Assets
- [ ] ~~Style: Indicate which symbols have been downloaded~~(Move to 0.6.0)

#### 0.6.0

- [ ] Improve: Datastructure, store data inside idbSymbolData wit a clean format
- [ ] Add: Popper menu to SelectedSymbolsBar
  - [ ] Showing remove
  - [ ] Information about the symbol
  - [ ] Date of data download

#### Idea dump

- Add: Drawdownchart
- Improve: Check if DatePicker delivers a valid date
- Add timeframe for all data
- Add: Setting to fetch monthly data, or daily
- Add: Store different portfolio setups to save for later and to compare
- Fix: symbolDataStore.isCalculatingPortfolioPerformance stays true when api failed
- Remove: moment.js to decrease bundle size(?)
- Add: Choose time of entry for each position
- Improve: Portfoliobuilder sort by each row
- Add: Store datset of fetched data, refresh if is too old
- Add: Store meta data for symbol in symbolstore (change data flow, (full name, currency, region)
- Add: portfolio calculation granularity to speed up calculation
- Add: Store for symbols to be fetched (in case API limit is reached)(set version of index db to current date)
- Add: Different Backends to call stock data from different sources

#### 1.0.0

- Add: Sortino Ratio
- Add: Jensen-Alpha
- Add: tooltip with link to ratio definition
- Add: Heatmap for daily/weekly/montly return
- Add: Card performance weighted compared to single asset and market

(Testing if actions cache is working)
