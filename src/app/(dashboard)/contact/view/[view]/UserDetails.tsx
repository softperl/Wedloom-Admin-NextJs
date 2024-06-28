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
                  Full Name:
                </Typography>
                <Typography>Shipon</Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Subject:
                </Typography>
                <Typography>bug</Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Email:
                </Typography>
                <Typography color="text.primary">abc@gmail.com</Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Phone:
                </Typography>
                <Typography color="text.primary">123456789</Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Type:
                </Typography>
                <Typography color="text.primary">Vendor</Typography>
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
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Date:
                </Typography>
                <Typography color="text.primary">28 Jun 2024 9:50PM</Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserDetails;
