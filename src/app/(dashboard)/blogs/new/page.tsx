import React from "react";

import FormValidationBasic from "./FormValidationBasic";
import { fetchFn } from "@/lib/servet-utils";

export default async function page() {
  let data = null;
  let authorData = null;

  try {
    data = await fetchFn(`/blog/category/get-all`, {
      method: "GET",
      next: {
        revalidate: 0,
        tags: ["categories"],
      },
    });
  } catch (error) {
    console.log(error);
  }

  try {
    authorData = await fetchFn(`/blog/author/get-all`, {
      method: "GET",
      next: {
        revalidate: 0,
        tags: ["authors"],
      },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <FormValidationBasic
      categories={data?.categories}
      authors={authorData?.authors}
    />
  );
}
