import useDebouncedSearch from "../hooks/useDebouncedSearch";
import axios from "axios";
const alpha_vantage = { url: "https://www.alphavantage.co/query", api_token: "-" };

const useSearchStarwarsHero = () => useDebouncedSearch((text) => searchStarwarsHeroAsync(text));

const searchStarwarsHeroAsync = async (keywords) => {
  const res = await axios.get(alpha_vantage.url, {
    params: {
      function: "SYMBOL_SEARCH",
      keywords: keywords,
      apikey: alpha_vantage.api_token,
    },
  });
  return res.data["bestMatches"]
};

const SelectedSymbolsBarV2 = () => {
  const { inputText, setInputText, searchResults } = useSearchStarwarsHero();
  return (
    <div>
      <p>{JSON.stringify(searchResults)}</p>
      <input value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <div>
        {searchResults.loading && <div>...</div>}
        {searchResults.error && <div>Error: {searchResults.error.message}</div>}
        {searchResults.result && (
          <div>
            <div>Results: {searchResults.result.length}</div>
            <ul>
              {searchResults.result.map((hero) => (
                <li key={hero["1. symbol"]}>{hero["1. symbol"]}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectedSymbolsBarV2;
