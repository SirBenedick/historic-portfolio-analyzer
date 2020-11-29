import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

const TriggerShowVisibleLines = observer(({ portfolioStore, rerenderVisibleLines }) => {
  useEffect(() =>
    autorun(() => {
      console.log("Trigger - TriggerShowVisibleLines");
      if (portfolioStore.triggerRerenderVisibleLines) rerenderVisibleLines();
      portfolioStore.setTriggerRerenderVisibleLines(false);
    })
  );

  return <div />;
});
export default TriggerShowVisibleLines;
