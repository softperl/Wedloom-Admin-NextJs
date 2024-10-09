// Component Imports
import { fetchFn } from "@/lib/servet-utils";
import Grid from "@mui/material/Grid";
import UserListCards from "./UserListCards";
import UserListTable from "./UserListTable";

const UserListApp = async ({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
    perPage?: string;
  };
}) => {
  const q = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 50;
  let data = null;
  let totalPages = 1;
  let total = 0;
  try {
    data = await fetchFn(
      `/vendor/approval-get-all?q=${q}&page=${currentPage}&perPage=${perPage}`,
      {
        method: "GET",
        next: {
          revalidate: 0,
          tags: ["approvals"],
        },
      }
    );
    console.log(data);

    totalPages = data.totalPages;
    total = data.total;
  } catch (error) {
    console.log(error);
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListTable tableData={data?.approvals || []} />
      </Grid>
    </Grid>
  );
};

export default UserListApp;
