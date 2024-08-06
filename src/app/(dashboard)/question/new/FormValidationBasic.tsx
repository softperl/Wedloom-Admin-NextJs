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
import { newQuestion } from "@/lib/api";

type FormValues = {
  question: string;
  questionType: string;
  vendorType: string;
  labelName: string;
  inputType: string;
  showLabel: string;
  options: { value: string }[];
};

const FormValidationBasic = () => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      question: "",
      questionType: "",
      vendorType: "",
      labelName: "",
      inputType: "Text_Number",
      showLabel: "Yes",
      options: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const onSubmit = async (value: any) => {
    try {
      console.log(value);
      await newQuestion({
        question: value.question,
        questionType: value.questionType,
        vendorType: value.vendorType,
        inputType: value.inputType,
        labelName: value.labelName,
        showLabel: value.showLabel,
        others: value.options,
      });
      toast.success("Form Submitted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader title="Add New Question" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Controller
                name="question"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Question"
                      {...(errors.question && {
                        error: true,
                        helperText: "This field is required.",
                      })}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="questionType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Question Type"
                    {...field}
                    error={Boolean(errors.questionType)}>
                    <MenuItem value="">Select Question Type</MenuItem>
                    <MenuItem value="Food">Short</MenuItem>
                    <MenuItem value="Long">Long</MenuItem>
                    <MenuItem value="Multiple_Choice">Multiple Choice</MenuItem>
                    <MenuItem value="Radio">Radio</MenuItem>
                    <MenuItem value="File">File</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.questionType && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="vendorType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Vendor Type"
                    {...field}
                    error={Boolean(errors.vendorType)}>
                    <MenuItem value="">Select Vendor Type</MenuItem>
                    <MenuItem value="Photographer">Photographer</MenuItem>
                    <MenuItem value="Beauty">Beauty</MenuItem>
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Venue">Venue</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.vendorType && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="inputType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Input Type"
                    {...field}
                    error={Boolean(errors.inputType)}>
                    <MenuItem value="">Select Input Type</MenuItem>
                    <MenuItem value="Text">Text</MenuItem>
                    <MenuItem value="Number">Number</MenuItem>
                    <MenuItem value="Text_Number">Text + Number</MenuItem>
                    <MenuItem value="File">File</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.inputType && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="labelName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Label Name"
                      {...(errors.labelName && {
                        error: true,
                        helperText: "This field is required.",
                      })}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="showLabel"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Show Label"
                    {...field}
                    error={Boolean(errors.showLabel)}>
                    <MenuItem value="">Select Show Label</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.inputType && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            {(watch("questionType").includes("Multiple_Choice") ||
              watch("questionType").includes("Radio")) &&
              fields?.map((item, i) => {
                return (
                  <Grid key={item?.id} item xs={12} className="flex gap-2">
                    <Controller
                      name={`options.${i}.value`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => {
                        return (
                          <CustomTextField
                            {...field}
                            fullWidth
                            label="Option"
                            {...(errors.options?.[i]?.value && {
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
                            onClick={() => remove(Number(item?.id))}>
                            <i className="tabler-trash" />
                          </Button>
                        </div>
                      )}
                      {i === fields.length - 1 && (
                        <div className="">
                          <Button
                            variant="contained"
                            type="button"
                            onClick={() => append({ value: "" })}>
                            <i className="tabler-plus" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Grid>
                );
              })}

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
