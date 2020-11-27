import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box, Paper } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import ChartPortfolioOverview from "./ChartPortfolioOverview";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabBar = observer(({ dataStore, symbolDataStore, configStore }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Drawdown" {...a11yProps(1)} />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        <ChartPortfolioOverview dataStore={dataStore} configStore={configStore} symbolDataStore={symbolDataStore} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Drawdown
      </TabPanel>
    </div>
  );
});

export default TabBar;
