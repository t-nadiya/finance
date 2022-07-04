import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socket, connect } from "../service"

export const getTickers = createAsyncThunk(
  "tickers/getTickers",
  async (_, { dispatch }) => {
    // socket.on("connect", () => {
    //   socket.emit("start");
    // });
    connect();
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
  },
  extraReducers: {
    [getTickers.fulfilled]: (state, action) => {
      state.tickers = action.payload;
    },
  },
});
export const { setData, displayCard } = tickerSlice.actions;

export default tickerSlice.reducer;
