"use client";

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
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import { usePathname, useRouter } from "next/navigation";

type FormValues = {
  maps: string;
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
      maps: "",
    },
  });

  const onSubmit = (value: any) => {
    console.log(value);
    toast.success("Form Submitted");
  };

  return (
    <Card>
      <CardHeader title="Maps" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Controller
                name="maps"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      multiline
                      fullWidth
                      rows={4}
                      label="Embed Map "
                      {...(errors.maps && {
                        error: true,
                        helperText: "This field is required.",
                      })}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {watch("maps") ? (
                <iframe
                  src={watch("maps")}
                  width="100%"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-md"></iframe>
              ) : (
                <div className="py-28 bg-[var(--mui-palette-background-paper)] border border-[var(--mui-palette-customColors-inputBorder)] rounded-md flex items-center justify-center">
                  <p>Please add embed link</p>
                </div>
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
