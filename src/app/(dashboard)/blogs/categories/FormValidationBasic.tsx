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
import { handelError, uploadFiles } from "@/lib/utils";
import { newCategory } from "@/lib/api";
import { useRef, useState } from "react";

type FormValues = {
  name: string;
  // slug: string
  parent: string;
};

const FormValidationBasic = ({ categories }: any) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false); // State for tracking upload status
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    if (!selectedFile) {
      toast.error("Please upload a photo.");
      return;
    }

    setUploading(true); // Set uploading state to true
    try {
      const url = await uploadFiles([selectedFile], "others");
      await newCategory({
        name: values.name,
        parentId: values.parent,
        photo: url[0],
      });
      toast.success("Category created successfully");
      setSelectedFile(null); // Clear the selected file
      window.location.reload();
    } catch (error) {
      handelError(error);
    } finally {
      setUploading(false); // Set uploading state back to false
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click file input
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Set the selected file
    }
  };

  return (
    <Card>
      <CardHeader title="Add New Category" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid
              item
              xs={12}
              sm={6}
              className="flex items-end justify-normal gap-6">
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
              <Button
                variant="contained"
                onClick={handleFileInputClick} // Click handler for file input
                className="flex shrink-0">
                Upload Photo
              </Button>
              <input
                type="file"
                ref={fileInputRef} // Assign ref to file input
                className="hidden"
                onChange={handleFileChange} // Handle file selection
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
