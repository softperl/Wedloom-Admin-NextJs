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
import { useRef, useState } from "react";
import { newRefund } from "@/lib/api";

// Styled Component Imports

type FormValues = {
  siteLogo: string;
};

const FormValidationBasic = () => {
  const router = useRouter();
  const [siteLogo, setSiteLogo] = useState<string | ArrayBuffer | null>(null);
  const [selectedSiteLogo, setSelectedSiteLogo] = useState<File | null>(null);
  const siteLogoRef = useRef<HTMLInputElement | null>(null);
  const [siteFavicon, setSiteFavicon] = useState<string | ArrayBuffer | null>(
    null
  );
  const [selectedSiteFavicon, setSelectedSiteFavicon] = useState<File | null>(
    null
  );
  const siteFaviconRef = useRef<HTMLInputElement | null>(null);
  const [siteFooter, setSiteFooter] = useState<string | ArrayBuffer | null>(
    null
  );
  const [selectedSiteFooter, setSelectedSiteFooter] = useState<File | null>(
    null
  );
  const siteFooterRef = useRef<HTMLInputElement | null>(null);

  const handleSiteLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedSiteLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSiteLogo = () => {
    setSiteLogo(null);
    setSelectedSiteLogo(null);
    resetFileInput();
  };

  const resetFileInput = () => {
    if (siteLogoRef.current) {
      siteLogoRef.current.value = "";
    }
  };

  const handleSiteFaviconChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedSiteFavicon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteFavicon(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSiteFavicon = () => {
    setSiteFavicon(null);
    setSelectedSiteFavicon(null);
    resetFavicon();
  };

  const resetFavicon = () => {
    if (siteLogoRef.current) {
      siteLogoRef.current.value = "";
    }
  };
  const handleSiteFooterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedSiteFooter(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteFooter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSiteFooter = () => {
    setSiteFooter(null);
    setSelectedSiteFooter(null);
    resetFooter();
  };

  const resetFooter = () => {
    if (siteFooterRef.current) {
      siteFooterRef.current.value = "";
    }
  };

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      siteLogo: undefined,
    },
  });

  const onSubmit = async (value: any) => {
    console.log(value);
  };

  return (
    <Card>
      <CardHeader title="Add Site Logos" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid container spacing={6} item xs={12} md={6}>
              <Grid item className="flex items-center">
                <Button
                  variant="contained"
                  onClick={() => {
                    siteLogoRef.current?.click();
                  }}
                  startIcon={<i className="tabler-library-photo" />}>
                  Choose Site Logo
                </Button>
              </Grid>
              <Grid item>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSiteLogoChange}
                  ref={siteLogoRef}
                  className="hidden"
                />
                {siteLogo ? (
                  <div className="aspect-square w-52 h-52 relative">
                    <img
                      src={siteLogo as string}
                      alt="Preview"
                      className="aspect-square w-52 h-52 object-contain bg-gray-100 rounded-md"
                    />
                    <i
                      onClick={handleRemoveSiteLogo}
                      className="tabler-trash absolute right-0 top-0 text-red-500"></i>
                  </div>
                ) : (
                  <div className="aspect-square w-52 h-52 border rounded-md flex items-center justify-center cursor-pointer text-center">
                    Preview
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={6} item xs={12} md={6}>
              <Grid item className="flex items-center">
                <Button
                  variant="contained"
                  onClick={() => {
                    siteFaviconRef.current?.click();
                  }}
                  startIcon={<i className="tabler-library-photo" />}>
                  Choose Site Favicon
                </Button>
              </Grid>
              <Grid item>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSiteFaviconChange}
                  ref={siteFaviconRef}
                  className="hidden"
                />
                {siteFavicon ? (
                  <div className="aspect-square w-52 h-52 relative">
                    <img
                      src={siteFavicon as string}
                      alt="Preview"
                      className="aspect-square w-52 h-52 object-contain bg-gray-100 rounded-md"
                    />
                    <i
                      onClick={handleRemoveSiteFavicon}
                      className="tabler-trash absolute right-0 top-0 text-red-500"></i>
                  </div>
                ) : (
                  <div className="aspect-square w-52 h-52 border rounded-md flex items-center justify-center cursor-pointer text-center">
                    Preview
                  </div>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={6} item xs={12} md={6}>
              <Grid item className="flex items-center">
                <Button
                  variant="contained"
                  onClick={() => {
                    siteFooterRef.current?.click();
                  }}
                  startIcon={<i className="tabler-library-photo" />}>
                  Choose Site Footer
                </Button>
              </Grid>
              <Grid item>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSiteFooterChange}
                  ref={siteFooterRef}
                  className="hidden"
                />
                {siteFooter ? (
                  <div className="aspect-square w-52 h-52 relative">
                    <img
                      src={siteFooter as string}
                      alt="Preview"
                      className="aspect-square w-52 h-52 object-contain bg-gray-100 rounded-md"
                    />
                    <i
                      onClick={handleRemoveSiteFooter}
                      className="tabler-trash absolute right-0 top-0 text-red-500"></i>
                  </div>
                ) : (
                  <div className="aspect-square w-52 h-52 border rounded-md flex items-center justify-center cursor-pointer text-center">
                    Preview
                  </div>
                )}
              </Grid>
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
