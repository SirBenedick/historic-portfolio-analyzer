(this["webpackJsonphistoric-portfolio-anazyler"]=this["webpackJsonphistoric-portfolio-anazyler"]||[]).push([[0],{136:function(e,t,r){},160:function(e,t,r){"use strict";r.r(t);var a=r(4),n=r(0),i=r.n(n),o=r(16),s=r.n(o),c=(r(136),r(14)),l=r(28),u=r(10),f=r(2),b=r(212),d=r(23),p=r(227),h=r(226),g=r(214),j=r(211),y=r(225),m=r(58),S=r(228),O=r(209),k=r(103),x=r.n(k),v=r(105),T=r.n(v),w=r(104),D=r.n(w),P=r(229),A=r(230),V=r(231),C=r(106),I=r.n(C),B=r(107),F=r.n(B),R=r(7),E=r.n(R),L=r(12),N=r(22),Y=r(18),M=r(9),U=r(46),_=r.n(U),H=r(78),q=r.n(H),G=r(108);"indexedDB"in window||console.log("This browser doesn't support IndexedDB");var K=Object(G.a)("historic-portfolio-anazyler",1,{upgrade:function(e){e.objectStoreNames.contains("symbolDataStore")||(console.log("Creating new symbolDataStore"),e.createObjectStore("symbolDataStore",{keyPath:"symbol",autoIncrement:!1})),e.objectStoreNames.contains("portfolioStore")||(console.log("Creating new portfolioStore"),e.createObjectStore("portfolioStore")),e.objectStoreNames.contains("configStore")||(console.log("Creating new configStore"),e.createObjectStore("configStore"))}}),z={get:function(e){return Object(L.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,K;case 2:return t.abrupt("return",t.sent.get("portfolioStore",e));case 3:case"end":return t.stop()}}),t)})))()},set:function(e,t){return Object(L.a)(E.a.mark((function r(){return E.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,K;case 2:return r.abrupt("return",r.sent.put("portfolioStore",t,e));case 3:case"end":return r.stop()}}),r)})))()},delete:function(e){return Object(L.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,K;case 2:return t.abrupt("return",t.sent.delete("portfolioStore",e));case 3:case"end":return t.stop()}}),t)})))()},clear:function(){return Object(L.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K;case 2:return e.abrupt("return",e.sent.clear("portfolioStore"));case 3:case"end":return e.stop()}}),e)})))()},keys:function(){return Object(L.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K;case 2:return e.abrupt("return",e.sent.getAllKeys("portfolioStore"));case 3:case"end":return e.stop()}}),e)})))()},doesDataSeriesExist:function(){var e=this;return Object(L.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.get("dataSeries");case 2:if(!t.sent){t.next=7;break}return t.abrupt("return",!0);case 7:return t.abrupt("return",!1);case 8:case"end":return t.stop()}}),t)})))()}},W=new function(){var e=this;Object(M.k)(this,{notifications:[],keys:{API_TOKEN_MISSING:"API_TOKEN_MISSING",PORTFOLIO_CALCULATING:"PORTFOLIO_CALCULATING",API_TOKEN_STORED:"API_TOKEN_STORED"},enqueueSnackbar:Object(M.f)((function(t){e.notifications.push(Object(l.a)({key:t.key?t.key:(new Date).getTime()+Math.random()},t))})),removeSnackbar:Object(M.f)((function(t){e.notifications=e.notifications.filter((function(e){return e.key!==t}))}))})},J={get:function(e){return Object(L.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,K;case 2:return t.abrupt("return",t.sent.get("configStore",e));case 3:case"end":return t.stop()}}),t)})))()},set:function(e,t){return Object(L.a)(E.a.mark((function r(){return E.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,K;case 2:return r.abrupt("return",r.sent.put("configStore",t,e));case 3:case"end":return r.stop()}}),r)})))()},delete:function(e){return Object(L.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,K;case 2:return t.abrupt("return",t.sent.delete("configStore",e));case 3:case"end":return t.stop()}}),t)})))()},clear:function(){return Object(L.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K;case 2:return e.abrupt("return",e.sent.clear("configStore"));case 3:case"end":return e.stop()}}),e)})))()},keys:function(){return Object(L.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K;case 2:return e.abrupt("return",e.sent.getAllKeys("configStore"));case 3:case"end":return e.stop()}}),e)})))()}},X=new(function(){function e(){var t=this;Object(N.a)(this,e),this.alphaVantage={url:"https://www.alphavantage.co/query",apiToken:""},this.alphaVantageConstants={SYMBOL_SEARCH:"SYMBOL_SEARCH",TIME_SERIES_DAILY_ADJUSTED:"TIME_SERIES_DAILY_ADJUSTED"},J.get("alphaVantagAPIToken").then((function(e){return t.setAlphaVantageAPIToken(e)})),Object(M.p)(this,{alphaVantage:M.q,setAlphaVantageAPIToken:M.f})}return Object(Y.a)(e,[{key:"setAlphaVantageAPIToken",value:function(e){this.alphaVantage.apiToken=e}},{key:"setAlphaVantageAPITokenIDB",value:function(){var e=Object(L.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.set("alphaVantagAPIToken",t);case 2:W.enqueueSnackbar({message:"Stored new API-Token",options:{variant:"success",autoHideDuration:1e3},key:W.keys.API_TOKEN_STORED}),this.setAlphaVantageAPIToken(t);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}()),$={get:function(e){return Object(L.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,K;case 2:return t.abrupt("return",t.sent.get("symbolDataStore",e));case 3:case"end":return t.stop()}}),t)})))()},set:function(e){return Object(L.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,K;case 2:return t.abrupt("return",t.sent.put("symbolDataStore",e));case 3:case"end":return t.stop()}}),t)})))()},delete:function(e){return Object(L.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,K;case 2:return t.abrupt("return",t.sent.delete("symbolDataStore",e));case 3:case"end":return t.stop()}}),t)})))()},clear:function(){return Object(L.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K;case 2:return e.abrupt("return",e.sent.clear("symbolDataStore"));case 3:case"end":return e.stop()}}),e)})))()},keys:function(){return Object(L.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K;case 2:return e.abrupt("return",e.sent.getAllKeys("symbolDataStore"));case 3:case"end":return e.stop()}}),e)})))()},getAdjustedCloseByTickerAndDate:function(e,t){var r=this;return Object(L.a)(E.a.mark((function a(){var n;return E.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.get(e);case 2:if(!(n=a.sent)||!("Time Series (Daily)"in n)){a.next=6;break}if(!n["Time Series (Daily)"][t]){a.next=6;break}return a.abrupt("return",n["Time Series (Daily)"][t]["5. adjusted close"]);case 6:return a.abrupt("return",!1);case 7:case"end":return a.stop()}}),a)})))()},getDataChartFormatBySymbol:function(e){var t=this;return Object(L.a)(E.a.mark((function r(){return E.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(console.log("getDataChartFormatBySymbol: "+e),"Portfolio"!==e){r.next=12;break}return r.next=4,z.doesDataSeriesExist();case 4:if(!r.sent){r.next=9;break}return r.abrupt("return",z.get("dataSeries"));case 9:return r.abrupt("return",t.calculateAndStoreHistoricPortfolioPerformance());case 10:r.next=15;break;case 12:return r.next=14,K;case 14:return r.abrupt("return",r.sent.get("symbolDataStore",e).then(function(){var r=Object(L.a)(E.a.mark((function r(a){return E.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!(a&&"Time Series (Daily)"in a&&a["Time Series (Daily)"])){r.next=4;break}return r.abrupt("return",Q(a));case 4:if(!X.alphaVantage.apiToken){r.next=12;break}return r.next=7,ee.fetchDataDailyAdjustedForSymbolAlphaVantage(e);case 7:if(!r.sent){r.next=10;break}return r.abrupt("return",t.getDataChartFormatBySymbol(e));case 10:r.next=13;break;case 12:W.enqueueSnackbar({message:"Please enter an API key on the Settings Page",options:{variant:"error",autoHideDuration:1e4},key:W.keys.API_TOKEN_MISSING});case 13:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()));case 15:case"end":return r.stop()}}),r)})))()},doesTimesSeriesDailyAdjustedExistForSymbol:function(e){var t=this;return Object(L.a)(E.a.mark((function r(){var a;return E.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.get(e);case 2:if(!((a=r.sent)&&"Time Series (Daily)"in a&&a["Time Series (Daily)"])){r.next=5;break}return r.abrupt("return",!0);case 5:return r.abrupt("return",!1);case 6:case"end":return r.stop()}}),r)})))()},getTimeSeriesDailyByTicker:function(e){var t=this;return Object(L.a)(E.a.mark((function r(){var a;return E.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.get(e);case 2:return a=r.sent,r.abrupt("return",a["Time Series (Daily)"]);case 4:case"end":return r.stop()}}),r)})))()},calculateAndStoreHistoricPortfolioPerformance:function(){return Object(L.a)(E.a.mark((function e(){var t,r,a,n,i,o,s;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("calculateAndStoreHistoricPortfolioPerformance"),W.enqueueSnackbar({message:"Calculating Portfolio value",options:{variant:"info",autoHideDuration:2e3},key:W.keys.PORTFOLIO_CALCULATING}),console.log("Portfolio - calculating quantity"),t={},r=_()(ae.portfolioStartingDate),a=_()(),e.next=8,Promise.all(ae.getSymbolsWithoutPortfolio().map(function(){var e=Object(L.a)(E.a.mark((function e(n){var i,o,s,c,l;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.getAdjustedCloseByTickerAndDate(n.symbolTicker,r.format("YYYY-MM-DD"));case 2:i=e.sent;case 3:if(i){e.next=10;break}return r.add(1,"days"),e.next=7,$.getAdjustedCloseByTickerAndDate(n.symbolTicker,r.format("YYYY-MM-DD"));case 7:i=e.sent,e.next=3;break;case 10:return e.next=12,$.getAdjustedCloseByTickerAndDate(n.symbolTicker,a.format("YYYY-MM-DD"));case 12:o=e.sent;case 13:if(o){e.next=20;break}return a.subtract(1,"days"),e.next=17,$.getAdjustedCloseByTickerAndDate(n.symbolTicker,a.format("YYYY-MM-DD"));case 17:o=e.sent,e.next=13;break;case 20:s=parseFloat(o)/parseFloat(i),ae.setPerformanceSincePortfolioStartForTicker(n.symbolTicker,s),c=ae.getSymbolSetForTicker(n.symbolTicker).value,l=parseFloat(c)/parseFloat(i),t[n.symbolTicker]=l;case 25:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 8:for(console.log("Portfolio - list of dates"),n=[],i=_()(ae.portfolioStartingDate);i.isBefore();)n.push(i.format("YYYY-MM-DD")),i.add(1,"days");return console.log("Portfolio - calculating for each day"),o={},e.next=16,Promise.all(ae.getSymbolsWithoutPortfolio().map(function(){var e=Object(L.a)(E.a.mark((function e(t){var r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.getTimeSeriesDailyByTicker(t.symbolTicker);case 2:r=e.sent,o[t.symbolTicker]=r;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 16:return s=[],n.forEach((function(e){for(var r=0,a=0,n=Object.entries(o);a<n.length;a++){var i=Object(c.a)(n[a],2),l=i[0],u=i[1];if(!(e in u))return;r+=u[e]["5. adjusted close"]*t[l]}r&&s.push({time:e,value:r})})),e.next=20,z.set("dataSeries",s);case 20:return e.abrupt("return",s);case 21:case"end":return e.stop()}}),e)})))()}},Q=function(e){for(var t=[],r=0,a=Object.entries(e["Time Series (Daily)"]);r<a.length;r++){var n=Object(c.a)(a[r],2),i=n[0],o=n[1];t.push({time:String(i),value:parseFloat(o["5. adjusted close"])})}return t.reverse()},Z=$,ee={fetchDataDailyAdjustedForSymbolAlphaVantage:function(e){return Object(L.a)(E.a.mark((function t(){var r;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("fetchDataDailyAdjustedForSymbolAlphaVantage"),console.log("Fetching data for ".concat(e)),W.enqueueSnackbar({message:"Fetching data for: ".concat(e),options:{variant:"info",autoHideDuration:1500},key:"FETCHING-".concat(e)}),t.prev=3,t.next=6,q.a.get(X.alphaVantage.url,{params:{function:X.alphaVantageConstants.TIME_SERIES_DAILY_ADJUSTED,symbol:e,outputsize:"full",apikey:X.alphaVantage.apiToken}});case 6:if(!("Note"in(r=t.sent).data)){t.next=13;break}return console.log("Failed to fetch for: "+e),W.enqueueSnackbar({message:"Failed to fetch data for: ".concat(e),options:{variant:"warning",autoHideDuration:1500},key:"FETCHING-FAILED-".concat(e)}),t.abrupt("return",!1);case 13:return r.data.symbol=e,t.next=16,Z.set(r.data);case 16:return W.enqueueSnackbar({message:"Successfully fetched data for: ".concat(e),options:{variant:"success",autoHideDuration:1500},key:"FETCHING-SUCCESS-".concat(e)}),t.abrupt("return",e);case 18:t.next=23;break;case 20:t.prev=20,t.t0=t.catch(3),console.log(Object.keys(t.t0),t.t0.message);case 23:case"end":return t.stop()}}),t,null,[[3,20]])})))()},searchAlphaVantageByKeywords:function(e){return Object(L.a)(E.a.mark((function t(){var r,a,n;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("searchAlphaVantageByKeywords: "+e),t.next=3,q.a.get(X.alphaVantage.url,{params:{function:X.alphaVantageConstants.SYMBOL_SEARCH,keywords:e,apikey:X.alphaVantage.apiToken}});case 3:if(!("Note"in(r=t.sent).data)){t.next=10;break}return console.log("Failed to search for:"+e),W.enqueueSnackbar({message:"Failed to search for: ".concat(e),options:{variant:"warning"}}),t.abrupt("return",!1);case 10:if(a=r.data.bestMatches){t.next=13;break}return t.abrupt("return",[]);case 13:return n=a.map((function(e){return{symbolTicker:e["1. symbol"],name:e["2. name"],region:e["4. region"],currency:e["8. currency"]}})),t.abrupt("return",n);case 15:case"end":return t.stop()}}),t)})))()}},te=function(){function e(){var t=this;Object(N.a)(this,e),this.symbols=[{symbolTicker:"Portfolio",isVisible:!0,value:0,color:this.nextAvailableColorValue()}],this.pendingRequests=0,this.appleData=[],this.portfolioStartingDate="",this.triggerRecalculatePortfolio=!1,this.triggerRerenderVisibleLines=!1,Object(M.p)(this,{symbols:M.q,triggerRecalculatePortfolio:M.q,triggerRerenderVisibleLines:M.q,portfolioStartingDate:M.q,toggleSymbolVisibility:M.f,addSymbol:M.f,removeSelectedSymbol:M.f,setValueForTicker:M.f,setPerformanceSincePortfolioStartForTicker:M.f,setTriggerRecalculatePortfolio:M.f,setTriggerRerenderVisibleLines:M.f,setPortfolioStartingDate:M.f,totalValueOfSymbols:M.h,listOfSymbolTickers:M.h}),this.portfolioStartingDate=_()().subtract(1,"years").format("YYYY-MM-DD"),this.addSymbol({symbolTicker:"AAPL",name:"Apple Inc.",region:"testRegion",currency:"USD"}),Object(M.g)((function(){var e=t.portfolioStartingDate,r=t.totalValueOfSymbols;t.setTriggerRecalculatePortfolio(!0),console.log("Autorun: triggering portfolio rercalculation"+JSON.stringify(e)+JSON.stringify(r))}))}return Object(Y.a)(e,[{key:"setTriggerRecalculatePortfolio",value:function(e){this.triggerRecalculatePortfolio=e}},{key:"setTriggerRerenderVisibleLines",value:function(e){this.triggerRerenderVisibleLines=e}},{key:"addSymbol",value:function(){var e=Object(L.a)(E.a.mark((function e(t){var r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=function(e,t){return"Portfolio"===t.symbolTicker?1:e.symbolTicker<t.symbolTicker?-1:e.symbolTicker>t.symbolTicker?1:0},t){e.next=3;break}return e.abrupt("return",!1);case 3:return this.symbols.push({symbolTicker:t.symbolTicker,name:t.name,currency:t.currency,performanceSincePortfolioStart:1,isVisible:!0,value:100,color:this.nextAvailableColorValue()}),this.symbols.sort(r),e.next=7,Z.doesTimesSeriesDailyAdjustedExistForSymbol(t.symbolTicker);case 7:if(e.sent){e.next=15;break}if(!X.alphaVantage.apiToken){e.next=14;break}return e.next=12,ee.fetchDataDailyAdjustedForSymbolAlphaVantage(t.symbolTicker);case 12:e.next=15;break;case 14:W.enqueueSnackbar({message:"Please enter an API key on the Settings Page",options:{variant:"error",autoHideDuration:1e4},key:W.keys.API_TOKEN_MISSING});case 15:this.setTriggerRerenderVisibleLines(!0),this.setTriggerRecalculatePortfolio(!0);case 17:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"removeSelectedSymbol",value:function(e){this.removeColorInUse(this.getSymbolSetForTicker(e).color),this.symbols=this.symbols.filter((function(t){return t.symbolTicker!==e})),this.setTriggerRerenderVisibleLines(!0),this.setTriggerRecalculatePortfolio(!0)}},{key:"toggleSymbolVisibility",value:function(e){console.log(e),this.symbols.forEach((function(t){t.symbolTicker===e&&(t.isVisible=!t.isVisible)})),this.setTriggerRerenderVisibleLines(!0)}},{key:"setPortfolioStartingDate",value:function(e){this.portfolioStartingDate=e}},{key:"doesSymbolExist",value:function(){var e=Object(L.a)(E.a.mark((function e(t){var r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=!1,this.symbols.forEach((function(e){e.symbolTicker===t&&(r=!0)})),e.abrupt("return",r);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getSymbolSetForTicker",value:function(e){return Object(M.s)(this.symbols.find((function(t){return t.symbolTicker===e})))}},{key:"getSymbolsWithoutPortfolio",value:function(){return this.symbols.filter((function(e){return"Portfolio"!==e.symbolTicker}))}},{key:"setValueForTicker",value:function(e,t){console.log("Updating value: "+t),this.symbols.forEach((function(r){r.symbolTicker===e&&(r.value=t)}))}},{key:"setPerformanceSincePortfolioStartForTicker",value:function(e,t){console.log("Updating performanceSincePortfolioStart: "+t),this.symbols.forEach((function(r){r.symbolTicker===e&&(r.performanceSincePortfolioStart=t)}))}},{key:"nextAvailableColorValue",value:function(){for(var e=null,t=0;t<re.length;t++){var r=re[t];if(!r.isBegingUsed){e=r.colorValue,r.isBegingUsed=!0;break}}return e}},{key:"removeColorInUse",value:function(e){for(var t=0;t<re.length;t++){var r=re[t];if(r.colorValue===e){r.isBegingUsed=!1;break}}}},{key:"totalValueOfSymbols",get:function(){return this.symbols.reduce((function(e,t){return"Portfolio"!==t.symbolTicker?+e+ +t.value:e}),0)}},{key:"listOfSymbolTickers",get:function(){return this.symbols.map((function(e){return e.symbolTicker}))}}]),e}(),re=[{colorValue:"#3f51b5",isBegingUsed:!1},{colorValue:"#2196f3",isBegingUsed:!1},{colorValue:"#03a9f4",isBegingUsed:!1},{colorValue:"#00bcd4",isBegingUsed:!1},{colorValue:"#009688",isBegingUsed:!1},{colorValue:"#4caf50",isBegingUsed:!1},{colorValue:"#8bc34a",isBegingUsed:!1},{colorValue:"#cddc39",isBegingUsed:!1},{colorValue:"#ffeb3b",isBegingUsed:!1},{colorValue:"#ffc107",isBegingUsed:!1},{colorValue:"#ff9800",isBegingUsed:!1},{colorValue:"#ff5722",isBegingUsed:!1},{colorValue:"#f44336",isBegingUsed:!1},{colorValue:"#e91e63",isBegingUsed:!1},{colorValue:"#9c27b0",isBegingUsed:!1},{colorValue:"#673ab7",isBegingUsed:!1}],ae=new te,ne=r(213),ie=r(80),oe=r(236),se=r(17),ce=r(232),le=r(206),ue=r(234),fe=Object(le.a)({matchFrom:"any",stringify:function(e){return"".concat(e.symbolTicker,"-").concat(e.name)}}),be=Object(se.c)((function(e){var t=e.dataStore,r=e.notificationStore,n=i.a.useState([]),o=Object(c.a)(n,2),s=o[0],u=o[1],f=i.a.useState(!1),b=Object(c.a)(f,2),d=b[0],p=b[1],h=i.a.useState(null),g=Object(c.a)(h,2),j=g[0],y=g[1],S=i.a.useState(s[0]),O=Object(c.a)(S,2),k=O[0],x=O[1],v=function(){var e=Object(L.a)(E.a.mark((function e(t){var r,a;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=function(){var e=Object(L.a)(E.a.mark((function e(t){var r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.next=3,ee.searchAlphaVantageByKeywords(t);case 3:r=e.sent,p(!1),r&&u(r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j&&clearTimeout(j),t){e.next=4;break}return e.abrupt("return");case 4:a=setTimeout(Object(L.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(t);case 2:case"end":return e.stop()}}),e)}))),500),y(a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(L.a)(E.a.mark((function e(a){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.doesSymbolExist(a.symbolTicker);case 2:e.sent?r.enqueueSnackbar({message:"Symbol: ".concat(a.symbolTicker," already part of portfolio"),options:{variant:"warning",autoHideDuration:2e3},key:"SYMBOL-DUPLICATE-".concat(a.symbolTicker)}):t.addSymbol(a);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)(ue.a,{id:"combo-box-demo",loading:d,value:k,onChange:function(e,t){x(""),t&&t.symbolTicker&&T(t)},options:s,filterOptions:fe,renderOption:function(e){return Object(a.jsxs)("div",{children:[Object(a.jsx)(m.a,{children:e.name}),Object(a.jsxs)(m.a,{variant:"caption",children:[e.symbolTicker," - ",e.region," - ",e.currency]})]})},renderInput:function(e){return Object(a.jsx)(ce.a,Object(l.a)(Object(l.a)({},e),{},{label:"Add Asset",variant:"outlined",onChange:function(e){return v(e.target.value)}}))},style:{minWidth:"250px"}})})),de=Object(b.a)((function(e){return{root:{display:"flex",justifyContent:"center",flexWrap:"wrap",listStyle:"none",padding:e.spacing(.5),margin:0},chip:{margin:e.spacing(.5)}}})),pe=Object(se.c)((function(e){var t=e.dataStore,r=e.notificationStore,n=de();return Object(a.jsx)(ie.a,{className:n.root,children:Object(a.jsxs)(ne.a,{container:!0,spacing:1,alignItems:"center",children:[Object(a.jsx)(ne.a,{item:!0,xs:8,children:Object(a.jsx)(ne.a,{container:!0,direction:"row",justify:"center",alignItems:"center",children:t.symbols.map((function(e){return Object(a.jsx)(oe.a,{label:e.symbolTicker,onClick:(r=e.symbolTicker,function(){t.toggleSymbolVisibility(r)}),onDelete:"Portfolio"!==e.symbolTicker&&function(){return r=e.symbolTicker,void t.removeSelectedSymbol(r);var r},className:n.chip,color:e.isVisible?"primary":"default",clickable:!0,style:{backgroundColor:e.isVisible?e.color:"#eeeeee"}},e.symbolTicker);var r}))})}),Object(a.jsx)(ne.a,{item:!0,xs:4,children:Object(a.jsx)(ne.a,{container:!0,direction:"row",justify:"center",alignItems:"center",children:Object(a.jsx)(be,{dataStore:t,notificationStore:r})})})]})})})),he=r(30),ge=r(32),je=r(73),ye=r(74),me=r(215),Se=r(216),Oe=r(238),ke=r(43),xe=r(101),ve=r(24),Te=r(233),we=Object(ke.c)((function(e){var t=e.dataStore;return Object(a.jsx)(ve.a,{utils:xe.a,children:Object(a.jsx)(Te.a,{disableToolbar:!0,variant:"inline",format:"yyyy-MM-DD",margin:"normal",id:"date-picker-starting-datet",label:"Starting date",value:t.portfolioStartingDate,onChange:function(e){t.setPortfolioStartingDate(e.format("YYYY-MM-DD"))},KeyboardButtonProps:{"aria-label":"change date"}})})}));function De(e){var t=e.dataStore,r=e.selectedChartStyleType,n=e.switchStyle,o=i.a.useState({checkedA:!0}),s=Object(c.a)(o,2),f=s[0],b=s[1];return Object(a.jsxs)(me.a,{row:!0,children:[Object(a.jsx)(we,{dataStore:t}),Object(a.jsx)(Se.a,{control:Object(a.jsx)(Oe.a,{checked:f.checkedA,onChange:function(e){b(Object(l.a)(Object(l.a)({},f),{},Object(u.a)({},e.target.name,e.target.checked))),n()},name:"checkedA"}),label:r})]})}var Pe=Object(se.c)((function(e){var t=e.dataStore,r=e.recalculateAndRenderPortfolio;return Object(n.useEffect)((function(){return Object(M.g)((function(){console.log("Trigger - TriggerRecalculatePortfolio"),t.triggerRecalculatePortfolio&&r(),t.setTriggerRecalculatePortfolio(!1)}))})),Object(a.jsx)("div",{})})),Ae=Object(se.c)((function(e){var t=e.dataStore,r=e.rerenderVisibleLines;return Object(n.useEffect)((function(){return Object(M.g)((function(){console.log("Trigger - TriggerShowVisibleLines"),t.triggerRerenderVisibleLines&&r(),t.setTriggerRerenderVisibleLines(!1)}))})),Object(a.jsx)("div",{})})),Ve=function(e){Object(ge.a)(r,e);var t=Object(je.a)(r);function r(e){var a;return Object(N.a)(this,r),(a=t.call(this,e)).state={data:[],selectedChartStyleType:"default"},a.myRef=i.a.createRef(),a.chart={},a.lineSeriesObj={},a.recalculateAndRenderPortfolio=a.recalculateAndRenderPortfolio.bind(Object(he.a)(a)),a.rerenderVisibleLines=a.rerenderVisibleLines.bind(Object(he.a)(a)),a.switchStyle=a.switchStyle.bind(Object(he.a)(a)),a.createGraphForSelectedSymbols=a.createGraphForSelectedSymbols.bind(Object(he.a)(a)),a.addLineSeriesData=a.addLineSeriesData.bind(Object(he.a)(a)),a}return Object(Y.a)(r,[{key:"componentDidMount",value:function(){var e=Object(L.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.renderChart(),this.createGraphForSelectedSymbols();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"renderChart",value:function(){this.myRef.current.firstChild&&(this.myRef.current.removeChild(this.myRef.current.firstChild),this.chart=null),this.chart=Object(ye.b)(this.myRef.current,Ce)}},{key:"recalculateAndRenderPortfolio",value:function(){var e=Object(L.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Z.calculateAndStoreHistoricPortfolioPerformance();case 2:this.addLineSeriesData(this.props.dataStore.getSymbolSetForTicker("Portfolio"));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"rerenderVisibleLines",value:function(){this.createGraphForSelectedSymbols()}},{key:"switchStyle",value:function(){console.log("switching style"),"default"===this.state.selectedChartStyleType?(this.setState({selectedChartStyleType:"percent"}),this.chart.applyOptions(Ie)):"percent"===this.state.selectedChartStyleType&&(this.setState({selectedChartStyleType:"default"}),this.chart.applyOptions(Ce))}},{key:"createGraphForSelectedSymbols",value:function(){var e=Object(L.a)(E.a.mark((function e(){var t,r,a,n,i,o,s=this;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(console.log("createGraphForSelectedSymbols"),t=this.props.dataStore.listOfSymbolTickers,r=0,a=Object.entries(this.lineSeriesObj);r<a.length;r++)n=Object(c.a)(a[r],2),i=n[0],o=n[1],t.includes(i)||(this.chart.removeSeries(o.series),delete this.lineSeriesObj[i]);this.props.dataStore.symbols.forEach((function(e){if(e.isVisible)s.addLineSeriesData(e);else if(s.lineSeriesObj[e.symbolTicker]&&s.lineSeriesObj[e.symbolTicker].series){var t=s.lineSeriesObj[e.symbolTicker].series;s.chart.removeSeries(t),delete s.lineSeriesObj[e.symbolTicker]}}));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addLineSeriesData",value:function(){var e=Object(L.a)(E.a.mark((function e(t){var r,a;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("addLineSeriesData: "+t.symbolTicker),e.next=3,Z.getDataChartFormatBySymbol(t.symbolTicker);case 3:r=e.sent,this.lineSeriesObj[t.symbolTicker]?r&&0!==r.length&&this.lineSeriesObj[t.symbolTicker].series.setData(r):(a=this.chart.addLineSeries({color:t.color}),r&&0!==r.length&&a.setData(r),this.lineSeriesObj[t.symbolTicker]={series:a,color:t.color});case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(a.jsxs)(ie.a,{style:{padding:"10px",marginTop:"10px"},children:[Object(a.jsx)(De,{refreshData:this.refreshData,switchStyle:this.switchStyle,selectedChartStyleType:"default"===this.state.selectedChartStyleType?"default":"percent",dataStore:this.props.dataStore}),Object(a.jsx)("div",{ref:this.myRef,id:"chart-ref"}),Object(a.jsx)(Pe,{dataStore:this.props.dataStore,recalculateAndRenderPortfolio:this.recalculateAndRenderPortfolio}),Object(a.jsx)(Ae,{dataStore:this.props.dataStore,rerenderVisibleLines:this.rerenderVisibleLines})]})}}]),r}(i.a.Component),Ce={height:300,rightPriceScale:{scaleMargins:{top:.1,bottom:.1},mode:ye.a.Normal,borderColor:"rgba(197, 203, 206, 0.4)"}},Ie={height:300,rightPriceScale:{scaleMargins:{top:.1,bottom:.1},mode:ye.a.Percentage,borderColor:"rgba(197, 203, 206, 0.4)"}},Be=r(217),Fe=r(218),Re=r(219),Ee=r(220),Le=r(221),Ne=r(222),Ye=r(223),Me=r(102),Ue=r.n(Me),_e=Object(b.a)({});var He=Object(ke.c)((function(e){var t=e.dataStore,r=_e();return Object(a.jsx)(Be.a,{component:ie.a,children:Object(a.jsxs)(Fe.a,{className:r.table,"aria-label":"simple table",size:"small",children:[Object(a.jsx)(Re.a,{children:Object(a.jsxs)(Ee.a,{children:[Object(a.jsx)(Le.a,{children:"Symbol"}),Object(a.jsx)(Le.a,{children:"Name"}),Object(a.jsxs)(Le.a,{align:"right",style:{display:"flex",alignItems:"center"},children:[Object(a.jsx)(Ne.a,{title:"Performance of each asset since the starting date of the portfolio",placement:"top",children:Object(a.jsx)(Ue.a,{fontSize:"small"})}),"Performance"]}),Object(a.jsx)(Le.a,{align:"right",style:{maxWidth:"80px"},children:"Value"})]})}),Object(a.jsxs)(Ye.a,{children:[t.symbols.map((function(e){return"Portfolio"!==e.symbolTicker?Object(a.jsxs)(Ee.a,{children:[Object(a.jsx)(Le.a,{component:"th",scope:"row",children:e.symbolTicker}),Object(a.jsx)(Le.a,{align:"left",children:e.name}),Object(a.jsx)(Le.a,{align:"right",children:(r=e.performanceSincePortfolioStart,(100*(parseFloat(r)-1)).toFixed(2)+"%")}),Object(a.jsx)(Le.a,{align:"right",children:Object(a.jsx)("input",{type:"text",value:e.value,onChange:function(r){return t.setValueForTicker(e.symbolTicker,r.target.value)},style:{maxWidth:"60px"}})})]},e.symbolTicker):null;var r})),Object(a.jsx)(Le.a,{}),Object(a.jsx)(Le.a,{}),Object(a.jsx)(Le.a,{}),Object(a.jsx)(Le.a,{align:"right",children:Object(a.jsxs)(m.a,{noWrap:!0,children:["Total: $",t.totalValueOfSymbols]})})]})]})})})),qe=function(e){var t=e.dataStore,r=e.notificationStore;return Object(a.jsx)("div",{children:Object(a.jsxs)(ne.a,{container:!0,spacing:3,children:[Object(a.jsx)(ne.a,{item:!0,xs:12,children:Object(a.jsx)(pe,{dataStore:t,notificationStore:r})}),Object(a.jsx)(ne.a,{item:!0,xs:12,children:Object(a.jsx)(Ve,{dataStore:t})}),Object(a.jsx)(ne.a,{item:!0,xs:12,children:Object(a.jsx)(He,{dataStore:t})})]})})},Ge=r(224),Ke=function(e){var t=e.configStore;return Object(a.jsx)("div",{children:Object(a.jsxs)(ie.a,{elevation:1,style:{padding:"20px"},children:[Object(a.jsx)(m.a,{variant:"h1",gutterBottom:!0,children:"Settings"}),Object(a.jsx)(m.a,{variant:"h6",gutterBottom:!0,children:"Alpha Vantag API Token"}),Object(a.jsx)(ce.a,{id:"outlined-basic",label:"API-Token",variant:"outlined",defaultValue:t.alphaVantage.apiToken,onChange:function(e){return t.setAlphaVantageAPITokenIDB(e.target.value)}}),Object(a.jsxs)(m.a,{variant:"caption",display:"block",gutterBottom:!0,children:["Get your free token here:"," ",Object(a.jsx)(Ge.a,{href:"https://www.alphavantage.co/support/#api-key",target:"_blank",rel:"noreferrer",children:"Alpha Vantage"})," ","(Hint: try a random key)"]})]})})},ze=r(39),We=r(72),Je=function(e){Object(ge.a)(r,e);var t=Object(je.a)(r);function r(){var e;Object(N.a)(this,r);for(var a=arguments.length,n=new Array(a),i=0;i<a;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).displayed=[],e.storeDisplayed=function(t){e.displayed=[].concat(Object(ze.a)(e.displayed),[t])},e}return Object(Y.a)(r,[{key:"removeDisplayedNotificationByKey",value:function(e){this.displayed=this.displayed.filter((function(t){return e!==t}))}},{key:"componentDidMount",value:function(){var e=this;Object(M.g)((function(){var t=e.props.notificationStore.notifications;(void 0===t?[]:t).forEach((function(t){if(!e.displayed.includes(t.key)){e.props.enqueueSnackbar(t.message,t.options),e.storeDisplayed(t.key),e.props.notificationStore.removeSnackbar(t.key);var r=0;r=t.options&&t.options.autoHideDuration?t.options.autoHideDuration+100:2100,setTimeout(function(){this.removeDisplayedNotificationByKey(t.key)}.bind(e),r)}}))}))}},{key:"render",value:function(){return null}}]),r}(n.Component),Xe=Object(We.b)(Object(ke.b)("notificationStore")(Object(ke.c)(Je))),$e=240,Qe=Object(b.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:$e,width:"calc(100% - ".concat($e,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},hide:{display:"none"},drawer:{width:$e,flexShrink:0,whiteSpace:"nowrap"},drawerOpen:{width:$e,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerClose:Object(u.a)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:e.spacing(7)+1},e.breakpoints.up("sm"),{width:e.spacing(9)+1}),toolbar:Object(l.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:e.spacing(0,1)},e.mixins.toolbar),content:{flexGrow:1,padding:e.spacing(3)}}}));var Ze=function(){var e,t,r=Qe(),n=Object(d.a)(),o=i.a.useState(!1),s=Object(c.a)(o,2),l=s[0],b=s[1],k=i.a.useState({chartingPage:{showPage:!0},settingsPage:{showPage:!1}}),v=Object(c.a)(k,2),w=v[0],C=v[1],B=function(e){for(var t={},r=0,a=Object.entries(w);r<a.length;r++){var n=Object(c.a)(a[r],1)[0];t[n]=n===e?{showPage:!0}:{showPage:!1}}C(t)};return Object(a.jsxs)("div",{className:r.root,children:[Object(a.jsx)(Xe,{notificationStore:W}),Object(a.jsx)(y.a,{}),Object(a.jsx)(h.a,{position:"fixed",className:Object(f.a)(r.appBar,Object(u.a)({},r.appBarShift,l)),children:Object(a.jsxs)(g.a,{children:[Object(a.jsx)(O.a,{color:"inherit","aria-label":"open drawer",onClick:function(){b(!0)},edge:"start",className:Object(f.a)(r.menuButton,Object(u.a)({},r.hide,l)),children:Object(a.jsx)(x.a,{})}),Object(a.jsx)(m.a,{variant:"h6",noWrap:!0,children:"Historic-Portfolio-Analyzer"})]})}),Object(a.jsxs)(p.a,{variant:"permanent",className:Object(f.a)(r.drawer,(e={},Object(u.a)(e,r.drawerOpen,l),Object(u.a)(e,r.drawerClose,!l),e)),classes:{paper:Object(f.a)((t={},Object(u.a)(t,r.drawerOpen,l),Object(u.a)(t,r.drawerClose,!l),t))},children:[Object(a.jsx)("div",{className:r.toolbar,children:Object(a.jsx)(O.a,{onClick:function(){b(!1)},children:"rtl"===n.direction?Object(a.jsx)(D.a,{}):Object(a.jsx)(T.a,{})})}),Object(a.jsx)(S.a,{}),Object(a.jsx)(j.a,{children:Object(a.jsxs)(P.a,{button:!0,onClick:function(){return B("chartingPage")},children:[Object(a.jsx)(A.a,{children:Object(a.jsx)(I.a,{})}),Object(a.jsx)(V.a,{primary:"Chart"})]},"charting-page")}),Object(a.jsx)(S.a,{}),Object(a.jsx)(j.a,{children:Object(a.jsxs)(P.a,{button:!0,onClick:function(){return B("settingsPage")},children:[Object(a.jsx)(A.a,{children:Object(a.jsx)(F.a,{})}),Object(a.jsx)(V.a,{primary:"Settings"})]},"serttings-page")})]}),Object(a.jsxs)("main",{className:r.content,children:[Object(a.jsx)("div",{className:r.toolbar}),w.chartingPage.showPage?Object(a.jsx)(qe,{dataStore:ae,notificationStore:W}):null,w.settingsPage.showPage?Object(a.jsx)(Ke,{configStore:X}):null]})]})},et=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,239)).then((function(t){var r=t.getCLS,a=t.getFID,n=t.getFCP,i=t.getLCP,o=t.getTTFB;r(e),a(e),n(e),i(e),o(e)}))};s.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(ke.a,{notificationStore:W,children:Object(a.jsx)(We.a,{maxSnack:10,children:Object(a.jsx)(Ze,{})})})}),document.getElementById("root")),et()}},[[160,1,2]]]);
//# sourceMappingURL=main.370e90e5.chunk.js.map