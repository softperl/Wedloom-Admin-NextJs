// MUI Imports
import Grid from "@mui/material/Grid";

// Type Imports
import type { UserDataType } from "@components/card-statistics/HorizontalWithSubtitle";

// Component Imports
import HorizontalWithSubtitle from "@components/card-statistics/HorizontalWithSubtitle";

// Vars
const data: UserDataType[] = [
  {
    title: "Total Fonts",
    value: "21,459",
    avatarIcon: "tabler-users",
    avatarColor: "primary",
    change: "positive",
    changeNumber: "29%",
    subTitle: "Total User",
  },
  {
    title: "Fonts Type",
    value: "21,459",
    avatarIcon: "tabler-users",
    avatarColor: "primary",
    change: "positive",
    changeNumber: "29%",
    subTitle: "Total User",
  },
  {
    title: "Active Fonts",
    value: "21,459",
    avatarIcon: "tabler-users",
    avatarColor: "primary",
    change: "positive",
    changeNumber: "29%",
    subTitle: "Total User",
  },
  {
    title: "Inactive Fonts",
    value: "21,459",
    avatarIcon: "tabler-users",
    avatarColor: "primary",
    change: "positive",
    changeNumber: "29%",
    subTitle: "Total User",
  },
];

const UserListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserListCards;
