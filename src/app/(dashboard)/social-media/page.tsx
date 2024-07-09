import React from "react";
import FormValidationBasic from "./FormValidationBasic";
import { fetchFn } from "@/lib/servet-utils";

export default async function page() {
  let socialLinks = [];
  try {
    const data = await fetchFn(`/site/social-links`, {
      method: "GET",
      next: {
        revalidate: 0,
        cache: "no-store",
      },
    });
    socialLinks = data.socialLinks;
  } catch (error) {
    console.log(error);
  }
  return <FormValidationBasic socialLinks={socialLinks} />;
}
