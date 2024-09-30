import { TableCell, TableRow, Skeleton } from "@mui/material";

interface BaseTableSkeletonProps {
  rows?: number;
}

export const BaseTableSkeleton = ({ rows = 5 }: BaseTableSkeletonProps) =>
  Array.from(new Array(rows)).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton variant="circular" width={40} height={40} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={150} />
      </TableCell>
    </TableRow>
  ));
