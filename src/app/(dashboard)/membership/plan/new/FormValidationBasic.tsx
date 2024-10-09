"use client";

// React Imports

// MUI Imports
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

// Third-party Imports
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Components Imports

import { cn, handelError } from "@/lib/utils";
import CustomTextField from "@core/components/mui/TextField";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { newPlan } from "@/lib/api";
import { nanoid } from "nanoid";

// Styled Component Imports

type FormValues = {
  planType: string;
  planName: string;
  price: string;
  tax: string;
  features: { feature: string }[];
};

const FormValidationBasic = () => {
  const router = useRouter();
  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      planType: "",
      planName: "",
      price: "",
      tax: "",
      features: [{ feature: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  useEffect(() => {
    setValue("features", fields);
  }, []);

  const onSubmit = async (value: any) => {
    console.log(value);
    const features =
      value.features.length > 0 && value.features[0].feature !== ""
        ? value.features
        : null;
    try {
      await newPlan({
        id: nanoid(),
        type: value.planType,
        name: value.planName,
        price: value.price,
        tax: value.tax,
        features: features,
      });
      toast.success("Plan Added Successfully");
      router.push("/membership/plan");
    } catch (error) {
      console.error(error);
      handelError(error);
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
              fields?.map((item, index) => {
                const isLast = index === fields.length - 1;
                return (
                  <Grid item xs={12} sm={6} key={item?.id}>
                    <div className="flex gap-2">
                      <Controller
                        name={`features.${index}.feature`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            fullWidth
                            label={`Feature ${index + 1}`}
                            placeholder={`Feature ${index + 1}`}
                            {...(errors.features?.[index]?.feature && {
                              error: true,
                              helperText: "This field is required.",
                            })}
                          />
                        )}
                      />
                      <div className="relative">
                        <Button
                          onClick={() =>
                            isLast ? append({ feature: "" }) : remove(index)
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
