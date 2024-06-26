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

import { newCategory } from "@/lib/api";
import { handelError } from "@/lib/utils";
import CustomTextField from "@core/components/mui/TextField";
import { useRouter } from "next/navigation";

type FormValues = {
  name: string;
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
    },
  });

  const onSubmit = async (values: any) => {
    try {
      await newCategory({
        name: values.name,
        parentId: values.parent,
      });
      toast.success("Category created successfully");
      window.location.reload();
    } catch (error) {
      handelError(error);
    }
  };

  return (
    <Card>
      <CardHeader title="Add New Category" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
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
