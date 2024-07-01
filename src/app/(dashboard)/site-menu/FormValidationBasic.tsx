"use client";

// MUI Imports
import { slugify } from "@/lib/utils";
import CustomTextField from "@core/components/mui/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { nanoid } from "nanoid";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  menu: string;
};

type MenuFormValues = {
  item: string;
  url: string;
};

type MenuItem = {
  id: string;
  name: string;
  children: MenuFormValues[];
};

const FormValidationBasic = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  console.log(menuItems);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      menu: "",
    },
  });

  const onSubmit = (value: FormValues) => {
    setMenuItems((prevMenuItems) => [
      ...prevMenuItems,
      { id: nanoid(), name: value.menu, children: [] },
    ]);
    reset();
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Add Menu Items" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-5 border-t space-y-6">
              <Grid container spacing={6}>
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
                        {...(errors.menu && {
                          error: true,
                          helperText: "This field is required.",
                        })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className="flex justify-end">
                <Button variant="contained" type="submit">
                  Add Menu
                </Button>
              </Grid>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Menu Structure" />
            {menuItems?.length > 0 && (
              <div className="border-t p-5">
                <MenuManagement menus={menuItems} setMenus={setMenuItems} />
              </div>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const MenuManagement = ({
  menus,
  setMenus,
}: {
  menus: MenuItem[];
  setMenus: (menus: MenuItem[]) => void;
}) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newMenus = [...menus];
    const [removed] = newMenus.splice(result.source.index, 1);
    newMenus.splice(result.destination.index, 0, removed);
    setMenus(newMenus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="menus">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {menus.map((menu, index) => (
              <Draggable key={menu.id} draggableId={menu.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <AccordionActions
                      item={menu}
                      index={index}
                      setMenus={setMenus}
                      menus={menus}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const AccordionActions = ({
  item,
  index,
  setMenus,
  menus,
}: {
  item: MenuItem;
  index: number;
  setMenus: (menus: MenuItem[]) => void;
  menus: MenuItem[];
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (value: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? value : false);
    };

  const expandIcon = (value: string) => (
    <i
      className={
        expanded === value ? "tabler-chevron-down" : "tabler-chevron-down"
      }
    />
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<MenuFormValues>({
    defaultValues: {
      item: item.name,
      url: slugify(`http://localhost:3001/${item.name}`),
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "item") {
        setValue("url", slugify(`http://localhost:3001/${value.item}`));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onSumMenuSubmit = (value: MenuFormValues) => {
    console.log(value);
  };

  const addChildMenu = () => {
    const newMenus = [...menus];
    const menuIndex = newMenus.findIndex((menu) => menu.id === item.id);
    newMenus[menuIndex].children.push({
      item: "New Submenu",
      url: slugify(`http://localhost:3001/New-Submenu`),
    });
    setMenus(newMenus);
  };

  const removeChildMenu = (childIndex: number) => {
    const newMenus = [...menus];
    const menuIndex = newMenus.findIndex((menu) => menu.id === item.id);
    newMenus[menuIndex].children.splice(childIndex, 1);
    setMenus(newMenus);
  };

  return (
    <Accordion
      expanded={expanded === item.name}
      onChange={handleChange(item.name)}>
      <AccordionSummary expandIcon={expandIcon(item.name)} className="w-full">
        <div className="flex justify-between flex-1">
          <Typography>{watch("item") || item.name}</Typography>
          <Typography variant="caption">Page</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(onSumMenuSubmit)}>
          <Grid container spacing={6} paddingTop={6}>
            <Grid item xs={12}>
              <Controller
                name="item"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Item"
                    placeholder="Item"
                    onChange={(e) => {
                      field.onChange(e);
                      setValue(
                        "url",
                        slugify(`http://localhost:3001/${e.target.value}`)
                      );
                    }}
                    {...(errors.item && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="url"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="URL"
                    value={watch("url")}
                    placeholder="URL"
                    {...(errors.url && {
                      error: true,
                      helperText: "This field is required.",
                    })}
                  />
                )}
              />
            </Grid>
            <div className="flex gap-4 justify-end flex-wrap md:flex-nowrap pl-6 mt-5">
              <Button
                variant="contained"
                type="submit"
                className="w-full sm:w-auto">
                Save Menu
              </Button>
              <Button
                variant="outlined"
                onClick={addChildMenu}
                className="w-full sm:w-auto">
                Add Submenu
              </Button>
            </div>
          </Grid>
        </form>
        {item.children.length > 0 && (
          <div className="pl-6 mt-5">
            {item.children.map((child, childIndex) => (
              <div key={childIndex} className="mb-4">
                <Typography variant="subtitle1">
                  {childIndex + 1}. {child.item}
                </Typography>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Controller
                      name={
                        `children[${childIndex}].item` as keyof MenuFormValues
                      }
                      control={control}
                      defaultValue={child.item}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label="Submenu Item"
                          placeholder="Submenu Item"
                          onChange={(e) => {
                            field.onChange(e);
                            const newMenus = [...menus];
                            const menuIndex = newMenus.findIndex(
                              (menu) => menu.id === item.id
                            );
                            newMenus[menuIndex].children[childIndex].item =
                              e.target.value;
                            newMenus[menuIndex].children[childIndex].url =
                              slugify(
                                `http://localhost:3001/${e.target.value}`
                              );
                            setMenus(newMenus);
                          }}
                          // {...(errors.children && {
                          //   error: true,
                          //   helperText: "This field is required.",
                          // })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={
                        `children[${childIndex}].url` as keyof MenuFormValues
                      }
                      control={control}
                      defaultValue={child.url}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label="Submenu URL"
                          value={getValues(
                            `children[${childIndex}].url` as keyof MenuFormValues
                          )}
                          placeholder="Submenu URL"
                          // {...(errors.children && {
                          //   error: true,
                          //   helperText: "This field is required.",
                          // })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      onClick={() => removeChildMenu(childIndex)}
                      className="w-full sm:w-auto">
                      Remove Submenu
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ))}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default FormValidationBasic;
