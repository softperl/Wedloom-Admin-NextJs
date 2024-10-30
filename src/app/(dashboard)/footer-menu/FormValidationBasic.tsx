"use client";

import CustomTextField from "@/@core/components/mui/TextField";
import useSiteMenu from "@/lib/hooks/useSiteMenu";
import { cn, handelError, slugify } from "@/lib/utils";
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
import { newFooterMenu, newMenu } from "@/lib/api";
import { toast } from "react-hot-toast";

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

  const onSubmit = async (data: any) => {
    console.log(data.menuItems); // Handle form submission with the entire data

    try {
      await newFooterMenu({
        id: nanoid(),
        menus: data.menuItems,
      });
      methods.resetField(
        "menuItems" // Reset the 'menuItems' field
      );
      toast.success("Menu Added");
    } catch (error) {
      console.log(error);
      handelError(error);
    }
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
