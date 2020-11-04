import React from "react";
import { TextField, Typography } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { observer } from "mobx-react-lite";
import FetchDataService from "../services/FetchDataService";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option.symbolTicker}-${option.name}`,
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
      onChange={(event, symbolSearchResult) => {
        setValue("");
        if (symbolSearchResult && symbolSearchResult.symbolTicker) dataStore.addSymbol(symbolSearchResult);
      }}
      options={searchOptions}
      filterOptions={filterOptions}
      renderOption={(option) => (
        <div>
          <Typography>{option.name}</Typography>
          <Typography variant="caption">
            {option.symbolTicker} - {option.region} - {option.currency}
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
