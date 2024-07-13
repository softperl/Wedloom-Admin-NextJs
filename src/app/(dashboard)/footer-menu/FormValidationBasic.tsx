"use client";

import CustomTextField from "@/@core/components/mui/TextField";
import useSiteMenu from "@/lib/hooks/useSiteMenu";
import { cn, slugify } from "@/lib/utils";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { MenuForm, MenuItem } from "./menuForm";

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

const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(
  ({ theme }) => ({
    borderBlockEnd: "0 !important",
    minHeight: theme.spacing(11.5),
    transition: "min-height 0.15s ease-in-out",
    backgroundColor: "var(--mui-palette-customColors-greyLightBg)",
    "&.Mui-expanded": {
      minHeight: theme.spacing(11.5),
      borderBlockEnd: "1px solid var(--mui-palette-divider) !important",
      "& .MuiAccordionSummary-expandIconWrapper": {
        transform: "rotate(180deg)",
      },
    },
  })
);

interface FormValues {
  menuItems: MenuItem[];
}

const FormValidationBasic = () => {
  const { menuItems, setMenuItems } = useSiteMenu();
  const methods = useForm<FormValues>({ defaultValues: { menuItems } });

  const onSubmit = (data: FormValues) => {
    console.log(data); // Handle form submission with the entire data
  };

  return (
    <Grid container spacing={6}>
      <MenuForm />
      <Grid item xs={12} md={8}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader title="Menu Structure" />
              {menuItems?.length > 0 && (
                <div className="border-t p-5">
                  <MenuManagement menuItems={menuItems} />
                </div>
              )}
            </Card>
            {menuItems?.length > 0 && (
              <Grid item xs={12} marginTop={6}>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  className="w-full">
                  Save All
                </Button>
              </Grid>
            )}
          </form>
        </FormProvider>
      </Grid>
    </Grid>
  );
};

const MenuManagement = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return menuItems?.map((item, index) => (
    <div key={index} className={cn(index !== 0 && "mt-4")}>
      <AccordionActions item={item} />
    </div>
  ));
};

const AccordionActions = ({ item }: { item: MenuItem }) => {
  const { menuItems, setMenuItems } = useSiteMenu();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (value: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
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
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  const currentIndex = menuItems.findIndex(
    (menuItem) => menuItem.id === item.id
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: `menuItems.${currentIndex}.subMenus`,
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.includes("name")) {
        setValue(
          `menuItems.${currentIndex}.url`,
          slugify(`/${value?.menuItems![currentIndex]?.name}`)
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, menuItems, currentIndex]);

  const handleDeleteClick = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setMenuItems(
      menuItems.filter((menuItem: MenuItem) => menuItem.id !== item.id)
    );
  };

  const addSubmenu = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    append({
      id: nanoid(),
      categoryName: "",
      children: [],
    });
  };

  return (
    <Accordion
      expanded={expanded === item.name}
      onChange={handleChange(item.name)}>
      <AccordionSummary expandIcon={expandIcon(item.name)} className="w-full">
        <div className="flex justify-between items-center flex-1">
          <Typography>
            {watch(`menuItems.${currentIndex}.name`) || item.name}
          </Typography>
          <div className="">
            <IconButton color="error" onClick={handleDeleteClick}>
              <i className="tabler-trash text-[20px] text-error" />
            </IconButton>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} className="pt-2">
          <Grid item xs={12}>
            <Controller
              name={`menuItems.${currentIndex}.name`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Name"
                  placeholder="Name"
                  error={!!errors.menuItems?.[currentIndex]?.name}
                  helperText={
                    errors.menuItems?.[currentIndex]?.name && "Name is required"
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name={`menuItems.${currentIndex}.url`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="URL"
                  placeholder="URL"
                  error={!!errors.menuItems?.[currentIndex]?.url}
                  helperText={
                    errors.menuItems?.[currentIndex]?.url && "URL is required"
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} className="">
            <Divider />
          </Grid>
          <Grid item xs={12} className="flex justify-end">
            <Button variant="outlined" onClick={addSubmenu}>
              Add Submenu
            </Button>
          </Grid>
          {fields?.length > 0 && (
            <Grid item xs={12}>
              <div className="border rounded-md px-5 pt-5">
                {fields.map((field, index) => {
                  return (
                    <div key={index}>
                      <div className="flex w-full gap-2 py-2">
                        <Controller
                          name={`menuItems.${currentIndex}.subMenus.${index}.categoryName`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <CustomTextField
                              {...field}
                              fullWidth
                              label="Category Name"
                              placeholder="Category Name"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              error={
                                !!errors.menuItems?.[currentIndex]?.subMenus?.[
                                  index
                                ]?.categoryName
                              }
                              helperText={
                                errors.menuItems?.[currentIndex]?.subMenus?.[
                                  index
                                ]?.categoryName && "Category Name is required"
                              }
                            />
                          )}
                        />
                        <Grid className="flex">
                          <IconButton
                            onClick={() => remove(index)}
                            color="error"
                            className={cn(
                              errors.menuItems?.[currentIndex]?.subMenus?.[
                                index
                              ]
                                ? "mt-0"
                                : "mt-5"
                            )}>
                            <i className="tabler-trash text-error" />
                          </IconButton>
                        </Grid>
                      </div>

                      <SubMenuChildren
                        parentIndex={currentIndex}
                        subIndex={index}
                      />
                    </div>
                  );
                })}
              </div>
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const SubMenuChildren = ({
  parentIndex,
  subIndex,
}: {
  parentIndex: number;
  subIndex: number;
}) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `menuItems.${parentIndex}.subMenus.${subIndex}.children`,
  });

  const addChildren = () => {
    append({
      id: nanoid(),
      name: "",
      url: "",
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      fields.forEach((field, index) => {
        const childNamePath =
          `menuItems.${parentIndex}.subMenus.${subIndex}.children.${index}.name` as const;
        const childUrlPath =
          `menuItems.${parentIndex}.subMenus.${subIndex}.children.${index}.url` as const;

        if (name === childNamePath) {
          const childName =
            value.menuItems?.[parentIndex]?.subMenus?.[subIndex]?.children?.[
              index
            ]?.name || "";
          setValue(childUrlPath, slugify(`/${childName}`));
        }
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, parentIndex, subIndex, fields]);

  return (
    <Grid className="my-6 mx-auto">
      {fields.map((field, index) => (
        <Grid
          container
          item
          xs={12}
          spacing={2}
          key={index}
          className="relative pb-6 pl-6">
          <Grid item xs={12}>
            <Controller
              name={`menuItems.${parentIndex}.subMenus.${subIndex}.children.${index}.name`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Child Name"
                  placeholder="Child Name"
                  error={
                    !!errors.menuItems?.[parentIndex]?.subMenus?.[subIndex]
                      ?.children?.[index]?.name
                  }
                  helperText={
                    errors.menuItems?.[parentIndex]?.subMenus?.[subIndex]
                      ?.children?.[index]?.name && "Child Name is required"
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name={`menuItems.${parentIndex}.subMenus.${subIndex}.children.${index}.url`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Child URL"
                  placeholder="Child URL"
                  error={
                    !!errors.menuItems?.[parentIndex]?.subMenus?.[subIndex]
                      ?.children?.[index]?.url
                  }
                  helperText={
                    errors.menuItems?.[parentIndex]?.subMenus?.[subIndex]
                      ?.children?.[index]?.url && "Child URL is required"
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={2} className="flex absolute -top-4 right-0">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                remove(index);
              }}
              color="error">
              <i className="tabler-trash text-error" />
            </IconButton>
          </Grid>
          {index < fields.length - 1 && (
            <Grid item xs={12} className="pt-6">
              <Divider />
            </Grid>
          )}
        </Grid>
      ))}
      <Grid item xs={12} className="flex justify-end">
        <Button variant="outlined" onClick={addChildren}>
          Add Child
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormValidationBasic;

// "use client";

// import { deleteMenu, newMenu } from "@/lib/api";
// // MUI Imports
// import { cn, slugify } from "@/lib/utils";
// import CustomTextField from "@core/components/mui/TextField";
// import { Divider } from "@mui/material";
// import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import MuiAccordionSummary, {
//   AccordionSummaryProps,
// } from "@mui/material/AccordionSummary";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
// import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";
// import { styled } from "@mui/material/styles";
// import { nanoid } from "nanoid";
// import { SyntheticEvent, useEffect, useState } from "react";
// import {
//   DragDropContext,
//   Draggable,
//   DropResult,
//   Droppable,
// } from "react-beautiful-dnd";
// import { Controller, useFieldArray, useForm } from "react-hook-form";

// // Styled component for Accordion component
// const Accordion = styled(MuiAccordion)<AccordionProps>({
//   margin: "0 !important",
//   borderRadius: 0,
//   boxShadow: "none !important",
//   border: "1px solid var(--mui-palette-divider)",
//   "&:not(:last-of-type)": {
//     borderBottom: 0,
//   },
//   "&:before": {
//     display: "none",
//   },
//   "&:first-of-type": {
//     "& .MuiButtonBase-root": {
//       borderTopLeftRadius: "var(--mui-shape-borderRadius)",
//       borderTopRightRadius: "var(--mui-shape-borderRadius)",
//     },
//   },
//   "&:last-of-type": {
//     "& .MuiAccordionSummary-root:not(.Mui-expanded)": {
//       borderBottomLeftRadius: "var(--mui-shape-borderRadius)",
//       borderBottomRightRadius: "var(--mui-shape-borderRadius)",
//     },
//     "& .MuiAccordionSummary-root:is(.Mui-expanded)": {
//       borderBottom: "1px solid var(--mui-palette-divider)",
//     },
//   },
// });

// const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(
//   ({ theme }) => ({
//     borderBlockEnd: "0 !important",
//     minHeight: theme.spacing(11.5),
//     transition: "min-height 0.15s ease-in-out",
//     backgroundColor: "var(--mui-palette-customColors-greyLightBg)",
//     "&.Mui-expanded": {
//       minHeight: theme.spacing(11.5),
//       borderBlockEnd: "1px solid var(--mui-palette-divider) !important",
//       "& .MuiAccordionSummary-expandIconWrapper": {
//         transform: "rotate(180deg)",
//       },
//     },
//   })
// );

// const MenuPosition = [
//   {
//     value: "Primary Menu",
//   },
//   {
//     value: "Footer Menu",
//   },
// ];

// type MenuPositionValues = {
//   position: string;
// };

// type FormValues = {
//   menu: string;
// };

// export type MenuFormValues = {
//   item: string;
//   url: string;
//   children: { id: string; item: string; url: string }[];
// };

// type MenuItem = {
//   id: string;
//   name: string;
//   url: string;
//   children: MenuFormValues[];
// };

// const FormValidationBasic = ({ menus }: any) => {
//   const formatedMenus = menus?.map((menu: any) => {
//     return {
//       id: menu.id,
//       name: menu.title,
//       url: menu.href,
//       children: menu.subMenus.map((m: any) => {
//         return {
//           item: m.title,
//           url: m.href,
//         };
//       }),
//     };
//   });
//   const [menuItems, setMenuItems] = useState<MenuItem[]>(formatedMenus || []);
//   // console.log(menuItems);
//   const {
//     control,
//     reset,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       menu: "",
//     },
//   });

//   const onSubmit = (value: FormValues) => {
//     // Check for duplicates
//     const isDuplicate = menuItems.some(
//       (menuItem) => menuItem.name.toLowerCase() === value.menu.toLowerCase()
//     );
//     if (isDuplicate) {
//       alert("Menu item already exists!");
//       return;
//     }

//     setMenuItems((prevMenuItems) => [
//       ...prevMenuItems,
//       {
//         id: nanoid(),
//         name: value.menu,
//         url: slugify(value.menu),
//         children: [],
//       },
//     ]);

//     reset();
//   };

//   const removeMenuItem = (id: string) => {
//     setMenuItems((prevMenuItems) =>
//       prevMenuItems.filter((menuItem) => menuItem.id !== id)
//     );
//   };

//   return (
//     <>
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={4} className="flex flex-col gap-6">
//           <Card>
//             <CardHeader title="Add Footer Menu Items" />
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="p-5 border-t space-y-6">
//               <Grid container spacing={6}>
//                 <Grid item xs={12}>
//                   <Controller
//                     name="menu"
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }) => (
//                       <CustomTextField
//                         {...field}
//                         fullWidth
//                         label="Menu"
//                         placeholder="Menu"
//                         {...(errors.menu && {
//                           error: true,
//                           helperText: "This field is required.",
//                         })}
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid item xs={12} className="flex justify-end">
//                   <Button variant="contained" type="submit">
//                     Add Menu
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <Card>
//             <CardHeader title="Menu Structure" />
//             {menuItems?.length > 0 && (
//               <div className="border-t p-5">
//                 <MenuManagement
//                   menus={menuItems}
//                   setMenus={setMenuItems}
//                   removeMenuItem={removeMenuItem}
//                 />
//               </div>
//             )}
//           </Card>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// const MenuManagement = ({
//   menus,
//   setMenus,
//   removeMenuItem,
// }: {
//   menus: MenuItem[];
//   setMenus: (menus: MenuItem[]) => void;
//   removeMenuItem: (id: string) => void;
// }) => {
//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;

//     const newMenus = [...menus];
//     const [removed] = newMenus.splice(result.source.index, 1);
//     newMenus.splice(result.destination.index, 0, removed);
//     setMenus(newMenus);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="menus">
//         {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {menus.map((menu, index) => (
//               <Draggable key={menu.id} draggableId={menu.id} index={index}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     className={cn(index !== 0 && "mt-4")}>
//                     <AccordionActions
//                       item={menu}
//                       setMenus={setMenus}
//                       removeMenuItem={removeMenuItem}
//                     />
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// const AccordionActions = ({
//   item,
//   setMenus,
//   removeMenuItem,
// }: {
//   item: MenuItem;
//   setMenus: (menus: any) => void;
//   removeMenuItem: (id: string) => void;
// }) => {
//   const [expanded, setExpanded] = useState<string | false>(false);

//   const handleChange =
//     (value: string) => (event: SyntheticEvent, isExpanded: boolean) => {
//       setExpanded(isExpanded ? value : false);
//     };

//   const expandIcon = (value: string) => (
//     <i
//       className={
//         expanded === value ? "tabler-chevron-down" : "tabler-chevron-down"
//       }
//     />
//   );

//   const {
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<MenuFormValues>({
//     defaultValues: {
//       item: item.name,
//       url: slugify(`/${item.name}`),
//       children: item.children,
//     },
//   });

//   const { fields, append, remove, move } = useFieldArray({
//     control,
//     name: "children",
//   });

//   useEffect(() => {
//     const subscription = watch((value, { name, type }) => {
//       if (name === "item") {
//         setValue("url", slugify(`/${value.item}`));
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setValue]);

//   const handleDeleteClick = async (e: SyntheticEvent) => {
//     e.stopPropagation();
//     removeMenuItem(item.id);
//     await deleteMenu(item.id);
//   };

//   const addSubmenu = (e: SyntheticEvent) => {
//     e.stopPropagation();
//     append({
//       id: nanoid(), // Generate ID once when adding
//       item: "",
//       url: slugify(`/${item?.children}`),
//     });
//   };

//   const isDuplicate = fields.some(
//     (child, index) => fields.findIndex((c) => c.item === child.item) !== index
//   );

//   const onSubmit = async (data: MenuFormValues) => {
//     if (isDuplicate) {
//       alert("Submenu items must be unique!");
//       return;
//     }

//     setMenus((prevMenus: MenuItem[]) =>
//       prevMenus.map((menu) =>
//         menu.id === item.id
//           ? { ...menu, name: data.item, url: data.url, children: data.children }
//           : menu
//       )
//     );
//     const parentMenu = {
//       title: item.name,
//       href: item.url,
//     };
//     const submenus = data.children.map((child) => ({
//       title: child.item,
//       href: child.url,
//     }));
//     console.log(parentMenu);
//     try {
//       await newMenu({
//         title: parentMenu.title,
//         href: parentMenu.href,
//         subMenus: submenus,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeSubmenuById = (id: string) => {
//     const findChildIndexById = (fields: any, id: string) => {
//       return fields.findIndex((field: any) => field.id === id);
//     };

//     const index = findChildIndexById(fields, id);

//     if (index !== -1) {
//       item.children = item.children.filter((_, idx) => idx !== index);
//       remove(index);
//     }
//   };

//   const moveSubmenu = (fromIndex: number, toIndex: number) => {
//     move(fromIndex, toIndex);
//   };

//   const onSubmenuDragEnd = (result: DropResult) => {
//     if (!result.destination) return;

//     move(result.source.index, result.destination.index);
//   };

//   return (
//     <Accordion
//       expanded={expanded === item.name}
//       onChange={handleChange(item.name)}>
//       <AccordionSummary expandIcon={expandIcon(item.name)} className="w-full">
//         <div className="flex justify-between items-center flex-1">
//           <Typography>{watch("item") || item.name}</Typography>
//           <div className="">
//             <IconButton color="error" onClick={handleDeleteClick}>
//               <i className="tabler-trash text-[20px] text-error" />
//             </IconButton>
//           </div>
//         </div>
//       </AccordionSummary>
//       <AccordionDetails>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={6} paddingTop={6}>
//             <Grid item xs={12}>
//               <Controller
//                 name="item"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label="Item"
//                     placeholder="Item"
//                     onChange={(e) => {
//                       field.onChange(e);
//                       setValue("url", slugify(`/${e.target.value}`));
//                     }}
//                     {...(errors.item && {
//                       error: true,
//                       helperText: "This field is required.",
//                     })}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Controller
//                 name="url"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label="URL"
//                     value={watch("url")}
//                     placeholder="URL"
//                     {...(errors.url && {
//                       error: true,
//                       helperText: "This field is required.",
//                     })}
//                   />
//                 )}
//               />
//             </Grid>

//             {fields.length > 0 && (
//               <Grid container item xs={12}>
//                 <Grid container item xs={12} className="border rounded-md">
//                   <Grid item xs={12}>
//                     <Grid
//                       xs={12}
//                       sx={{
//                         backgroundColor:
//                           "var(--mui-palette-customColors-greyLightBg)",
//                         color: "var(--mui-palette-customColors-greyDark)",
//                         fontSize: "1rem",
//                         fontWeight: "500",
//                         padding: "1rem",
//                         borderRadius: "0.25rem",
//                       }}
//                       className="flex items-center justify-between">
//                       <p>Sub Menu</p>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} className="mb-4">
//                     <Divider />
//                   </Grid>
//                   <DragDropContext onDragEnd={onSubmenuDragEnd}>
//                     <Droppable droppableId={`submenus-${item.id}`}>
//                       {(provided) => {
//                         return (
//                           <Grid
//                             xs={12}
//                             ref={provided.innerRef}
//                             {...provided.droppableProps}>
//                             {fields?.map((field, idx) => {
//                               return (
//                                 <Draggable
//                                   key={field.id}
//                                   draggableId={field.id}
//                                   index={idx}>
//                                   {(provided) => (
//                                     <Grid
//                                       container
//                                       item
//                                       spacing={6}
//                                       xs={12}
//                                       padding={4}
//                                       position={"relative"}
//                                       ref={provided.innerRef}
//                                       {...provided.draggableProps}
//                                       {...provided.dragHandleProps}>
//                                       <Grid item xs={12} md={6}>
//                                         <Controller
//                                           name={`children.${idx}.item`}
//                                           control={control}
//                                           rules={{ required: true }}
//                                           render={({ field }) => (
//                                             <CustomTextField
//                                               {...field}
//                                               fullWidth
//                                               label="Item"
//                                               placeholder="Item"
//                                               onChange={(e) => {
//                                                 field.onChange(e);
//                                                 setValue(
//                                                   `children.${idx}.url`,
//                                                   slugify(`/${e.target.value}`)
//                                                 );
//                                               }}
//                                               {...(errors.children?.[idx]
//                                                 ?.item && {
//                                                 error: true,
//                                                 helperText:
//                                                   "This field is required.",
//                                               })}
//                                             />
//                                           )}
//                                         />
//                                       </Grid>
//                                       <Grid item xs={12} md={6}>
//                                         <Controller
//                                           name={`children.${idx}.url`}
//                                           control={control}
//                                           rules={{ required: true }}
//                                           render={({ field }) => (
//                                             <CustomTextField
//                                               {...field}
//                                               fullWidth
//                                               label="URL"
//                                               value={watch(
//                                                 `children.${idx}.url`
//                                               )}
//                                               placeholder="URL"
//                                               {...(errors.children?.[idx]
//                                                 ?.url && {
//                                                 error: true,
//                                                 helperText:
//                                                   "This field is required.",
//                                               })}
//                                             />
//                                           )}
//                                         />
//                                       </Grid>
//                                       <div className="flex items-center justify-end flex-1 absolute top-5 right-4">
//                                         <IconButton
//                                           color="primary"
//                                           disabled={idx === fields.length - 1}
//                                           onClick={() =>
//                                             moveSubmenu(idx, idx + 1)
//                                           }>
//                                           <i className="tabler-arrow-down text-[20px] text-primary" />
//                                         </IconButton>
//                                         <IconButton
//                                           color="primary"
//                                           disabled={idx === 0}
//                                           onClick={() =>
//                                             moveSubmenu(idx, idx - 1)
//                                           }>
//                                           <i className="tabler-arrow-up text-[20px] text-primary" />
//                                         </IconButton>

//                                         <IconButton
//                                           color="error"
//                                           onClick={() =>
//                                             removeSubmenuById(field.id)
//                                           }>
//                                           <i className="tabler-trash text-[20px] text-error" />
//                                         </IconButton>
//                                       </div>
//                                     </Grid>
//                                   )}
//                                 </Draggable>
//                               );
//                             })}
//                             {provided.placeholder}
//                           </Grid>
//                         );
//                       }}
//                     </Droppable>
//                   </DragDropContext>
//                 </Grid>
//               </Grid>
//             )}
//             <Grid item xs={12}>
//               <Divider />
//             </Grid>
//             <Grid item xs={12} className="flex justify-end gap-2">
//               <Button variant="outlined" type="button" onClick={addSubmenu}>
//                 Add New
//               </Button>
//               <Button variant="contained" type="submit">
//                 Save
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default FormValidationBasic;
