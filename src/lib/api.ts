import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

API.interceptors.request.use((req: any) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  req.headers.Authorization = `Bearer ${accessToken}`;
  req.headers["x-refresh-token"] = refreshToken;
  return req;
});

API.interceptors.response.use(
  (res) => {
    const newAccessToken = res.headers["x-access-token"];
    if (newAccessToken) {
      setCookie("accessToken", newAccessToken);
    }
    return res;
  },
  async (error) => {
    if (error.response.status === 401) {
      setCookie("accessToken", "");
      setCookie("refreshToken", "");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

//Auth
export const logout = () => API.delete("/auth/logout");
export const getRoleFe = () => API.get("/auth/get-role");
export const renewAccessToken = (formData: { refreshToken: string }) =>
  API.post("/auth/renew", formData);
export const signIn = (formData: any) =>
  API.post("/auth/login-admin", formData);
export const getAllUsers = () => API.get("/admin/auth/get-all-users");

//Blog
export const newPost = (formData: any) => API.post("/blog/post/new", formData);
export const newCategory = (formData: any) =>
  API.post("/blog/category/new", formData);
export const deleteCategory = (id: string) =>
  API.delete(`/blog/category/delete/${id}`);
export const newAuthor = (formData: any) =>
  API.post("/blog/author/new", formData);
export const deleteAuthor = (id: string) =>
  API.delete(`/blog/author/delete/${id}`);
export const deletePost = (id: string) => API.delete(`/blog/post/delete/${id}`);

//Site
export const getTerms = () => API.get("/site/terms");
export const newAbout = (formData: any) =>
  API.post("/site/about/new", formData);
export const newTerms = (formData: any) =>
  API.post("/site/terms/new", formData);
export const deleteTerms = () => API.delete("/site/terms/delete");

export const getPrivacy = () => API.get("/site/privacy");
export const newPrivacy = (formData: any) =>
  API.post("/site/privacy/new", formData);
export const deletePrivacy = () => API.delete("/site/privacy/delete");

export const getRefund = () => API.get("/site/refund");
export const newRefund = (formData: any) =>
  API.post("/site/refund/new", formData);
export const deleteRefund = () => API.delete("/site/refund/delete");
export const newMenu = (formData: any) => API.post("/site/menu/new", formData);
export const getMenus = () => API.get("/site/menus");
export const deleteMenu = (id: string) => API.delete(`/site/menu/delete/${id}`);
export const newFooterMenu = (formData: any) =>
  API.post("/site/menu-footer/new", formData);
export const getFooterMenus = () => API.get("/site/menus-footer");
export const newSocialLinks = (formData: any) =>
  API.post("/site/social-links/new", formData);
export const createPlan = (formData: any) =>
  API.post("/site/plans/new", formData);
export const newStep = (formData: any) => API.post("/site/steps/new", formData);
export const getSteps = () => API.get("/site/get-all-steps");

export const newPlan = (formData: any) => API.post("/site/plans/new", formData);
export const getPlans = () => API.get("/site/plans");

export const newCity = (formData: any) => API.post("/site/city/new", formData);
export const getCities = () => API.get("/site/cities");
export const deleteCity = (cityId: string) =>
  API.delete(`/site/city/delete/${cityId}`);

export const newVendorCategory = (formData: any) =>
  API.post("/site/vendor-category/new", formData);
export const getVendorCategories = () => API.get("/site/vendor-categories");

//Question
export const newQuestion = (formData: any) =>
  API.post("/question/new", formData);
export const deleteQuestion = (id: string) =>
  API.delete(`/question//delete/${id}`);

//Approval
export const finalApproval = (formData: any) => {
  API.post(`/vendor/final-approval`, formData);
};
export const approvalByUserId = (formData: any) => {
  API.post(`/vendor/approval-userId`, formData);
};
