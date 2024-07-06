import React from "react";

import FormValidationBasic from "./FormValidationBasic";
import { fetchFn } from "@/lib/servet-utils";

export default async function page() {
  let aboutData = null;

  try {
    const data = await fetchFn(`/site/about`, {
      method: "GET",
      next: {
        revalidate: 0,
      },
    });
    aboutData = data.about;
  } catch (error) {
    console.log(error);
  }
  return <FormValidationBasic aboutData={aboutData} />;
}
