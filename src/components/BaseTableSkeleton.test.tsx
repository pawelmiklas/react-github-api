import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BaseTableSkeleton } from "./BaseTableSkeleton";

describe("BaseTableSkeleton", () => {
  it("Given default props, When rendered, Then displays 5 skeleton rows", () => {
    // When
    render(<BaseTableSkeleton />);

    // Then
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`skeleton-row-${i}`)).toBeDefined();
      expect(screen.getByTestId(`skeleton-cell-circular-${i}`)).toBeDefined();
      expect(screen.getByTestId(`skeleton-circular-${i}`)).toBeDefined();
      expect(screen.getByTestId(`skeleton-cell-text-${i}`)).toBeDefined();
      expect(screen.getByTestId(`skeleton-text-${i}`)).toBeDefined();
    }
    expect(screen.queryByTestId("skeleton-row-5")).toBeNull();
  });

  it("Given custom row count, When rendered, Then displays correct number of skeleton rows", () => {
    // Given
    const customRowCount = 3;

    // When
    render(<BaseTableSkeleton rows={customRowCount} />);

    // Then
    for (let i = 0; i < customRowCount; i++) {
      expect(screen.getByTestId(`skeleton-row-${i}`)).toBeDefined();
      expect(screen.getByTestId(`skeleton-cell-circular-${i}`)).toBeDefined();
      expect(screen.getByTestId(`skeleton-circular-${i}`)).toBeDefined();
      expect(screen.getByTestId(`skeleton-cell-text-${i}`)).toBeDefined();
      expect(screen.getByTestId(`skeleton-text-${i}`)).toBeDefined();
    }
    expect(screen.queryByTestId(`skeleton-row-${customRowCount}`)).toBeNull();
  });
});
