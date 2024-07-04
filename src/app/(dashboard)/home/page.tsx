// MUI Imports
import Grid from "@mui/material/Grid";

// Components Imports
import EarningReports from "@views/dashboards/analytics/EarningReports";

// Server Action Imports
import { getServerMode } from "@core/utils/serverHelpers";
import UsersSlider from "./UsersSlider";
import VendorsSlider from "./VendorsSlider";

const DashboardAnalytics = async () => {
  // Vars

  const serverMode = getServerMode();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6}>
        <UsersSlider />
      </Grid>
      <Grid item xs={12} md={6}>
        <EarningReports serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <VendorsSlider />
      </Grid>
      {/* <Grid item xs={12} lg={6}>
        <WebsiteAnalyticsSlider />
      </Grid> */}
    </Grid>
  );
};

export default DashboardAnalytics;
