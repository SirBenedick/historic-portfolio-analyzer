import React from "react";
import { Paper, Typography, TextField, Link } from "@material-ui/core";

const SettingsPage = ({ configStore }) => {
  const [apiTimeout, setAPITimeout] = React.useState(null);
  const handleValueChange = async (newAPIValue) => {
    const handleAPIValueChange = async (newAPIValue) => {
      configStore.setAlphaVantageAPITokenIDB(newAPIValue);
    };

    if (apiTimeout) clearTimeout(apiTimeout);
    if (!newAPIValue) return;
    const timeout = setTimeout(async () => {
      await handleAPIValueChange(newAPIValue);
    }, 1000);
    setAPITimeout(timeout);
  };

  return (
    <div>
      <Paper elevation={1} style={{ padding: "20px" }}>
        <Typography variant="h1" gutterBottom>
          Settings
        </Typography>

        <Typography variant="h6" gutterBottom>
          Alpha Vantag API Token
        </Typography>
        <TextField
          id="outlined-basic"
          label="API-Token"
          variant="outlined"
          defaultValue={configStore.alphaVantage.apiToken}
          onChange={(e) => handleValueChange(e.target.value)}
        />
        <Typography variant="caption" display="block" gutterBottom>
          Get your free token here:{" "}
          <Link href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noreferrer">
            Alpha Vantage
          </Link>{" "}
          (Hint: try a random key)
        </Typography>
      </Paper>
    </div>
  );
};

export default SettingsPage;
