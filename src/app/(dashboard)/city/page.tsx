"use client";
import Grid from "@mui/material/Grid";
import FormValidationBasic from "./FormValidationBasic";
import UserListTable from "./UserListTable";
import { useEffect, useState } from "react";
import useUi from "@/lib/hooks/useUi";
import { getCities } from "@/lib/api";

export default function page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { refreash } = useUi();

  const fetchData = async () => {
    setError(null);
    try {
      const { data } = await getCities();
      console.log(data);
      setData(data.cities);
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
        <FormValidationBasic />
      </Grid>
      <Grid item xs={12}>
        <UserListTable tableData={data || []} />
      </Grid>
    </Grid>
  );
}
