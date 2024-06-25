import Grid from "@mui/material/Grid";
import React from "react";
import UserListCards from "./UserListCards";
import UserListTable from "./UserListTable";

export default function page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <UserListTable
          tableData={[
            {
              id: "66",
              package: "Standard",
              packageType: "Yearly",
              amount: "8249",
              createdAt: "12 Jun 2024",
              status: "Active",
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
