/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { updateTag } from "next/cache";

export const getPageByType = async (type: string) => {
  try {
    return await serverFetch(`/page/retrieve/${type}`, {
      next: { tags: [`PAGE-${type}`], revalidate: 3600 },
    });
  } catch {
    return { success: false, data: null };
  }
};

export const createOrUpdatePage = async (data: {
  title: string;
  type: string;
  content: string;
}) => {
  try {
    const res = await serverFetch("/page/create-or-update", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (res.success) {
      updateTag(`PAGE-${data.type}`);
    }
    return res;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update page content",
    };
  }
};
