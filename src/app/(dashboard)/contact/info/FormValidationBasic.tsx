"use client";

// MUI Imports
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

// Third-party Imports
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Components Imports
import CustomTextField from "@core/components/mui/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import { usePathname, useRouter } from "next/navigation";

type FormValues = {
  email: string;
  location: string;
  phone: string;
};

const FormValidationBasic = () => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      location: "",
      phone: "",
    },
  });

  const onSubmit = (value: any) => {
    console.log(value);
    toast.success("Form Submitted");
  };

  return (
    <Card>
      <CardHeader title="Contact Info" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Email"
                      {...(errors.email && {
                        error: true,
                        helperText: "This field is required.",
                      })}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="location"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Location"
                      {...(errors.location && {
                        error: true,
                        helperText: "This field is required.",
                      })}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Phone"
                      {...(errors.phone && {
                        error: true,
                        helperText: "This field is required.",
                      })}
                    />
                  );
                }}
              />
            </Grid>

            <Grid item xs={12} className="flex gap-4">
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant="tonal"
                color="secondary"
                type="button"
                onClick={() => router.back()}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormValidationBasic;
