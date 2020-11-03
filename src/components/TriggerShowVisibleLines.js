import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

const TriggerShowVisibleLines = observer(({ dataStore, rerenderVisibleLines }) => {
  useEffect(() =>
    autorun(() => {
      console.log("Trigger - TriggerShowVisibleLines");
      if (dataStore.triggerRerenderVisibleLines) rerenderVisibleLines();
      dataStore.setTriggerRerenderVisibleLines(false);
    })
  );

  return <div />;
});
export default TriggerShowVisibleLines;
