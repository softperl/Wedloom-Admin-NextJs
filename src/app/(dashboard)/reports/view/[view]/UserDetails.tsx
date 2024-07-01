// MUI Imports
import type { ButtonProps } from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// Type Imports
import type { ThemeColor } from "@core/types";
import Chip from "@mui/material/Chip";

const UserDetails = () => {
  // Vars
  const buttonProps = (
    children: string,
    color: ThemeColor,
    variant: ButtonProps["variant"]
  ): ButtonProps => ({
    children,
    color,
    variant,
  });

  return (
    <>
      <Card>
        <CardContent className="flex flex-col gap-6">
          <div>
            <Typography variant="h5">Details</Typography>
            <Divider className="mlb-4" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Reported By:
                </Typography>
                <Typography>Shipon</Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Email:
                </Typography>
                <Typography>Avi</Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Reported Vendor:
                </Typography>
                <Typography>Avi</Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Vendor Email:
                </Typography>
                <Typography>Avi</Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Report Reason:
                </Typography>
                <Typography color="text.primary">
                  Vendors pricing is incorrect
                </Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Report Date:
                </Typography>
                <Typography color="text.primary">28 Jun 2024 9:50PM</Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Status:
                </Typography>
                <Typography>
                  <Chip
                    variant="tonal"
                    className="capitalize"
                    label={"Resolved"}
                    color={"success"}
                    size="small"
                  />
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserDetails;
