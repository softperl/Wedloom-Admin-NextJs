"use client";

// React Imports
import { useRef, useState } from "react";

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
import { uploadFiles } from "@/lib/utils";

// Styled Component Imports

type FormValues = {
  name: string;
};

const FormValidationBasic = () => {
  const { refreash, setRefreash } = useUi();
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
    },
  });

  console.log(selectedFile);
  const onSubmit = async (value: any) => {
    if (!selectedFile) {
      toast.error("Please upload a photo.");
      return;
    }

    setUploading(true); // Set uploading state to true

    try {
      const url = await uploadFiles([selectedFile], "others");
      console.log(url);
      await newVendorCategory({
        name: value.name,
        photo: url[0],
      });
      reset({ name: "" });
      setSelectedFile(null); // Clear the selected file
      toast.success("Successfully added.");
      setRefreash(!refreash);
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
      <CardHeader title="Vendor Categories" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} className="flex items-end justify-normal gap-6">
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

            <Grid item xs={12} className="flex gap-4">
              <Button
                variant="contained"
                type="submit"
                disabled={uploading} // Disable button while uploading
              >
                {uploading ? "Uploading..." : "Submit"}{" "}
                {/* Show uploading state */}
              </Button>
              <Button
                variant="tonal"
                color="secondary"
                type="button"
                onClick={() => router.back()}
                disabled={uploading} // Disable button while uploading
              >
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
