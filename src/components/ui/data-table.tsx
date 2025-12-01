"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    headerClassName?: string;
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  meta,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle server-side pagination URL updates
  const handlePageChange = (page: number) => {
    if (meta) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    pageCount: meta 
      ? (meta.totalPages ?? Math.ceil(meta.total / meta.limit)) 
      : undefined,
    state: {
      sorting,
      ...(meta && {
        pagination: {
          pageIndex: meta.page - 1,
          pageSize: meta.limit,
        },
      }),
    },
    manualPagination: !!meta,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize },
    },
  });

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={header.column.columnDef.meta?.headerClassName}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "flex items-center gap-1 cursor-pointer select-none hover:text-foreground"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="ml-1">
                              {header.column.getIsSorted() === "asc" && (
                                <ArrowUp className="h-3 w-3" />
                              )}
                              {header.column.getIsSorted() === "desc" && (
                                <ArrowDown className="h-3 w-3" />
                              )}
                              {!header.column.getIsSorted() && (
                                <ArrowUpDown className="h-3 w-3 opacity-50" />
                              )}
                            </span>
                          )}
                        </div>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {meta ? (
            <>
              Showing {(meta.page - 1) * meta.limit + 1} to{" "}
              {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}{" "}
              entries
            </>
          ) : (
            <>
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </>
          )}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  if (meta) {
                    if (meta.page > 1) handlePageChange(meta.page - 1);
                  } else {
                    table.previousPage();
                  }
                }}
                className={cn(
                  "rounded-full cursor-pointer",
                  !table.getCanPreviousPage() &&
                    "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>

            {(() => {
              const currentPage = table.getState().pagination.pageIndex + 1;
              const totalPages = table.getPageCount();
              const pages: (number | string)[] = [];

              if (totalPages <= 5) {
                // Show all pages if 5 or less
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // Always show first page
                pages.push(1);

                if (currentPage > 3) {
                  pages.push("...");
                }

                // Show pages around current page
                for (
                  let i = Math.max(2, currentPage - 1);
                  i <= Math.min(totalPages - 1, currentPage + 1);
                  i++
                ) {
                  pages.push(i);
                }

                if (currentPage < totalPages - 2) {
                  pages.push("...");
                }

                // Always show last page
                pages.push(totalPages);
              }

              return pages.map((page, idx) => {
                if (page === "...") {
                  return (
                    <PaginationItem key={`ellipsis-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                const pageNum = page as number;
                const isActive = pageNum === currentPage;

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={(e) => {
                        e.preventDefault();
                        if (meta) {
                          handlePageChange(pageNum);
                        } else {
                          table.setPageIndex(pageNum - 1);
                        }
                      }}
                      isActive={isActive}
                      className="rounded-full cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              });
            })()}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (meta) {
                    const totalPages = meta.totalPages ?? Math.ceil(meta.total / meta.limit);
                    if (meta.page < totalPages)
                      handlePageChange(meta.page + 1);
                  } else {
                    table.nextPage();
                  }
                }}
                className={cn(
                  "rounded-full cursor-pointer",
                  !table.getCanNextPage() && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
