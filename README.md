# Historic-Portfolio-Analyzer

[Click here to try it](https://sirbenedick.github.io/historic-portfolio-analyzer)

## Roadmap

1. Create a plattform to analyze historic portfolio performance
2. Add metrics to quantify portfolio performance based on research
3. Automate portfolio optimization

## Development

### Feature focused annoyance driven development

###### "Make it run, make it right, make it fast" - Kent Beck [source](https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast)

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

#### 0.8.0

- [ ] Add: Drawdownchart
  - [ ] Calculate Drawdown time series store in KeyMetricsStore
  - [ ] Draw chart
  - [ ] Tab to switch to drawdownchart
- [ ] Improve: Change Site title from "alpha" to version number

#### 0.9.0 (miscelangelous)

- Add: InfoIcon to every card with explanation
  - Description, calculation reinvestes dividends, no payout
  - Shap Calculation
  - Annulized
- Fix: Chip Dropdown menu doesnt update date of downloaded data
- Add: Chip Dropdown delete existing data set
- Add: Chip Dropdown full name of asset
- Fix: Delay save of changed API key
- Add: Random API Key generator button
- Add: Progress of portfolio calculation
- Add: More line colors
- Fix: When dividend is 0 the loading indicator is shown

#### Idea dump

- Add: Screenshot to github readme
- Add timeframe for all data
- Add: Setting to fetch monthly data, or daily
- Add: Store different portfolio setups to save for later and to compare
- Fix: symbolDataStore.isCalculatingPortfolioPerformance stays true when api failed
- Remove: moment.js to decrease bundle size(?)
- Add: Choose time of entry for each position
- Add: Store datset of fetched data, refresh if is too old
- Add: Store meta data for symbol in symbolstore (change data flow, (full name, currency, region)
- Add: portfolio calculation granularity to speed up calculation
- Add: Store for symbols to be fetched (in case API limit is reached)(set version of index db to current date)
- Add: Different Backends to call stock data from different sources
- Improve: Swtich to typescript
- Improve: Add testing for components

#### 1.0.0

- Add: Sortino Ratio
- Add: Jensen-Alpha
- Add: tooltip with link to ratio definition
- Add: Heatmap for daily/weekly/montly return
- Add: Card performance weighted compared to single asset and market
