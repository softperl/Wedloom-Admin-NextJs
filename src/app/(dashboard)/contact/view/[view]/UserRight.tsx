// MUI Imports
import type { ButtonProps } from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// Type Imports
import type { ThemeColor } from "@core/types";

// Component Imports

const UserRight = () => {
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
    <Card className="h-full">
      <CardContent className="flex flex-col gap-6">
        <div>
          <Typography variant="h5">Messages</Typography>
          <Divider className="mlb-4" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center flex-wrap gap-x-1.5">
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                facere ea odit vero veniam qui! Labore, non? Laborum, amet
                adipisci. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Quae facere ea odit vero veniam qui! Labore, non? Laborum,
                amet adipisci. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quae facere ea odit vero veniam qui! Labore,
                non? Laborum, amet adipisci. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quae facere ea odit vero veniam
                qui! Labore, non? Laborum, amet adipisci. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Quae facere ea odit vero
                veniam qui! Labore, non? Laborum, amet adipisci. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Quae facere ea odit
                vero veniam qui! Labore, non? Laborum, amet adipisci. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Quae facere
                ea odit vero veniam qui! Labore, non? Laborum, amet adipisci.
                ipsum dolor sit amet consectetur adipisicing elit. Quae facere
                ea odit vero veniam qui! Labore, non? Laborum, amet adipisci.
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRight;
