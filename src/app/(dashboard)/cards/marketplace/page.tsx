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
              userName: "Shipon",
              email: "test@gmail.com",
              cardName: "Weeding",
              price: "89PKR",
              createdAt: "24 JUN 2024",
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
