/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { buildQueryString } from "@/lib/buildQueryString";
import { serverFetch } from "@/lib/fetcher";
import { updateTag } from "next/cache";

export const getAllAds = async (query: Record<string, string | string[] | undefined> = {}) => {
  try {
    return await serverFetch(`/ad/admin${buildQueryString(query)}`, {
      revalidate: 300,
      tags: ["AD-LIST"],
    });
  } catch {
    return { success: false, data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
  }
};

export const approveAd = async (adId: string) => {
  try {
    const res = await serverFetch(`/ad/${adId}/approve`, {
      method: "PATCH",
    });
    if (res.success) updateTag("AD-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to approve ad" };
  }
};

export const rejectAd = async (adId: string, data: { reason: string; note?: string }) => {
  try {
    const res = await serverFetch(`/ad/${adId}/reject`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (res.success) updateTag("AD-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to reject ad" };
  }
};

export const deleteAd = async (adId: string) => {
  try {
    const res = await serverFetch(`/ad/${adId}`, {
      method: "DELETE",
    });
    if (res.success) updateTag("AD-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to delete ad" };
  }
};
