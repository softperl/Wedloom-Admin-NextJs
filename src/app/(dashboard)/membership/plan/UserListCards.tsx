// MUI Imports
import Grid from "@mui/material/Grid";

// Type Imports
import type { UserDataType } from "@components/card-statistics/HorizontalWithSubtitle";

// Component Imports
import HorizontalWithSubtitle from "@components/card-statistics/HorizontalWithSubtitle";

// Vars
const data: UserDataType[] = [
  {
    title: "Total Plan",
    value: "219",
    avatarIcon: "tabler-users",
    avatarColor: "primary",
    change: "positive",
    changeNumber: "29%",
    subTitle: "Total User",
  },

  {
    title: "Monthly Plan",
    value: "160",
    avatarIcon: "tabler-user-check",
    avatarColor: "success",
    change: "negative",
    changeNumber: "14%",
    subTitle: "Last week",
  },
  {
    title: "Yearly Plan",
    value: "237",
    avatarIcon: "tabler-user-search",
    avatarColor: "warning",
    change: "positive",
    changeNumber: "42%",
    subTitle: "Last week",
  },
];

const UserListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={4} md={4}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserListCards;
