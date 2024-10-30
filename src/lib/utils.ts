import { type ClassValue, clsx } from "clsx";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NumberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function handelError(error: any) {
  console.log(error);
  toast.error(
    error.response?.data?.message ||
      error.response?.data?.msg ||
      error.message ||
      "Something went wrong"
  );
}

export const slugify = (title: string): string => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
};

export const uploadFiles = async (files: any[], dir: string = "others") => {
  if (!files) {
    return false;
  }
  const formData = new FormData();
  files.forEach((file: string | Blob) => {
    formData.append("files", file);
  });
  formData.append("dir", dir);
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  const requestOptions: any = {
    method: "POST",
    body: formData,
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-refresh-token": refreshToken,
    },
  };
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      requestOptions
    );
    const data = await resp.json();
    const { files } = data;
    return files;
  } catch (error) {
    console.log(error);
    return false;
  }
};
