import React from "react";
import { TextField, Typography } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { observer } from "mobx-react-lite";
import axios from "axios";
import configStore from "../stores/ConfigStore";

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
    const res = await axios.get(configStore.alphaVantage.url, {
      params: {
        function: configStore.alphaVantageConstants.SYMBOL_SEARCH,
        keywords: keywords,
        apikey: configStore.alphaVantage.apiToken,
      },
    });
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
    }, 500);
    setSearchTimeout(timeout);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      loading={isLoadingSearch}
      value={value}
      onChange={(event, symbolSet) => {
        setValue("");
        if (symbolSet["1. symbol"]) dataStore.addSymbol(symbolSet["1. symbol"]);
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
