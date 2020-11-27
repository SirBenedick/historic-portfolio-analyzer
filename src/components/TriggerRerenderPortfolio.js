import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

const TriggerRerenderPortfolio = observer(({ dataStore, rerenderPortfolio }) => {
  useEffect(() =>
    autorun(() => {
      console.log("Trigger - TriggerRecalculatePortfolio");
      if (dataStore.triggerRerenderPortfolio) rerenderPortfolio();
      dataStore.setTriggerRerenderPortfolio(false);
    })
  );

  return <div />;
});
export default TriggerRerenderPortfolio;
