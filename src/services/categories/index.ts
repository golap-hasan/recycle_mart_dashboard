/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { buildQueryString } from "@/lib/buildQueryString";
import { serverFetch } from "@/lib/fetcher";
import { updateTag } from "next/cache";

// GET ALL CATEGORIES
export const getAllCategories = async (query: Record<string, string | string[] | undefined> = {}) => {
  try {
    return await serverFetch(`/category${buildQueryString(query)}`, {
      revalidate: 300,
      tags: ["CATEGORY-LIST"],
    });
  } catch {
    return { success: false, data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
  }
};

// CREATE CATEGORY
export const createCategory = async (formData: FormData) => {
  try {
    const res = await serverFetch("/category", {
      method: "POST",
      body: formData, // serverFetch should handle FormData
    });
    if (res.success) updateTag("CATEGORY-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to create category" };
  }
};

// UPDATE CATEGORY
export const updateCategory = async (categoryId: string, formData: FormData) => {
  try {
    const res = await serverFetch(`/category/${categoryId}`, {
      method: "PUT",
      body: formData,
    });
    if (res.success) updateTag("CATEGORY-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update category" };
  }
};

// DELETE CATEGORY
export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await serverFetch(`/category/${categoryId}`, {
      method: "DELETE",
    });
    if (res.success) updateTag("CATEGORY-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to delete category" };
  }
};
