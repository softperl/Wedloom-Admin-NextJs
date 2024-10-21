"use client";

// React Imports
import { useMemo, useState } from "react";

// Next Imports
import Link from "next/link";

// MUI Imports
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Third-party Imports
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { rankItem } from "@tanstack/match-sorter-utils";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classnames from "classnames";

import Button from "@mui/material/Button";

import type { UsersType } from "@/types/apps/userTypes";
import type { ThemeColor } from "@core/types";

// Component Imports
import TablePaginationComponent from "@components/TablePaginationComponent";
import CustomAvatar from "@core/components/mui/Avatar";
import OptionMenu from "@core/components/option-menu";

// Util Imports
import { getInitials } from "@/utils/getInitials";

// Style Imports
import tableStyles from "@core/styles/table.module.css";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
export type BlogsType = {
  id: string;
  des: string;
};

type UsersTypeWithAction = BlogsType & {
  action?: string;
};

type UserRoleType = {
  [key: string]: { icon: string; color: string };
};

type UserStatusType = {
  [key: string]: ThemeColor;
};

// Styled Components
const Icon = styled("i")({});

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Vars
const userRoleObj: UserRoleType = {
  admin: { icon: "tabler-crown", color: "error" },
  author: { icon: "tabler-device-desktop", color: "warning" },
  editor: { icon: "tabler-edit", color: "info" },
  maintainer: { icon: "tabler-chart-pie", color: "success" },
  subscriber: { icon: "tabler-user", color: "primary" },
};

const userStatusObj: UserStatusType = {
  published: "success",
  draft: "secondary",
};

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>();

const UserListTable = ({ tableData }: { tableData?: any[] }) => {
  // States
  const [rowSelection, setRowSelection] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[tableData]);
  const [globalFilter, setGlobalFilter] = useState("");

  console.log("table", data);

  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <Typography
                color="text.primary"
                className="font-medium capitalize">
                {row.index + 1}
              </Typography>
            </div>
          </div>
        ),
      }),

      columnHelper.accessor("id", {
        header: "Id",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <Typography
                  color="text.primary"
                  className="font-medium capitalize">
                  {row.original.id}
                </Typography>
              </div>
            </div>
          );
        },
      }),

      columnHelper.accessor("action", {
        header: "Action",
        cell: () => (
          <div className="flex items-center">
            <IconButton>
              <Link href={"/"} className="flex">
                <i className="tabler-eye text-[22px] text-textSecondary" />
              </Link>
            </IconButton>
            <OptionMenu
              iconClassName="text-[22px] text-textSecondary"
              options={[
                {
                  text: "Edit",
                  icon: "tabler-edit text-[22px]",
                  menuItemProps: {
                    className: "flex items-center gap-2 text-textSecondary",
                  },
                },
                {
                  text: "Delete",
                  icon: "tabler-trash text-[22px]",
                  menuItemProps: {
                    className: "flex items-center gap-2 text-textSecondary",
                  },
                },
              ]}
            />
          </div>
        ),
        enableSorting: false,
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useReactTable({
    data: data as BlogsType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  const getAvatar = (params: any) => {
    const { avatar, fullName } = params;

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />;
    } else {
      return (
        <CustomAvatar size={34}>{getInitials(fullName as string)}</CustomAvatar>
      );
    }
  };

  return (
    <>
      <Card>
        <div className="overflow-x-auto">
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              "flex items-center": header.column.getIsSorted(),
                              "cursor-pointer select-none":
                                header.column.getCanSort(),
                            })}
                            onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <i className="tabler-chevron-up text-xl" />,
                              desc: (
                                <i className="tabler-chevron-down text-xl" />
                              ),
                            }[header.column.getIsSorted() as "asc" | "desc"] ??
                              null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={table.getVisibleFlatColumns().length}
                    className="text-center">
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map((row) => {
                    return (
                      <tr
                        key={row.id}
                        className={classnames({
                          selected: row.getIsSelected(),
                        })}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page);
          }}
        />
      </Card>
    </>
  );
};

export default UserListTable;
