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
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

// Styled Component Imports

type FormValues = {
  planType: string;
  planName: string;
  price: string;
  tax: string;
  features: string[];
};

const FormValidationBasic = () => {
  const router = useRouter();
  const [features, setFeatures] = useState<string[]>([""]);
  const [yearlyFeatures, setYearlyFeatures] = useState<string[]>([""]);
  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      planType: "",
      planName: "",
      price: "",
      tax: "",
      features: [""],
    },
  });

  const onSubmit = () => toast.success("Form Submitted");

  const handleAddFeature = (type: "monthly" | "yearly") => {
    if (type === "monthly") {
      setFeatures([...features, ""]);
    } else {
      setYearlyFeatures([...yearlyFeatures, ""]);
    }
  };

  const handleRemoveFeature = (index: number, type: "monthly" | "yearly") => {
    if (type === "monthly") {
      setFeatures(features.filter((_, i) => i !== index));
    } else {
      setYearlyFeatures(yearlyFeatures.filter((_, i) => i !== index));
    }
  };

  return (
    <Card>
      <CardHeader title="Add New Plan" />
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="planType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Plan Type"
                    {...field}
                    error={Boolean(errors.planType)}>
                    <MenuItem value="">Select Plan Type</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Yearly">Yearly</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.planType && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
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
                    {...(errors.price && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="tax"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Tax (%)"
                    placeholder="Tax"
                    {...(errors.planName && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            {watch("planType") !== "" && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name="planName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Plan Name"
                      placeholder="Plan Name"
                      {...(errors.planName && {
                        error: true,
                        helperText: "This field is required.",
                      })}
                    />
                  )}
                />
              </Grid>
            )}
            {watch("planType") !== "" &&
              features?.map((_, index) => {
                const isLast = index === features.length - 1;
                return (
                  <Grid item xs={12} sm={6} key={index}>
                    <div className="flex gap-2">
                      <Controller
                        name={`features.${index}`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            fullWidth
                            label={`Feature ${index + 1}`}
                            placeholder={`Feature ${index + 1}`}
                            {...(errors.features && {
                              error: true,
                              helperText: "This field is required.",
                            })}
                          />
                        )}
                      />
                      <div className="relative">
                        <Button
                          onClick={() =>
                            isLast
                              ? handleAddFeature("monthly")
                              : handleRemoveFeature(index, "monthly")
                          }
                          variant="tonal"
                          type="button"
                          className={cn(
                            "mt-[1.16rem]",
                            !isLast && "text-red-500 bg-red-500/10"
                          )}>
                          {isLast ? (
                            <i className="tabler-plus" />
                          ) : (
                            <i className="tabler-trash" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </Grid>
                );
              })}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
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
        </CardActions>
      </form>
    </Card>
  );
};

export default FormValidationBasic;
