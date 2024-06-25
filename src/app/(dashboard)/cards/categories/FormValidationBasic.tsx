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
import MenuItem from "@mui/material/MenuItem";

import FormHelperText from "@mui/material/FormHelperText";

import CustomTextField from "@core/components/mui/TextField";
import { useRouter } from "next/navigation";
import { handelError } from "@/lib/utils";
import { newCategory } from "@/lib/api";

type FormValues = {
  name: string;
  // slug: string
  parent: string;
};

const FormValidationBasic = ({ categories }: any) => {
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
      // slug: undefined,
      parent: undefined,
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
            {/* <Grid item xs={12} sm={12}>
              <Controller
                name='slug'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Slug'
                    placeholder='Slug'
                    {...(errors.slug && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <Controller
                name="parent"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Parent"
                    {...field}
                    error={Boolean(errors.parent)}>
                    <MenuItem value="">Select Parent Category</MenuItem>
                    {categories.map((category: any) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
              {errors.parent && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
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
