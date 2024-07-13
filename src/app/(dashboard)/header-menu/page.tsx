import React from "react";
import FormValidationBasic from "./FormValidationBasic";
import { fetchFn } from "@/lib/servet-utils";

export default async function page() {
  let menus = [];
  try {
    const data = await fetchFn(`/site/menus`, {
      method: "GET",
      next: {
        revalidate: 0,
        cache: "no-store",
      },
    });
    menus = data.menus;
  } catch (error) {
    console.log(error);
  }
  return <FormValidationBasic />;
}
