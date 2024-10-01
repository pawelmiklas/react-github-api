import { TableCell, TableRow, Skeleton } from "@mui/material";

interface BaseTableSkeletonProps {
  rows?: number;
}

export const BaseTableSkeleton = ({ rows = 5 }: BaseTableSkeletonProps) =>
  Array.from(new Array(rows)).map((_, index) => (
    <TableRow key={index} data-testid={`skeleton-row-${index}`}>
      <TableCell data-testid={`skeleton-cell-circular-${index}`}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          data-testid={`skeleton-circular-${index}`}
        />
      </TableCell>
      <TableCell data-testid={`skeleton-cell-text-${index}`}>
        <Skeleton
          variant="text"
          width={150}
          data-testid={`skeleton-text-${index}`}
        />
      </TableCell>
    </TableRow>
  ));
