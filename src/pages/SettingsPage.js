import React from "react";
import { Paper, Typography, TextField, Link } from "@material-ui/core";

const SettingsPage = ({ dataStore }) => {
  const preventDefault = (event) => event.preventDefault();
  return (
    <div>
      <Paper elevation={1} style={{ padding: "20px" }}>
        <Typography variant="h1" gutterBottom>
          Settings
        </Typography>

        <Typography variant="h6" gutterBottom>
          Alpha Vantag API Token
        </Typography>
        <TextField id="outlined-basic" label="API-Token" variant="outlined" />
        <Typography variant="caption" display="block" gutterBottom>
          Get your free token here:
          <Link href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noreferrer">
            Alpha Vantage
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default SettingsPage;
