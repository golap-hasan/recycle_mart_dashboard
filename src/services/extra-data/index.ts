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

export const updateExtraLink = async (linkKey: string, link: string) => {
  try {
    const res = await serverFetch("/extra-data/link", {
      method: "POST",
      body: JSON.stringify({ linkKey, link }),
    });
    if (res.success) {
      updateTag("extra-data");
    }
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update link" };
  }
};

export const updateExtraHeading = async (heading: string[]) => {
  try {
    const res = await serverFetch("/extra-data/heading", {
      method: "POST",
      body: JSON.stringify({ heading }),
    });
    if (res.success) {
      updateTag("extra-data");
    }
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update heading" };
  }
};
