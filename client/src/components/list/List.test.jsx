import { render, screen } from "../../test-utils";
import List from "./List";
import { Button } from "@material-ui/core";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

describe("List Component Test", () => {
  it("rendered smallCard", () => {
    render(<List />);
    const paper = screen.getByTestId("smallCard");
    expect(paper).toBeTruthy();
  });
  it("rendered button", () => {
    render(<Button data-testid="button" />);
    const button = screen.getByTestId("button");
    expect(button).toBeTruthy();
  });
  it("event fired", () => {
    act(() => {
      const displayTicker = jest.fn();
      render(<Button data-testid="button" func="displayTicker" />);
      const button = screen.getByTestId("button");
      fireEvent.click(button);
      displayTicker();
      expect(displayTicker).toHaveBeenCalled();
    });
  });
});
