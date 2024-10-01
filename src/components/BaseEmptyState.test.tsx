import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BaseEmptyState } from "./BaseEmptyState";

describe("BaseEmptyState", () => {
  it("Given default props, When rendered, Then displays default title, message, and icon", () => {
    // Given + When
    render(<BaseEmptyState />);

    // Then
    expect(screen.getByTestId("base-empty-state-title").textContent).toBe(
      "No Data Found"
    );
    expect(screen.getByTestId("base-empty-state-message").textContent).toBe(
      "We couldn't find any data to display at the moment."
    );
    expect(screen.getByTestId("base-empty-state-icon")).toBeDefined();
  });

  it("Given custom props, When rendered, Then displays custom title and message", () => {
    // Given
    const customTitle = "Custom Title";
    const customMessage = "Custom message";

    // When
    render(<BaseEmptyState title={customTitle} message={customMessage} />);

    // Then
    expect(screen.getByTestId("base-empty-state-title").textContent).toBe(
      customTitle
    );
    expect(screen.getByTestId("base-empty-state-message").textContent).toBe(
      customMessage
    );
  });
});
