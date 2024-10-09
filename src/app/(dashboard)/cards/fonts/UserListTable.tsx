"use client";

// React Imports
import { useEffect, useMemo, useState } from "react";

// Next Imports
import { useParams } from "next/navigation";

// MUI Imports
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TablePagination from "@mui/material/TablePagination";
import type { TextFieldProps } from "@mui/material/TextField";
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

// Type Imports
import type { ThemeColor } from "@core/types";

// Component Imports
import TablePaginationComponent from "@components/TablePaginationComponent";
import CustomTextField from "@core/components/mui/TextField";
import OptionMenu from "@core/components/option-menu";
import TableFilters from "./TableFilters";

// Style Imports
import tableStyles from "@core/styles/table.module.css";
import { formatDate } from "date-fns/format";
import PermissionDialog from "@/components/dialogs/PermissionDialog";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import { cn } from "@/lib/utils";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export type UsersType = {
  id?: string;
  fontName: string;
  fontType: "Normal" | "Italic" | "Bold";
  createdAt: string;
  status: "Active" | "Inactive";
};

type UsersTypeWithAction = UsersType & {
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

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<TextFieldProps, "onChange">) => {
  // States
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
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
  Active: "success",
  Inactive: "warning",
};

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>();

const UserListTable = ({ tableData }: { tableData?: UsersType[] }) => {
  // States

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[tableData]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Hooks
  const { lang: locale } = useParams();

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
      columnHelper.accessor("fontName", {
        header: "Font Name",
        cell: ({ row }) => <Typography>{row.original.fontName}</Typography>,
      }),
      columnHelper.accessor("fontType", {
        header: "Font Type",
        cell: ({ row }) => <Typography>{row.original.fontType}</Typography>,
      }),
      columnHelper.accessor("createdAt", {
        header: "Upload Date",
        cell: ({ row }) => (
          <Typography>
            {formatDate(row.original.createdAt, "ii MMM y")}
          </Typography>
        ),
      }),

      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Chip
              variant="tonal"
              className="capitalize"
              label={row.original.status}
              color={userStatusObj[row.original.status]}
              size="small"
            />
          </div>
        ),
      }),
      columnHelper.accessor("action", {
        header: "Action",
        cell: ({ row }) => {
          const [open, setOpen] = useState(false);
          const [editValue, setEditValue] = useState<string>("");
          return (
            <>
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
                      text:
                        row.original.status === "Inactive"
                          ? "Active"
                          : "Inactive",
                      icon: cn(
                        "text-[22px]",
                        row.original.status === "Inactive"
                          ? "tabler-alert-circle"
                          : "tabler-alert-circle-off"
                      ),
                      menuItemProps: {
                        className: "flex items-center gap-2 text-textSecondary",
                      },
                    },
                    {
                      text: "Delete",
                      icon: "tabler-trash text-[22px] text-textSecondary",
                      menuItemProps: {
                        className: "flex items-center gap-2 text-textSecondary",
                        onClick: () => setOpen(true),
                      },
                    },
                  ]}
                />
              </div>
              <PermissionDialog
                open={open}
                setOpen={setOpen}
                data={editValue}
              />
            </>
          );
        },
        enableSorting: false,
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useReactTable({
    data: data as UsersType[],
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

  return (
    <>
      <Card>
        <CardHeader title="Cards" className="pbe-4" />

        <TableFilters setData={setData} tableData={tableData} />
        <div className="flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4">
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="is-[70px]">
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="25">25</MenuItem>
            <MenuItem value="50">50</MenuItem>
          </CustomTextField>
          <div className="flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search User"
              className="is-full sm:is-auto"
            />
            <Button
              color="secondary"
              variant="tonal"
              startIcon={<i className="tabler-upload" />}
              className="is-full sm:is-auto">
              Export
            </Button>
            <Link href={"/cards/fonts/new"}>
              <Button
                variant="contained"
                startIcon={<i className="tabler-plus" />}
                className="is-full sm:is-auto">
                Add New Fonts
              </Button>
            </Link>
          </div>
        </div>
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
