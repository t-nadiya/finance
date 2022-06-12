import store from "./index";

it("Initial tickers state is an empty array", () => {
  const state = store.getState().tickers;
  expect(state.tickers).toEqual([]);
});
