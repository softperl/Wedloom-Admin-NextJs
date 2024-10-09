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
import { toast } from "react-hot-toast";

// Components Imports

import CustomTextField from "@core/components/mui/TextField";
import { useRouter } from "next/navigation";
import { handelError } from "@/lib/utils";
import { getVendorCategories, newVendorCategory } from "@/lib/api";
import useUi from "@/lib/hooks/useUi";
import { nanoid } from "nanoid";

// Styled Component Imports

type FormValues = {
  name: string;
};

const FormValidationBasic = () => {
  const { refreash, setRefreash } = useUi();
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
    },
  });

  const onSubmit = async (value: any) => {
    try {
      await newVendorCategory({
        name: value?.name,
      });
      reset({
        name: "",
      });
      toast.success("Vendor added successfully.");
      setRefreash(!refreash);
    } catch (error) {
      handelError(error);
    }
  };

  return (
    <Card>
      <CardHeader title="Vendor Categories" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Name"
                    placeholder="Name"
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
