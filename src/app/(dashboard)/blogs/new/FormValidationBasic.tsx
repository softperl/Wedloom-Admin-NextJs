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
import { newPost } from "@/lib/api";
import useImagePreview from "@/lib/hooks/useImagePreview";
import { handelError, slugify, uploadFiles } from "@/lib/utils";
import AppReactDraftWysiwyg from "@/libs/styles/AppReactDraftWysiwyg";
import CustomTextField from "@core/components/mui/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { formatDate } from "date-fns/format";
import { EditorState } from "draft-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SEOKeyword from "./SEOKeyword";
import Tag from "./Tag";
//@ts-ignore
import { stateToMarkdown } from "draft-js-export-markdown";

type FormValues = {
  thumbnail: string;
  title: string;
  shortDescription: string;
  content: any;
  category: string;
  seoKeywords: string[];
  status: string;
  author: string;
  featured: boolean;
  tags: string[];
  allowComments: boolean;
};

const FormValidationBasic = ({ categories, authors }: any) => {
  const [valueEditor, setValueEditor] = useState(EditorState.createEmpty());
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
  const [uploading, setUploading] = useState(false);
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
      thumbnail: undefined,
      title: "",
      shortDescription: "",
      content: undefined,
      seoKeywords: [""],
      tags: [],
      category: "",
      status: "Published",
      featured: false,
      author: "",
      allowComments: true,
    },
  });

  const onSubmit = async (value: any) => {
    if (!selectedFile) {
      toast.error("Please upload a photo.");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadFiles([selectedFile], "others");
      await newPost({
        title: value.title,
        categoryId: value.category,
        description: value.shortDescription,
        keywords: seoKeywordsArray,
        tags: value.tags,
        status: value.status,
        authorId: value.author,
        isFeatured: value.featured,
        allowComments: value.allowComments,
        thumbnail: url[0],
        content: value.content,
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
  const seoKeywordsArray = watch("seoKeywords");

  const seoDescription = () => {
    if (
      !shortDes ||
      !Array.isArray(seoKeywordsArray) ||
      seoKeywordsArray.length === 0
    ) {
      return shortDes;
    }

    let highlightedDescription = shortDes;

    seoKeywordsArray.forEach((tag) => {
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
  }, [seoKeywordsArray]);

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
                    {categories?.map((category: any) => {
                      return (
                        <MenuItem
                          key={category?.id}
                          value={category.id}
                          className="capitalize">
                          {category.name}
                        </MenuItem>
                      );
                    })}
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
                name="seoKeywords"
                control={control}
                rules={{ required: false }}
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
                          error={Boolean(errors.status)}>
                          <MenuItem value="">Select Status</MenuItem>
                          <MenuItem value="Published">Published</MenuItem>
                          <MenuItem value="Draft">Draft</MenuItem>
                        </CustomTextField>
                      )}
                    />
                    {errors.status && (
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
                          error={Boolean(errors.author)}>
                          <MenuItem value="">Select Author</MenuItem>

                          {authors?.map((author: any) => (
                            <MenuItem
                              key={author.id}
                              value={author.id}
                              className="capitalize">
                              {author.name}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      )}
                    />
                    {errors.author && (
                      <FormHelperText error>
                        This field is required.
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Switch defaultChecked={false} name="featured" />
                      }
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
              <AppReactDraftWysiwyg
                editorState={valueEditor}
                onEditorStateChange={(data) => {
                  const content = data.getCurrentContent();
                  const markdown = stateToMarkdown(content);
                  setValue("content", markdown);
                  setValueEditor(data);
                }}
              />
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
