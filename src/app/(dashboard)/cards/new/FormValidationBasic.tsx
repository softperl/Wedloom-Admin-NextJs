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
import Typography from "@mui/material/Typography";
import useImagePreview from "@/lib/hooks/useImagePreview";

// Styled Component Imports

type FormValues = {
  name: string;
  cardType: string;
  category: string;
  price: string;
  thumbnail: string;
  fonts: string;
  images: string;
};

const FormValidationBasic = () => {
  const router = useRouter();
  // Hooks
  const {
    fileInputRef,
    selectedFile,
    handleFileChange,
    imageSrc,
    handleRemove,
  } = useImagePreview();
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
      fonts: undefined,
      images: undefined,
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
                name="fonts"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    SelectProps={{ multiple: true }}
                    label="Fonts"
                    value={Array.isArray(value) ? value : []}
                    onChange={onChange}
                    error={Boolean(errors.fonts)}>
                    <MenuItem value="">Select Fonts</MenuItem>
                    <MenuItem value="Roboto">Roboto</MenuItem>
                    <MenuItem value="Poppins - Regular">
                      Poppins - Regular
                    </MenuItem>
                    <MenuItem value="Fantasy">Fantasy</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.fonts && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className="flex items-center gap-5 relative sm:mt-[1.17rem]">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                variant="contained"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                startIcon={<i className="tabler-library-photo" />}>
                Source File
              </Button>
              {selectedFile && <Typography>{selectedFile?.name}</Typography>}
            </Grid>

            <Grid item>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              {imageSrc ? (
                <div className="relative aspect-auto w-60">
                  <img
                    src={imageSrc as string}
                    alt="Preview"
                    className="aspect-auto w-60 object-contain bg-gray-100 rounded-md mt-6"
                  />
                  <i
                    onClick={handleRemove}
                    className="tabler-trash absolute right-2 top-8 text-red-500"></i>
                </div>
              ) : (
                <div className="aspect-video w-60 border rounded-md flex items-center justify-center cursor-pointer text-center mt-6">
                  Preview
                </div>
              )}
            </Grid>
            <Grid item className="flex items-center justify-center">
              <Button
                variant="contained"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                startIcon={<i className="tabler-library-photo" />}>
                Choose File
              </Button>
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
