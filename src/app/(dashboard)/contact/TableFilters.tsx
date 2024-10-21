// React Imports
import { useState, useEffect, forwardRef, SyntheticEvent } from "react";

// MUI Imports
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";

// Type Imports
import type { UsersType } from "@/types/apps/userTypes";

// Component Imports
import CustomTextField from "@core/components/mui/TextField";
import AppReactDatepicker from "@/libs/styles/AppReactDatepicker";
import { TextFieldProps } from "@mui/material/TextField";
import { formatDate } from "date-fns/format";

type CustomInputProps = TextFieldProps & {
  label?: string;
  end: Date | number;
  start: Date | number;
};

const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  // Vars
  const startDate =
    props.start !== null ? formatDate(props.start, "MM/dd/yyyy") : "";
  const endDate =
    props.end !== null ? ` - ${formatDate(props.end, "MM/dd/yyyy")}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ""}`;

  return (
    <CustomTextField
      fullWidth
      inputRef={ref}
      label={props.label || ""}
      {...props}
      value={value}
    />
  );
});

const TableFilters = ({
  setData,
  tableData,
}: {
  setData: any;
  tableData?: any;
}) => {
  // States
  const [role, setRole] = useState<UsersType["role"]>("");
  const [plan, setPlan] = useState<UsersType["currentPlan"]>("");
  const [status, setStatus] = useState<UsersType["status"]>("");
  const [startDate, setStartDate] = useState<Date | undefined | null>(null);
  const [endDate, setEndDate] = useState<Date | undefined | null>(null);

  useEffect(() => {
    const filteredData = tableData?.filter((user: any) => {
      if (role && user.role !== role) return false;
      if (plan && user.currentPlan !== plan) return false;
      if (status && user.status !== status) return false;

      return true;
    });

    setData(filteredData);
  }, [role, plan, status, tableData, setData]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDateChange = (
    dates: [Date | null, Date | null],
    event: SyntheticEvent<any, Event> | undefined
  ) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <AppReactDatepicker
            selectsRange
            endDate={endDate}
            selected={startDate}
            startDate={startDate}
            id="date-range-picker"
            placeholderText="Date"
            onChange={handleDateChange}
            shouldCloseOnSelect={false}
            customInput={
              <CustomInput
                start={startDate as Date | number}
                end={endDate as Date | number}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id="select-plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            SelectProps={{ displayEmpty: true }}>
            <MenuItem value="">Type</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Vendor">Vendor</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id="select-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}>
            <MenuItem value="">Status</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TableFilters;
