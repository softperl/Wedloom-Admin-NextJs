"use client";

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
import CustomTextField from "@core/components/mui/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { newStep } from "@/lib/api";
import { nanoid } from "nanoid";

type FormValues = {
  steps: {
    des: string;
  }[];
};

const FormValidationBasic = () => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      steps: [{ des: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  useEffect(() => {
    setValue("steps", fields);
  }, []);

  const onSubmit = async (value: FormValues) => {
    try {
      console.log(value.steps);
      // await newStep(value.steps);
      toast.success("Form Submitted");
      reset({
        steps: [{ des: "" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader title="Add Work Steps" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Grid container spacing={6}>
              {fields?.map((item, i) => {
                return (
                  <Grid key={item?.id} item xs={12} className="flex gap-2">
                    <Controller
                      name={`steps.${i}.des`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => {
                        return (
                          <CustomTextField
                            {...field}
                            fullWidth
                            label="Description"
                            {...(errors.steps?.[i]?.des && {
                              error: true,
                              helperText: "This field is required.",
                            })}
                          />
                        );
                      }}
                    />

                    <div className={cn("flex gap-2 mt-[1.10rem]")}>
                      {fields.length > 1 && (
                        <div className="">
                          <Button
                            variant="contained"
                            type="button"
                            color="error"
                            onClick={() => remove(i)}>
                            <i className="tabler-trash" />
                          </Button>
                        </div>
                      )}
                      {i === fields.length - 1 && (
                        <div className="">
                          <Button
                            variant="contained"
                            type="button"
                            onClick={() => append({ des: "" })}>
                            <i className="tabler-plus" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <Grid container spacing={6}>
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
