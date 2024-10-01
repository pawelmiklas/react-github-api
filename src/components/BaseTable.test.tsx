import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BaseTable, Column } from "./BaseTable";

interface TestData {
  id: number;
  name: string;
  age: number;
}

const testColumns: Column<TestData>[] = [
  { key: "name", header: "Name", render: (row) => row.name },
  { key: "age", header: "Age", render: (row) => row.age.toString() },
];

const testData: TestData[] = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
];

describe("BaseTable", () => {
  it("Given data and columns, When rendered, Then displays table with correct headers and data", () => {
    // Given
    const props = { columns: testColumns, rows: testData };

    // When
    render(<BaseTable {...props} />);

    // Then
    expect(screen.getByTestId("base-table-container")).toBeDefined();
    expect(screen.getByTestId("base-table")).toBeDefined();
    expect(screen.getByTestId("base-table-head")).toBeDefined();
    expect(screen.getByTestId("header-cell-name").textContent).toBe("Name");
    expect(screen.getByTestId("header-cell-age").textContent).toBe("Age");
    expect(screen.getByTestId("row-1")).toBeDefined();
    expect(screen.getByTestId("cell-1-name").textContent).toBe("John Doe");
    expect(screen.getByTestId("cell-1-age").textContent).toBe("30");
    expect(screen.getByTestId("row-2")).toBeDefined();
    expect(screen.getByTestId("cell-2-name").textContent).toBe("Jane Smith");
    expect(screen.getByTestId("cell-2-age").textContent).toBe("25");
  });

  it("Given empty data, When rendered, Then displays BaseEmptyState", () => {
    // Given
    const props = { columns: testColumns, rows: [], isLoading: false };

    // When
    render(<BaseTable {...props} />);

    // Then
    expect(screen.getByTestId("base-table")).toBeDefined();
    expect(screen.getByTestId("empty-state-row")).toBeDefined();
  });

  it("Given isLoading prop, When rendered, Then displays table with headers but no data", () => {
    // Given
    const props = { columns: testColumns, rows: [], isLoading: true };

    // When
    render(<BaseTable {...props} />);

    // Then
    expect(screen.getByTestId("base-table")).toBeDefined();
    expect(screen.getByTestId("base-table-head")).toBeDefined();
    expect(screen.getByTestId("header-cell-name").textContent).toBe("Name");
    expect(screen.getByTestId("header-cell-age").textContent).toBe("Age");
    expect(screen.getByTestId("skeleton-row-1")).toBeDefined();
    expect(screen.queryByTestId("base-empty-state")).toBeNull();
  });

  it("Given data and isLoading false, When rendered, Then displays table with data", () => {
    // Given
    const props = { columns: testColumns, rows: testData, isLoading: false };

    // When
    render(<BaseTable {...props} />);

    // Then
    expect(screen.getByTestId("base-table")).toBeDefined();
    expect(screen.getByTestId("row-1")).toBeDefined();
    expect(screen.getByTestId("cell-1-name").textContent).toBe("John Doe");
    expect(screen.getByTestId("cell-1-age").textContent).toBe("30");
    expect(screen.queryByTestId("base-table-skeleton")).toBeNull();
    expect(screen.queryByTestId("base-empty-state")).toBeNull();
  });
});
