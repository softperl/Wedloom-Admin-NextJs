"use client";
import Grid from "@mui/material/Grid";

// Component Imports

import type { BlogsType } from "./UserListTable";
import UserListTable from "./UserListTable";
import { useEffect, useState } from "react";
import useUi from "@/lib/hooks/useUi";
import { getRefund } from "@/lib/api";

const data: BlogsType[] = [
  {
    title:
      "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
    status: "published",
    date: "13 Jun 2024",
    version: "1.0.2",
  },
];

export default function page() {
  const [terms, setTerms] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { refreash } = useUi();
  const fetchData = async () => {
    try {
      const { data } = await getRefund();
      setTerms(data.refund);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [refreash]);

  if (loading) return <p>Loading...</p>;
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListTable tableData={terms ? [terms] : []} />
      </Grid>
    </Grid>
  );
}
