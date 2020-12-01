const chartColors = {
  nextAvailableColorValue() {
    let availableColorValue = null;
    for (let index = 0; index < this.chartColorsForSeries.length; index++) {
      const element = this.chartColorsForSeries[index];
      if (!element.isBegingUsed) {
        availableColorValue = element.colorValue;
        element.isBegingUsed = true;
        break;
      }
    }
    return availableColorValue;
  },
  removeColorInUse(colorValue) {
    for (let index = 0; index < this.chartColorsForSeries.length; index++) {
      const element = this.chartColorsForSeries[index];
      if (element.colorValue === colorValue) {
        element.isBegingUsed = false;
        break;
      }
    }
  },
  chartColorsForSeries: [
    { colorValue: "#2196f3", isBegingUsed: false },
    { colorValue: "#03a9f4", isBegingUsed: false },
    { colorValue: "#00bcd4", isBegingUsed: false },
    { colorValue: "#009688", isBegingUsed: false },
    { colorValue: "#4caf50", isBegingUsed: false },
    { colorValue: "#8bc34a", isBegingUsed: false },
    { colorValue: "#cddc39", isBegingUsed: false },
    { colorValue: "#ffeb3b", isBegingUsed: false },
    { colorValue: "#ffc107", isBegingUsed: false },
    { colorValue: "#ff9800", isBegingUsed: false },
    { colorValue: "#ff5722", isBegingUsed: false },
    { colorValue: "#f44336", isBegingUsed: false },
    { colorValue: "#e91e63", isBegingUsed: false },
    { colorValue: "#9c27b0", isBegingUsed: false },
    { colorValue: "#673ab7", isBegingUsed: false },

    { colorValue: "#2c387e", isBegingUsed: false },
    { colorValue: "#1769aa", isBegingUsed: false },
    { colorValue: "#0276aa", isBegingUsed: false },
    { colorValue: "#008394", isBegingUsed: false },
    { colorValue: "#00695f", isBegingUsed: false },
    { colorValue: "#357a38", isBegingUsed: false },
    { colorValue: "#618833", isBegingUsed: false },
    { colorValue: "#8f9a27", isBegingUsed: false },
    { colorValue: "#b2a429", isBegingUsed: false },
    { colorValue: "#b28704", isBegingUsed: false },
    { colorValue: "#b26a00", isBegingUsed: false },
    { colorValue: "#b23c17", isBegingUsed: false },
    { colorValue: "#aa2e25", isBegingUsed: false },
    { colorValue: "#a31545", isBegingUsed: false },
    { colorValue: "#6d1b7b", isBegingUsed: false },
    { colorValue: "#482880", isBegingUsed: false },

    { colorValue: "#6573c3", isBegingUsed: false },
    { colorValue: "#4dabf5", isBegingUsed: false },
    { colorValue: "#35baf6", isBegingUsed: false },
    { colorValue: "#33c9dc", isBegingUsed: false },
    { colorValue: "#33ab9f", isBegingUsed: false },
    { colorValue: "#6fbf73", isBegingUsed: false },
    { colorValue: "#a2cf6e", isBegingUsed: false },
    { colorValue: "#d7e360", isBegingUsed: false },
    { colorValue: "#ffef62", isBegingUsed: false },
    { colorValue: "#ffcd38", isBegingUsed: false },
    { colorValue: "#ffac33", isBegingUsed: false },
    { colorValue: "#ff784e", isBegingUsed: false },
    { colorValue: "#f6685e", isBegingUsed: false },
    { colorValue: "#ed4b82", isBegingUsed: false },
    { colorValue: "#af52bf", isBegingUsed: false },
    { colorValue: "#8561c5", isBegingUsed: false },
  ],
};

export default chartColors;
