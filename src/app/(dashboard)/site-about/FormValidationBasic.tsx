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
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import useImagePreview from "@/lib/hooks/useImagePreview";
import CustomTextField from "@core/components/mui/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import EditorControlled from "./Editor";
import Tag from "./Tag";
import SEOKeyword from "./SEOKeyword";
import { useEffect, useState } from "react";
import { handelError, slugify } from "@/lib/utils";
import { formatDate } from "date-fns/format";
import { newAbout } from "@/lib/api";

type FormValues = {
  email: string;
  phone: string;
  siteName: string;
  tagLine: string;
  shortDescription: string;
  seoTitle: string;
  seokeywords: string[];
};

const FormValidationBasic = ({ aboutData }: any) => {
  const [mainDomain, setMainDomain] = useState<string>("");
  // Hooks

  const router = useRouter();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: aboutData?.email || undefined,
      siteName: aboutData?.name || undefined,
      shortDescription: aboutData?.description || undefined,
      seokeywords: aboutData?.seoKeyWords || [],
      seoTitle: aboutData?.seoTitle || undefined,
      tagLine: aboutData?.tagLine || undefined,
      phone: aboutData?.phone || undefined,
    },
  });

  const onSubmit = async (value: any) => {
    try {
      await newAbout({
        ...(aboutData && { id: aboutData.id }),
        name: value.siteName,
        email: value.email,
        phone: value.phone,
        tagLine: value.tagLine,
        seoTitle: value.seoTitle,
        description: value.shortDescription,
        content: "gg",
        seoKeyWords: value.seokeywords,
      });
      toast.success("About added successfully!");
    } catch (error) {
      handelError(error);
    }
  };

  // Effect to get the full URL on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      const port = window.location.port ? `:${window.location.port}` : "";
      setMainDomain(`${protocol}//${hostname}${port}`);
    }
  }, [router]);

  const shortDes = watch("shortDescription");
  const seokeywordsArray = watch("seokeywords");

  const seoDescription = () => {
    if (
      !shortDes ||
      !Array.isArray(seokeywordsArray) ||
      seokeywordsArray.length === 0
    ) {
      return shortDes;
    }

    let highlightedDescription = shortDes;

    seokeywordsArray.forEach((tag) => {
      const regex = new RegExp(`\\b(${tag})\\b`, "gi");
      highlightedDescription = highlightedDescription.replace(
        regex,
        `<b>${tag}</b>`
      );
    });

    return highlightedDescription;
  };

  useEffect(() => {
    seoDescription();
  }, [seokeywordsArray]);

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <CardHeader title="Site About" className="pb-0" />
            <Grid container spacing={6} item>
              <Grid item xs={6}>
                <Controller
                  name="siteName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Site Name"
                        {...(errors.siteName && {
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
                  name="tagLine"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Tag Line"
                        {...(errors.tagLine && {
                          error: true,
                          helperText: "This field is required.",
                        })}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Email"
                      {...(errors.email && {
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
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label="Phone Number"
                      {...(errors.phone && {
                        error: true,
                        helperText: "This field is required.",
                      })}
                    />
                  );
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <EditorControlled />
            </Grid>

            <CardHeader title="Meta Preview" className="pb-0" />
            <Grid item xs={12}>
              <Controller
                name="seoTitle"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  const length = field.value ? Number(field.value.length) : 0;
                  const count = 70 - length;
                  const handleChange = (event: any) => {
                    if (event.target.value.length <= 70) {
                      field.onChange(event);
                    }
                  };
                  return (
                    <div className="relative">
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Title"
                        onChange={handleChange}
                        {...(errors.seoTitle && {
                          error: true,
                          helperText: "This field is required.",
                        })}
                      />
                      <label className="absolute -top-0.5 right-0 z-10 mb-1 text-sm">
                        You have remains {count} character
                      </label>
                    </div>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="seokeywords"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <SEOKeyword
                      {...field}
                      setValue={setValue}
                      label="SEO Keywords"
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="shortDescription"
                control={control}
                rules={{
                  required: true,
                  maxLength: {
                    value: 180,
                    message: "Maximum length is 180 characters",
                  },
                }}
                render={({ field }) => {
                  const length = field.value ? Number(field.value.length) : 0;
                  const count = 180 - length;
                  const handleChange = (event: any) => {
                    if (event.target.value.length <= 180) {
                      field.onChange(event);
                    }
                  };

                  return (
                    <div className="relative">
                      <CustomTextField
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        label="Short Description"
                        placeholder="Short Description"
                        onChange={handleChange}
                        {...(errors.shortDescription && {
                          error: true,
                          helperText: "This field is required.",
                        })}
                      />
                      <label className="absolute -top-0.5 right-0 z-10 mb-1 text-sm">
                        You have remains {count} character
                      </label>
                    </div>
                  );
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <CardContent className="shadow">
                <Typography variant="h5" className="mbe-2">
                  {watch("siteName")}
                </Typography>
                <Link href="" className="text-green-700 text-sm">
                  {mainDomain}
                </Link>
                <Typography className="mbe-2" color="text.secondary">
                  <span>{formatDate(Date(), "PPPP")}</span> -{" "}
                  <span
                    dangerouslySetInnerHTML={{ __html: seoDescription() }}
                  />
                </Typography>
              </CardContent>
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
