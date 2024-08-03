import Grid from "@mui/material/Grid";
import ApexAreaChart from "./ApexAreaChart";

const DashboardAnalytics = async () => {
  return (
    <Grid>
      <ApexAreaChart serverMode={"light"} />
    </Grid>
  );
};

export default DashboardAnalytics;
