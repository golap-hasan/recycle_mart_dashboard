"use server";

import { buildQueryString } from "@/lib/buildQueryString";
import { serverFetch } from "@/lib/fetcher";
import { updateTag } from "next/cache";

export const getAllUsers = async (query: Record<string, string | string[] | undefined> = {}) => {
  try {
    return await serverFetch(`/user/admin-get-all${buildQueryString(query)}`, {
      revalidate: 300,
      tags: ["USER-LIST"],
    });
  } catch {
    return { success: false, data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
  }
};

export const toggleUserBlock = async (id: string) => {
  try {
    const res = await serverFetch(`/admin/users/${id}/toggle-block`, {
      method: "PATCH",
    });
    if (res.success) {
      updateTag("USER-LIST");
    }
    return res;
  } catch {
    return { success: false, message: "Something went wrong" };
  }
};