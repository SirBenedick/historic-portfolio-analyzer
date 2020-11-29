# Historic-Portfolio-Analyzer

![v0.9.0](documentation/historic-portfolio-analyzer.png?raw=true "HPA v0.9.0")

Try it: [https://sirbenedick.github.io/historic-portfolio-analyzer](https://sirbenedick.github.io/historic-portfolio-analyzer)

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

### Roadmap

(Add, Fix, Improve, Refactor, Style, Remove)

#### 0.9.2

- [x] Add: Badge when data isnt up to date on chip
- [x] Add: Badge when data wasnt downloaded yet
- [ ] Add: Action to chip to only show that symbol line
- [ ] Fix: API key bug

#### 0.10.0

- Add: Tab of table with more metics, P/E, performance 1 year, 2 years, 3 years

#### 0.11.0

- Add: Store different portfolio setups to save for later and to compare

#### Idea dump

##### General

- Add: KeyMetrics Tab for all keymetrics from analytics_js
- Add timeframe for all data
- Add: Setting to fetch monthly data, or daily
- Fix: symbolDataStore.isCalculatingPortfolioPerformance stays true when api failed
- Remove: moment.js to decrease bundle size(?)
- Add: Choose time of entry for each position
- Add: Store datset of fetched data, refresh if is too old
- Add: Store meta data for symbol in symbolstore (change data flow, (full name, currency, region)
- Add: portfolio calculation granularity to speed up calculation
- Add: Store for symbols to be fetched (in case API limit is reached)(set version of index db to current date)

##### Metrics

- Add: Sortino Ratio
- Add: Jensen-Alpha
- Add: tooltip with link to ratio definition
- Add: Heatmap for daily/weekly/montly return
- Add: Card performance weighted compared to single asset and market

##### Long Term

- Add: Different Backends to call stock data from different sources
- Improve: Swtich to typescript
- Improve: Add testing for components
