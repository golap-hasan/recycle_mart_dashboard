/* eslint-disable @typescript-eslint/no-explicit-any */
 
"use server";

import { buildQueryString } from "@/lib/buildQueryString";
import { serverFetch } from "@/lib/fetcher";
import { updateTag } from "next/cache";

// GET ALL ADMINS
export const getAllAdmins = async (query: Record<string, string | string[] | undefined> = {}) => {
  try {
    return await serverFetch(`/admin${buildQueryString(query)}`, {
      revalidate: 300,
      tags: ["ADMIN-LIST"],
    });
  } catch {
    return { success: false, data: [], meta: { total: 0, page: 1, limit: 10, totalPage: 0 } };
  }
};

// CREATE ADMIN
export const createAdmin = async (data: any) => {
  try {
    const res = await serverFetch("/admin", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.success) updateTag("ADMIN-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to create admin" };
  }
};

// UPDATE ADMIN
export const updateAdmin = async (id: string, data: any) => {
  try {
    const res = await serverFetch(`/admin/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (res.success) updateTag("ADMIN-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update admin" };
  }
};

// DELETE ADMIN
export const deleteAdmin = async (id: string) => {
  try {
    const res = await serverFetch(`/admin/${id}`, {
      method: "DELETE",
    });
    if (res.success) updateTag("ADMIN-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to delete admin" };
  }
};
