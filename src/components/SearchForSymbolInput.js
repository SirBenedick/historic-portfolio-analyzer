/* eslint-disable no-use-before-define */
import React from "react";
import { TextField, Typography } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { observer } from "mobx-react-lite";
import axios from "axios";
const alpha_vantage = { url: "https://www.alphavantage.co/query", api_token: "-" };

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option["1. symbol"]}-${option["2. name"]}`,
});

const SearchForSymbolInput = observer(({ dataStore }) => {
  const [searchOptions, setSearchOptions] = React.useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = React.useState(false);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [value, setValue] = React.useState(searchOptions[0]);

  const searchAlphaVantageByKeywords = async (keywords) => {
    console.log("++++++searchAlphaVantageByKeywords: " + keywords);
    setIsLoadingSearch(true);
    const res = await axios.get(alpha_vantage.url, {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: keywords,
        apikey: alpha_vantage.api_token,
      },
    });
    await sleep(1e3);
    setIsLoadingSearch(false);
    return res.data["bestMatches"];
  };

  const handleValueChange = async (keywords) => {
    console.log("--------Input changed");
    const handleSearch = async (keywords) => {
      const res = await searchAlphaVantageByKeywords(keywords);
      setSearchOptions(res);
    };

    if (searchTimeout) clearTimeout(searchTimeout);
    if (!keywords) return;
    const timeout = setTimeout(async () => {
      await handleSearch(keywords);
    }, 1000);
    setSearchTimeout(timeout);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      loading={isLoadingSearch}
      value={value}
      onChange={(event, symbolSet) => {
        dataStore.addSymbol(symbolSet["1. symbol"]);
      }}
      options={searchOptions}
      filterOptions={filterOptions}
      renderOption={(option) => (
        <div>
          <Typography>{option["2. name"]}</Typography>
          <Typography variant="caption">
            {option["1. symbol"]} - {option["4. region"]} - {option["8. currency"]}
          </Typography>
        </div>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Combo box"
          variant="outlined"
          onChange={(event) => handleValueChange(event.target.value)}
        />
      )}
      style={{ width: 300 }}
    />
  );
});
export default SearchForSymbolInput;
