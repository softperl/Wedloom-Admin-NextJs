"use client";

// React Imports

// MUI Imports
import { useRouter } from "next/navigation";

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
import EditorControlled from "./Editor";
import { useState } from "react";
import { newRefund } from "@/lib/api";

// Styled Component Imports

type FormValues = {
  title: string;
};

const FormValidationBasic = () => {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: undefined,
    },
  });

  const onSubmit = async (value: any) => {
    try {
      setLoading(true);
      await newRefund({
        title: value.title,
        content: "",
      });
      router.push("/refund");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Add New Refund" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Title"
                    placeholder="Title"
                    {...(errors.title && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <EditorControlled />
            </Grid>

            <Grid item xs={12} className="flex gap-4">
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant="tonal"
                color="secondary"
                type="button"
                onClick={() => router.back()}
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
