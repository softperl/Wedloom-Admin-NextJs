//@ts-nocheck
// MUI Imports
import Grid from "@mui/material/Grid";

// Component Imports
import CardStatHorizontal from "@/components/card-statistics/Horizontal";

const Horizontal = ({ data }: { data: any }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map(({ item, index }: any) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardStatHorizontal {...item} />
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default Horizontal;
