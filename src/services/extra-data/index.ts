/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { updateTag } from "next/cache";

export const getExtraData = async () => {
  try {
    const res = await serverFetch("/extra-data", {
      next: { tags: ["extra-data"] },
    });
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to fetch extra data" };
  }
};

export const upsertExtraData = async (formData: FormData) => {
  try {
    const res = await serverFetch("/extra-data", {
      method: "POST",
      body: formData,
    });
    if (res.success) {
      updateTag("extra-data");
    }
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update extra data" };
  }
};
