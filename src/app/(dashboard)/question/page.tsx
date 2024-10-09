"use client";
// MUI Imports
import Grid from "@mui/material/Grid";

// Component Imports

import type { QuestionType } from "./UserListTable";
import UserListTable from "./UserListTable";
import UserListCards from "./UserListCards";
import { fetchFn } from "@/lib/servet-utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUi from "@/lib/hooks/useUi";

const page = ({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
    perPage?: string;
  };
}) => {
  const [data, setData] = useState<{
    questions: QuestionType[];
    totalPages: number;
    total: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const q = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 50;
  const { refreash } = useUi();

  const fetchData = async () => {
    setError(null);
    try {
      const response = await fetchFn(
        `/question/get-all?q=${q}&page=${currentPage}&perPage=${perPage}`,
        {
          method: "GET",
          next: {
            revalidate: 0,
            tags: ["questions"],
          },
        }
      );
      setData(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [q, currentPage, perPage, refreash]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <UserListTable tableData={data?.questions || []} />
      </Grid>
    </Grid>
  );
};
export default page;
