import React from "react";
import { observer } from "mobx-react-lite"

const PortfolioListValueField = observer(({dataStore}) => {


  return (
    <div><p>Hey</p>
        {/* {JSON.stringify(dataStore.dataForSymbolTicker("AAPL"))} */}
    </div>
  );
})


export default PortfolioListValueField