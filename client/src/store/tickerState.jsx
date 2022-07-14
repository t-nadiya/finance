import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000");

export const getTickers = createAsyncThunk(
  "tickers/getTickers",
  async (_, { dispatch }) => {
    socket.on("connect", () => {
      socket.emit("start");
    });
    socket.on("ticker", (data) => {
      dispatch(setData(data.allTickers));
      dispatch(displayCard(data.displayTickers));
    });
  }
);

export const tickerSlice = createSlice({
  name: "tickers",
  initialState: {
    tickers: [],
    tickersToDisplay: [],
  },
  reducers: {
    setData: (state, action) => {
      state.tickers = action.payload;
    },
    displayCard: (state, action) => {
      state.tickersToDisplay = action.payload;
    },
    displayTicker: (state, action) => {
      socket.emit("display", action.payload);
    },
    removeTicker(state, action) {
      socket.emit("remove", action.payload);
    },
  },
  extraReducers: {
    [getTickers.fulfilled]: (state, action) => {
      state.tickers = action.payload;
    },
  },
});
export const { setData, displayCard, displayTicker, removeTicker } =
  tickerSlice.actions;

export default tickerSlice.reducer;
