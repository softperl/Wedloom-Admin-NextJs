// MUI Imports
import Grid from "@mui/material/Grid";

// Component Imports

import type { BlogsType } from "./UserListTable";
import UserListTable from "./UserListTable";
import { fetchFn } from "@/lib/servet-utils";
import UserListCards from "./UserListCards";

export default async function page({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
    perPage?: string;
  };
}) {
  const q = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 50;
  let data = null;
  let totalPages = 1;
  let total = 0;

  try {
    data = await fetchFn(
      `/blog/post/get-all?q=${q}&page=${currentPage}&perPage=${perPage}`,
      {
        method: "GET",
        next: {
          revalidate: 0,
          cache: "no-store",
          tags: ["posts"],
        },
      }
    );

    totalPages = data.totalPages;
    total = data.total;
  } catch (error) {
    console.log(error);
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>

      <Grid item xs={12}>
        <UserListTable tableData={data.posts || []} />
      </Grid>
    </Grid>
  );
}
