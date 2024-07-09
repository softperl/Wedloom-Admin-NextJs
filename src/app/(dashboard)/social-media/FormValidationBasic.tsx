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

// Components Imports
import CustomTextField from "@core/components/mui/TextField";
import { newSocialLinks } from "@/lib/api";
import toast from "react-hot-toast";

// Styled Component Imports

type FormValues = {
  Facebook: string;
  Twitter: string;
  Pinterest: string;
  Instagram: string;
  Youtube: string;
  Linkedin: string;
  TikTok: string;
  Reddit: string;
  Discord: string;
  WhatsApp: string;
  Telegram: string;
  Quora: string;
  Tumblr: string;
  Threads: string;
};

const FormValidationBasic = ({ socialLinks }: any) => {
  const router = useRouter();

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Facebook: socialLinks?.Facebook || undefined,
      Twitter: socialLinks?.Twitter || undefined,
      Pinterest: socialLinks?.Pinterest || undefined,
      Instagram: socialLinks?.Instagram || undefined,
      Youtube: socialLinks?.Youtube || undefined,
      Linkedin: socialLinks?.Linkedin || undefined,
      TikTok: socialLinks?.TikTok || undefined,
      Reddit: socialLinks?.Reddit || undefined,
      Discord: socialLinks?.Discord || undefined,
      WhatsApp: socialLinks?.WhatsApp || undefined,
      Telegram: socialLinks?.Telegram || undefined,
      Quora: socialLinks?.Quora || undefined,
      Tumblr: socialLinks?.Tumblr || undefined,
      Threads: socialLinks?.Threads || undefined,
    },
  });

  const onSubmit = async (value: any) => {
    try {
      await newSocialLinks({
        ...value,
        ...(socialLinks && { id: socialLinks.id }),
      });
      toast.success("Social Links Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader title="Add Social Links" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Facebook"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Facebook"
                    placeholder="Facebook"
                    {...(errors.Facebook && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Twitter"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Twitter"
                    placeholder="Twitter"
                    {...(errors.Twitter && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Pinterest"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Pinterest"
                    placeholder="Pinterest"
                    {...(errors.Pinterest && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Instagram"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Instagram"
                    placeholder="Instagram"
                    {...(errors.Instagram && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Youtube"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Youtube"
                    placeholder="Youtube"
                    {...(errors.Youtube && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Linkedin"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Linkedin"
                    placeholder="Linkedin"
                    {...(errors.Linkedin && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="TikTok"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="TikTok"
                    placeholder="TikTok"
                    {...(errors.TikTok && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Reddit"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Reddit"
                    placeholder="Reddit"
                    {...(errors.Reddit && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Discord"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Discord"
                    placeholder="Discord"
                    {...(errors.Discord && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="WhatsApp"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="WhatsApp"
                    placeholder="WhatsApp"
                    {...(errors.WhatsApp && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Telegram"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Telegram"
                    placeholder="Telegram"
                    {...(errors.Telegram && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Quora"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Quora"
                    placeholder="Quora"
                    {...(errors.Quora && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Tumblr"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Tumblr"
                    placeholder="Tumblr"
                    {...(errors.Tumblr && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="Threads"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Threads"
                    placeholder="Threads"
                    {...(errors.Threads && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
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
