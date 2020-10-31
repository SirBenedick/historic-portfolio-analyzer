import React from 'react';
import SelectedSymbolsBar from "../components/SelectedSymbolsBar";
import Chart from "../components/Chart";

function ChartingPage(props) {
	return (
    <div>
      <SelectedSymbolsBar dataStore={props.dataStore} />
      <Chart />
    </div>
  );
}

export default ChartingPage;
