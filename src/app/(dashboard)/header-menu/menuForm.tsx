import CustomTextField from "@/@core/components/mui/TextField";
import useSiteMenu from "@/lib/hooks/useSiteMenu";
import { slugify } from "@/lib/utils";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { nanoid } from "nanoid";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export interface MenuItem {
  id: string;
  name: string;
  url: string;
  subMenus: {
    id: string;
    categoryName: string;
    children: {
      id: string;
      name: string;
      url: string;
    }[];
  }[];
}

export const MenuForm = () => {
  const { setMenuItems } = useSiteMenu();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ menu: string }>({
    defaultValues: {
      menu: "",
    },
  });

  const onSubmit = (data: { menu: string }) => {
    const newItem = {
      id: nanoid(),
      name: data.menu,
      url: `/${slugify(data.menu)}`,
      subMenus: [],
    };
    setMenuItems((prevItems) => [...prevItems, newItem]);
    reset();
  };

  return (
    <Grid item xs={12} md={4} className="flex flex-col gap-6">
      <Card>
        <CardHeader title="Add Menu Items" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 border-t space-y-6">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="menu"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Menu"
                    placeholder="Menu"
                    error={!!errors.menu}
                    helperText={errors.menu ? "This field is required." : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className="flex justify-end">
              <Button variant="contained" type="submit">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
};
