import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { BaseTableSkeleton } from "./BaseTableSkeleton";
import { BaseEmptyState } from "./BaseEmptyState";

export interface Column<T> {
  key: keyof T;
  header: string;
  render: (row: T) => React.ReactNode;
}

interface BaseTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  isLoading?: boolean;
}

export const BaseTable = <T extends { id: string | number }>({
  columns,
  rows,
  isLoading = false,
}: BaseTableProps<T>) => {
  const hasData = rows.length > 0;

  return (
    <TableContainer component={Paper} data-testid="base-table-container">
      <Table data-testid="base-table">
        {(hasData || isLoading) && (
          <TableHead data-testid="base-table-head">
            <TableRow>
              {columns.map(({ key, header }) => (
                <TableCell
                  key={key.toString()}
                  data-testid={`header-cell-${key.toString()}`}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody data-testid="base-table-body">
          {isLoading ? (
            <BaseTableSkeleton data-testid="base-table-skeleton" />
          ) : hasData ? (
            rows.map((row) => (
              <TableRow key={row.id} data-testid={`row-${row.id}`}>
                {columns.map(({ key, render }) => (
                  <TableCell
                    key={`${row.id}-${key.toString()}`}
                    data-testid={`cell-${row.id}-${key.toString()}`}
                  >
                    {render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow data-testid="empty-state-row">
              <TableCell>
                <BaseEmptyState data-testid="base-empty-state" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
