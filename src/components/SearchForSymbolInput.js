import React from "react";
import { TextField, Typography } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { observer } from "mobx-react-lite";
import FetchDataService from "../services/FetchDataService";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option["1. symbol"]}-${option["2. name"]}`,
});

const SearchForSymbolInput = observer(({ dataStore }) => {
  const [searchOptions, setSearchOptions] = React.useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = React.useState(false);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [value, setValue] = React.useState(searchOptions[0]);

  const handleValueChange = async (keywords) => {
    const handleSearch = async (keywords) => {
      setIsLoadingSearch(true);
      const res = await FetchDataService.searchAlphaVantageByKeywords(keywords);
      setIsLoadingSearch(false);
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
          label="Add Asset"
          variant="outlined"
          onChange={(event) => handleValueChange(event.target.value)}
        />
      )}
      style={{ minWidth: "250px" }}
    />
  );
});
export default SearchForSymbolInput;
