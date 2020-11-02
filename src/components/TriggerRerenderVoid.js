import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

const TriggerRerenderVoid = observer(({ dataStore, rerenderChartRef }) => {
	// TODO improve the trigger
  useEffect(() =>
    autorun(() => {
			console.log("Void trigger executed, chart will rerender");
			rerenderChartRef()
    })
  );

  return <div style={{ display: "none" }}>{JSON.stringify(dataStore.symbols)}</div>;
});
export default TriggerRerenderVoid;
