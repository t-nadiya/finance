import { render, screen } from "../../test-utils";
import Card from "./Card";
import { Button } from "@material-ui/core";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

describe("Card Component Test", () => {
  it("rendered card", () => {
    render(<Card />);
    const paper = screen.getByTestId("card");
    expect(paper).toBeTruthy();
  });
  it("rendered button", () => {
    render(<Button data-testid="button" />);
    const button = screen.getByTestId("button");
    expect(button).toBeTruthy();
  });
  it("event fired", () => {
    act(() => {
      const removeTicker = jest.fn();
      render(<Button data-testid="button" func="removeTicker" />);
      const button = screen.getByTestId("button");
      fireEvent.click(button);
      removeTicker();
      expect(removeTicker).toHaveBeenCalled();
    });
  });
});
