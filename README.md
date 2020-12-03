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

#### 0.10.4 (WIP)

- Improve: Save portfolio with enter not just button press
- Improve: Saving a portfolio can ignore the start date
- Try: Loading a tone of symbols first time --> handle Failed API calls in queue
- Add: Reload all data button
- Style: Increase Chart height

#### 0.11.0

- Add: link with symbols to send to friends and directly see the same portfolio
- Add: share button to loaded list
- querystring : import queryString from "query-string";
  queryString.parse('foo=1,2,3', {arrayFormat: 'comma'});
- App.js add useffect, load params, if "command" == load_portfolio
  const value = queryString.parse(window.location.search);
  const token = value.token;
- PortfolioStore add function addSymbolsFromURL
- Add only symbols
- Add: Share Button
- generate URL:
  queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'comma'});
- copy URL to clipboard

#### Next Steps

##### Short term

###### Idea dump

- Add: Chip Menu click on name directs to finance page of symbol
- Improve: Material UI Theming, where is primary etc. defined
- Add: KeyMetrics Tab for all keymetrics from analytics_js
- Add timeframe for all data
- Add: Setting to fetch monthly data, or daily
- Fix: symbolDataStore.isCalculatingPortfolioPerformance stays true when api failed
- Remove: moment.js to decrease bundle size(?)
- Add: Choose time of entry for each position
- Add: Store meta data for symbol in symbolstore (change data flow, (full name, currency, region)
- Add: portfolio calculation granularity to speed up calculation
- Add: Store for symbols to be fetched (in case API limit is reached)(set version of index db to current date)

###### Metrics

- Add: Sortino Ratio
- Add: Jensen-Alpha
- Add: tooltip with link to ratio definition
- Add: Heatmap for daily/weekly/montly return
- Add: Card performance weighted compared to single asset and market

##### Long term

###### Portfolio overview tab

- [ ] Improve: Name "overview" tab to "chart"
- [ ] Add: "Overview" tab
- [ ] Add: Table similar to portfoliobuilder
  - [ ] Ticker
  - [ ] Name
  - [ ] Annualized
  - [ ] Performance since start
- [ ] Add: Performance 1year, 2, years, 3 years
  - [ ] Design Storage of data
  - [ ] Calculate
- [ ] Add: to "overview" tab Performance 1year, 2, years, 3 years
- [ ] Add: Fetch Company overview after add to idb, store in symbolDataStore in symbolChartTimeseriesDataMap, expand map to store data
- [ ] Add: get company overview gets from idb or makes api call
- [ ] Add: P/E to "overview" tab

###### Compare stored portfolios

- Add: Comparison page to compare multiple portfolio configuration

###### Change API call to IEX Cloud

###### Switch to typescript

###### Add testing
