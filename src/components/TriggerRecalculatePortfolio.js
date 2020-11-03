import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

const TriggerRecalculatePortfolio = observer(({ dataStore, recalculateAndRenderPortfolio }) => {
  useEffect(() =>
    autorun(() => {
      console.log("Trigger - TriggerRecalculatePortfolio");
      if (dataStore.triggerRecalculatePortfolio) recalculateAndRenderPortfolio();
      dataStore.setTriggerRecalculatePortfolio(false);
    })
  );

  return <div />;
});
export default TriggerRecalculatePortfolio;
