import Grid from "@mui/material/Grid";
import FormValidationBasic from "./FormValidationBasic";

export default function page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormValidationBasic />
      </Grid>
    </Grid>
  );
}
