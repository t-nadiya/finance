import { configureStore } from "@reduxjs/toolkit";
import tickerSlice from "./tickerState";

const store = configureStore({
  reducer: {
    tickers: tickerSlice,
  },
});

export default store;
