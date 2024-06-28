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
              id: "1",
              fullName: "shipon",
              subject: "bug",
              email: "abs@gmail.com",
              createdAt: "28 Jun 2024",
              queryType: "User",
              message: "lorem text lorem text lorem text lorem text lorem text",
              status: "Resolved",
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
