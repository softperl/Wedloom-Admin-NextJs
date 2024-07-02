// MUI Imports
import Grid from "@mui/material/Grid";

// Components Imports
import EarningReports from "@views/dashboards/analytics/EarningReports";
import WebsiteAnalyticsSlider from "@views/dashboards/analytics/WebsiteAnalyticsSlider";

// Server Action Imports
import { getServerMode } from "@core/utils/serverHelpers";

const DashboardAnalytics = async () => {
  // Vars

  const serverMode = getServerMode();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6}>
        <WebsiteAnalyticsSlider />
      </Grid>

      <Grid item xs={12} md={6}>
        <EarningReports serverMode={serverMode} />
      </Grid>
    </Grid>
  );
};

export default DashboardAnalytics;
