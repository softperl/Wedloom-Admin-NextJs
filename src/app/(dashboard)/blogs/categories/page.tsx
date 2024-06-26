import Grid from "@mui/material/Grid";
import FormValidationBasic from "./FormValidationBasic";
import UserListTable from "./UserListTable";
import { fetchFn } from "@/lib/servet-utils";

export default async function page() {
  let data = null;

  try {
    data = await fetchFn(`/blog/category/get-all`, {
      method: "GET",
      next: {
        revalidate: 0,
        tags: ["categories"],
      },
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormValidationBasic categories={data?.categories || []} />
      </Grid>
      <Grid item xs={12}>
        <UserListTable tableData={data?.categories || []} />
      </Grid>
    </Grid>
  );
}
