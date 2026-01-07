"use client";

import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isError: boolean;
  isLoading: boolean;
}

export function DataTable<TData, Tvalue>({
  data,
  columns,
  isError,
  isLoading,
}: DataTableProps<TData, Tvalue>) {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnPinning: {
        right: ["action_buttons"],
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative h-full overflow-x-auto rounded-md">
      <Table className="table-auto">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isPinned = header.column.getIsPinned();

                return (
                  <TableHead
                    key={header.id}
                    style={{
                      left:
                        isPinned === "left"
                          ? header.column.getStart("left")
                          : undefined,
                      right:
                        isPinned === "right"
                          ? header.column.getAfter("right")
                          : undefined,
                      minWidth: header.column.columnDef.minSize ?? 16,
                      maxWidth: header.column.columnDef.maxSize ?? 200,
                      width: header.column.columnDef.size ?? "auto",
                    }}
                    className={cn(
                      isPinned ? 30 : 0,
                      isPinned ? "bg-background sticky" : "relative",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const isPinned = cell.column.getIsPinned();

                  return (
                    <TableCell
                      key={cell.id}
                      style={{
                        left:
                          isPinned === "left"
                            ? cell.column.getStart("left")
                            : undefined,
                        right:
                          isPinned === "right"
                            ? cell.column.getAfter("right")
                            : undefined,
                        minWidth: cell.column.columnDef.minSize ?? 16,
                        maxWidth: cell.column.columnDef.maxSize ?? 200,
                        width: cell.column.columnDef.size ?? "auto",
                      }}
                      className={cn(
                        isPinned ? 20 : 0,
                        "overflow-hidden text-nowrap text-ellipsis",
                        isPinned
                          ? "from-background via-background sticky bg-linear-to-l to-transparent"
                          : "relative",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
