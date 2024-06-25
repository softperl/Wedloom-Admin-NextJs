"use client";

// React Imports

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
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

// Styled Component Imports

type FormValues = {
  name: string;
  cardType: string;
  category: string;
  price: string;
  thumbnail: string;
};

const FormValidationBasic = () => {
  const router = useRouter();
  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: undefined,
      cardType: undefined,
      category: undefined,
      img: undefined,
    },
  });

  const onSubmit = () => toast.success("Form Submitted");

  return (
    <Card>
      <CardHeader title="Add New Author" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="cardType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Card Type"
                    {...field}
                    error={Boolean(errors.cardType)}>
                    <MenuItem value="">Select Card Type</MenuItem>
                    <MenuItem value="Wedding Cards">Wedding Cards</MenuItem>
                    <MenuItem value="Video Cards">Video Cards</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.cardType && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Category"
                    {...field}
                    error={Boolean(errors.cardType)}>
                    <MenuItem value="">Select Category</MenuItem>

                    <MenuItem value="Wedding Card Designs">Designs</MenuItem>
                    <MenuItem value="Invitation Video Templates">
                      Invitation
                    </MenuItem>
                    <MenuItem value="Save the Date Templates">Save</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.cardType && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Card Name"
                    placeholder="Card Name"
                    {...(errors.name && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="price"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Price"
                    placeholder="Price"
                    {...(errors.name && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="thumbnail"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Thumbnail"
                    placeholder="Thumbnail"
                    {...(errors.name && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
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
                Cancle
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormValidationBasic;
