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
    <TableContainer component={Paper}>
      <Table>
        {(hasData || isLoading) && (
          <TableHead>
            <TableRow>
              {columns.map(({ key, header }) => (
                <TableCell key={key.toString()}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {isLoading ? (
            <BaseTableSkeleton />
          ) : hasData ? (
            rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map(({ key, render }) => (
                  <TableCell key={`${row.id}-${key.toString()}`}>
                    {render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <BaseEmptyState />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
