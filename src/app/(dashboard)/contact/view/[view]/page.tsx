import Grid from "@mui/material/Grid";
import React from "react";
import UserDetails from "./UserDetails";
import UserRight from "./UserRight";

export default function page({
  params,
}: {
  params: {
    view: string;
  };
}) {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <UserDetails />
      </Grid>
      <Grid item xs={12} md={8}>
        <UserRight />
      </Grid>
    </Grid>
  );
}
