import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

const TriggerRerenderPortfolio = observer(({ portfolioStore, rerenderPortfolio }) => {
  useEffect(() =>
    autorun(() => {
      console.log("Trigger - TriggerRerenderPortfolio");
      if (portfolioStore.triggerRerenderPortfolio) rerenderPortfolio();
      portfolioStore.setTriggerRerenderPortfolio(false);
    })
  );

  return <div />;
});
export default TriggerRerenderPortfolio;
