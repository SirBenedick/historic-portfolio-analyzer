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

#### 0.3.0

- [ ] Fix: Trigger Chart rerender when switching from Settings page to Chart page
- [ ] Add Loading indicator while Portfolio is calculating (Backdrop)
- [ ] Add: Calculation of dividends to portfolio performance
- [ ] Improve: Search with space (if api allows this)
- [ ] Add: Calculation of sharp ratio,
- [ ] Add: Row of cards with key portfolio result
  - [ ] Performace
  - [ ] Annualized
  - [ ] Dividend
  - [ ] Sharpratio
- [ ] Add: Chart-Settings-Card for portfolio calculation granularity
- [ ] Style: Move datepicker into new Chart-Settings-Card

#### Idea dump

- Add: Store meta data for symbol in symbolstore (change data flow, (full name, currency, region)
- Add: Store for symbols to be fetched (in case API limit is reached)(set version of index db to current date)
- Add: Store datet of fetched data, refresh if is too old
- Add: Choose time of entry for each position
- Add: Heatmap for daily/weekly/montly return
- Add: Card performance weighted compared to single asset and market
- Add: Different Backends to call stock data from different sources
- Clean up README.md: Add UCs, scenarios, technoglogies...
- Add timeframe for all data
- Remove: moment.js to decrease bundle size
- Add: Setting to fetch monthly data, or daily
