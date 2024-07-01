"use client";

// MUI Imports
import { cn, slugify } from "@/lib/utils";
import CustomTextField from "@core/components/mui/TextField";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { nanoid } from "nanoid";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { Controller, useForm } from "react-hook-form";

// Styled component for Accordion component
const Accordion = styled(MuiAccordion)<AccordionProps>({
  margin: "0 !important",
  borderRadius: 0,
  boxShadow: "none !important",
  border: "1px solid var(--mui-palette-divider)",
  "&:not(:last-of-type)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&:first-of-type": {
    "& .MuiButtonBase-root": {
      borderTopLeftRadius: "var(--mui-shape-borderRadius)",
      borderTopRightRadius: "var(--mui-shape-borderRadius)",
    },
  },
  "&:last-of-type": {
    "& .MuiAccordionSummary-root:not(.Mui-expanded)": {
      borderBottomLeftRadius: "var(--mui-shape-borderRadius)",
      borderBottomRightRadius: "var(--mui-shape-borderRadius)",
    },
    "& .MuiAccordionSummary-root:is(.Mui-expanded)": {
      borderBottom: "1px solid var(--mui-palette-divider)",
    },
  },
});

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

  const removeMenuItem = (id: string) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.filter((menuItem) => menuItem.id !== id)
    );
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
                <MenuManagement
                  menus={menuItems}
                  setMenus={setMenuItems}
                  removeMenuItem={removeMenuItem}
                />
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
  removeMenuItem,
}: {
  menus: MenuItem[];
  setMenus: (menus: MenuItem[]) => void;
  removeMenuItem: (id: string) => void;
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
                    {...provided.dragHandleProps}
                    className={cn(index !== 0 && "mt-4")}>
                    <AccordionActions
                      item={menu}
                      index={index}
                      setMenus={setMenus}
                      menus={menus}
                      removeMenuItem={removeMenuItem}
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
  removeMenuItem,
}: {
  item: MenuItem;
  index: number;
  setMenus: (menus: MenuItem[]) => void;
  menus: MenuItem[];
  removeMenuItem: (id: string) => void;
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (value: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? value : false);
    };

  const expandIcon = (value: string) => (
    <i
      className={
        expanded === value ? "tabler-chevron-left" : "tabler-chevron-down"
      }
    />
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
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

  const handleDeleteClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    removeMenuItem(item.id);
  };

  return (
    <Accordion
      expanded={expanded === item.name}
      onChange={handleChange(item.name)}>
      <AccordionSummary expandIcon={expandIcon(item.name)} className="w-full">
        <div className="flex justify-between items-center flex-1">
          <Typography>{watch("item") || item.name}</Typography>
          <IconButton color="error" onClick={handleDeleteClick}>
            <i className="tabler-trash text-[20px] text-error" />
          </IconButton>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form>
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
                onClick={() => {}}
                className="w-full sm:w-auto">
                Add Submenu
              </Button>
            </div>
          </Grid>
        </form>
        {item?.children?.map((subItem, subId) => {
          return (
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="p-5 border-t space-y-6">
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  {/* <Controller
                            name="menu"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => ( */}
                  <CustomTextField
                    // {...field}
                    fullWidth
                    label={`Menu` + subItem}
                    placeholder={`Menu` + subItem}

                    // {...(errors.menu && {
                    //   error: true,
                    //   helperText: "This field is required.",
                    // })}
                  />
                  {/* )}
                          /> */}
                </Grid>
              </Grid>
              <Grid item xs={12} className="flex justify-end">
                <Button variant="contained" type="submit">
                  Add Menu
                </Button>
              </Grid>
            </form>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default FormValidationBasic;
