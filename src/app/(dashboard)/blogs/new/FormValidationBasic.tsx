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
import { newPost } from "@/lib/api";

type FormValues = {
  image: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  seokeywords: string[];
  status: string;
  author: string;
  tags: string[];
};

const FormValidationBasic = ({ categories }: any) => {
  // State to hold the full URL
  const [fullUrl, setFullUrl] = useState<string>("");
  // Hooks
  const {
    fileInputRef,
    imageSrc,
    selectedFile,
    handleFileChange,
    handleRemove,
  } = useImagePreview();
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
      image: undefined,
      title: "",
      shortDescription: "",
      description: "",
      seokeywords: [],
      category: undefined,
      status: "Published",
      author: "Admin",
    },
  });

  const onSubmit = async (value: any) => {
    try {
      await newPost({
        title: value.title,
        description: value.shortDescription,
        content: value.description,
        categoryId: value.category,
        keywords: value.seokeywords,
        status: value.status,
        tags: value.tags,
      });
      toast.success("Post added successfully!");
      router.push("/blogs");
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
      setFullUrl(`${protocol}//${hostname}${port}${pathname}`);
    }
  }, [router]);

  const shortDes = watch("shortDescription");
  const seokeywordsArray = watch("seokeywords");

  console.log("seokeywordsArray", seokeywordsArray);

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
      <CardHeader title="Add New Blog" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  const length = field.value ? Number(field.value.length) : 0;
                  const count = 145 - length;
                  const handleChange = (event: any) => {
                    if (event.target.value.length <= 400) {
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
                        {...(errors.title && {
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

            <Grid item xs={6}>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label="Category"
                    {...field}
                    error={Boolean(errors.category)}>
                    <MenuItem value="">Select Category</MenuItem>
                    {categories?.map((category: any) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
              {errors.category && (
                <FormHelperText error>This field is required.</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="shortDescription"
                control={control}
                rules={{
                  required: true,
                  maxLength: {
                    value: 145,
                    message: "Maximum length is 145 characters",
                  },
                }}
                render={({ field }) => {
                  const length = field.value ? Number(field.value.length) : 0;
                  const count = 400 - length;
                  const handleChange = (event: any) => {
                    if (event.target.value.length <= 400) {
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
            <Grid item container spacing={6}>
              <Grid
                item
                container
                xs={12}
                md={6}
                direction={"column"}
                spacing={6}>
                <Grid item>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Tag {...field} setValue={setValue} label="Tags" />
                      );
                    }}
                  />
                </Grid>
                <Grid item container spacing={6}>
                  <Grid item xs={6}>
                    <Controller
                      name="status"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          select
                          fullWidth
                          label="Status"
                          {...field}
                          error={Boolean(errors.category)}>
                          <MenuItem value="">Select Status</MenuItem>
                          <MenuItem value="Published">Published</MenuItem>
                          <MenuItem value="Draft">Draft</MenuItem>
                        </CustomTextField>
                      )}
                    />
                    {errors.category && (
                      <FormHelperText error>
                        This field is required.
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="author"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          select
                          fullWidth
                          label="Author"
                          {...field}
                          error={Boolean(errors.category)}>
                          <MenuItem value="">Select author</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                          <MenuItem value="Shipon">Shipon</MenuItem>
                          <MenuItem value="Junayed">Junayed</MenuItem>
                        </CustomTextField>
                      )}
                    />
                    {errors.category && (
                      <FormHelperText error>
                        This field is required.
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked name="featured" />}
                      label="Is Featured"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked name="comments" />}
                      label="Comments"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12} md={6} spacing={6}>
                <Grid item>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  {imageSrc ? (
                    <div className="relative aspect-auto w-60">
                      <img
                        src={imageSrc as string}
                        alt="Preview"
                        className="aspect-auto w-60 object-contain bg-gray-100 rounded-md mt-6"
                      />
                      <i
                        onClick={handleRemove}
                        className="tabler-trash absolute right-2 top-8 text-red-500"></i>
                    </div>
                  ) : (
                    <div className="aspect-video w-60 border rounded-md flex items-center justify-center cursor-pointer text-center mt-6">
                      Preview
                    </div>
                  )}
                </Grid>
                <Grid item className="flex items-center justify-center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    startIcon={<i className="tabler-library-photo" />}>
                    Choose File
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <EditorControlled />
            </Grid>
            <CardHeader title="SEO Preview" className="pb-0" />
            <Grid item xs={12}>
              <CardContent className="shadow">
                <Typography variant="h5" className="mbe-2">
                  {watch("title")}
                </Typography>
                <Link href="" className="text-green-700 text-sm">
                  {fullUrl}/{slugify(watch("title"))}
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
