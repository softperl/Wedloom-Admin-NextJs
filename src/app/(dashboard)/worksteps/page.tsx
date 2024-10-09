"use client";
import React, { useEffect, useState } from "react";

import FormValidationBasic from "./FormValidationBasic";
import Grid from "@mui/material/Grid";
import UserListTable from "./UserListTable";
import { getSteps } from "@/lib/api";
import useUi from "@/lib/hooks/useUi";

export default function page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { refreash } = useUi();

  const fetchData = async () => {
    try {
      const { data } = await getSteps();
      setData(data[0]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreash]);

  console.log("fetchData", data);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormValidationBasic />
      </Grid>
      <Grid item xs={12}>
        <UserListTable tableData={data || []} />
      </Grid>
    </Grid>
  );
}
