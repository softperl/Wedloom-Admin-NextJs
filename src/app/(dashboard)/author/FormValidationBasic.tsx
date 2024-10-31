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

// Components Imports

import CustomTextField from "@core/components/mui/TextField";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handelError } from "@/lib/utils";
import { newAuthor } from "@/lib/api";

// Styled Component Imports

type FormValues = {
  name: string;
  slug: string;
  parent: string;
  description: string;
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
      slug: undefined,
    },
  });

  const onSubmit = async (values: any) => {
    try {
      await newAuthor({
        name: values.name,
        slug: values.slug,
      });
      toast.success("Author created successfully");
      window.location.reload();
    } catch (error) {
      handelError(error);
    }
  };

  return (
    <Card>
      <CardHeader title="Add New Author" />
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
            <Grid item xs={12} sm={6}>
              <Controller
                name="slug"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Slug"
                    placeholder="Slug"
                    {...(errors.slug && {
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
