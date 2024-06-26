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
import useImagePreview from "@/lib/hooks/useImagePreview";
import Typography from "@mui/material/Typography";

// Styled Component Imports

type FormValues = {
  fontName: string;
  sourceFile: string;
};

const FormValidationBasic = () => {
  const router = useRouter();
  // Hooks
  const { fileInputRef, selectedFile, handleFileChange, handleRemove } =
    useImagePreview();
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
      <CardHeader title="Add New Font" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid container spacing={6} item xs={12}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="fontName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Font Name"
                      placeholder="Font Name"
                      {...(errors.fontName && {
                        error: true,
                        helperText: "This field is required.",
                      })}
                    />
                  )}
                />
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
                  Choose File
                </Button>
                {selectedFile && <Typography>{selectedFile?.name}</Typography>}
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
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormValidationBasic;
