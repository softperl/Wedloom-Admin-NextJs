"use client";

import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import UserListCards from "./UserListCards";
import UserListTable from "./UserListTable";
import { getPlans } from "@/lib/api";
import useUi from "@/lib/hooks/useUi";

export default function page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { refreash } = useUi();

  const fetchData = async () => {
    setError(null);
    try {
      const { data } = await getPlans();
      setData(data.plans);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreash]);

  if (loading) return <div>Loading...</div>;
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <UserListTable tableData={data || []} />
      </Grid>
    </Grid>
  );
}
