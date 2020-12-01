export const compareSymbolSetsByTicker = (a, b) => {
  if (a.symbolTicker < b.symbolTicker) {
    return -1;
  }
  if (a.symbolTicker > b.symbolTicker) {
    return 1;
  }
  return 0;
};
export const compareSymbolSetsByTickerPortfolioFirst = (a, b) => {
  if (b.symbolTicker === "Portfolio") {
    return 1;
  }
  if (a.symbolTicker < b.symbolTicker) {
    return -1;
  }
  if (a.symbolTicker > b.symbolTicker) {
    return 1;
  }
  return 0;
};
export const compareSymbolSetsByPerformanceAnnulized = (a, b) => {
  if (a.annualizedPerformanceSincePortfolioStart > b.annualizedPerformanceSincePortfolioStart) {
    return -1;
  }
  if (a.annualizedPerformanceSincePortfolioStart < b.annualizedPerformanceSincePortfolioStart) {
    return 1;
  }
  return 0;
};
export const compareSymbolSetsByPerformanceSinceStart = (a, b) => {
  if (a.performanceSincePortfolioStart > b.performanceSincePortfolioStart) {
    return -1;
  }
  if (a.performanceSincePortfolioStart < b.performanceSincePortfolioStart) {
    return 1;
  }
  return 0;
};
export const compareSymbolSetsByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
export const compareSymbolSetsByValue = (a, b) => {
  if (a.value > b.value) {
    return -1;
  }
  if (a.value < b.value) {
    return 1;
  }
  return 0;
};
