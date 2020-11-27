import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

const TriggerRerenderDrawdown = observer(({ keyMetricsStore, rerenderDrawdown }) => {
  useEffect(() =>
    autorun(() => {
      console.log("Trigger - TriggerRerenderDrawdown");
      if (keyMetricsStore.portfolioDrawdownTimeSeries.length !== 0) rerenderDrawdown();
    })
  );
  return <div />;
});
export default TriggerRerenderDrawdown;
