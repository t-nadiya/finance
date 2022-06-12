import { render, screen } from "./test-utils";
import App from "./App";

it("rendered page", () => {
  render(<App />);
  const text = screen.getByText("Watchlist");
  expect(text).toBeInTheDocument();
});
