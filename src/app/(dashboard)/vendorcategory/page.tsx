"use client";
import Grid from "@mui/material/Grid";
import FormValidationBasic from "./FormValidationBasic";
import UserListTable from "./UserListTable";
import { getVendorCategories } from "@/lib/api";
import useUi from "@/lib/hooks/useUi";
import { useEffect, useState } from "react";

export default function page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { refreash } = useUi();

  const fetchData = async () => {
    try {
      const { data } = await getVendorCategories();
      console.log(data);
      setData(data.categories);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreash]);

  console.log("vendor", data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
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
