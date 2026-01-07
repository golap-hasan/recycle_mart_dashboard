/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { buildQueryString } from "@/lib/buildQueryString";
import { serverFetch } from "@/lib/fetcher";
import { updateTag } from "next/cache";

// GET ALL VENDORS
export const getAllVendors = async (query: Record<string, string | string[] | undefined> = {}) => {
  try {
    return await serverFetch(`/vendor/admin${buildQueryString(query)}`, {
      revalidate: 300,
      tags: ["VENDOR-LIST"],
    });
  } catch {
    return { success: false, data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
  }
};

// APPROVE VENDOR
export const approveVendor = async (vendorId: string) => {
  try {
    const result = await serverFetch(`/vendor/${vendorId}/approve`, {
      method: "PATCH",
    });

    if (result?.success) updateTag("VENDOR-LIST");
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

// REJECT VENDOR
export const rejectVendor = async (vendorId: string, reason: string): Promise<any> => {
  try {
    const result = await serverFetch(`/vendor/${vendorId}/reject`, {
        method: "PATCH",
        body: JSON.stringify({ reason }),
      }
    );

    if (result?.success) updateTag("VENDOR-LIST");
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

// BLOCK VENDOR
export const blockVendor = async (vendorId: string, reason: string): Promise<any> => {
  try {
    const result = await serverFetch(`/vendor/${vendorId}/block`, {
      method: "PATCH",
      body: JSON.stringify({ reason }),
    });

    if (result?.success) updateTag("VENDOR-LIST");
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

// UNBLOCK VENDOR
export const unblockVendor = async (vendorId: string, reason: string): Promise<any> => {
  try {
    const result = await serverFetch(`/vendor/${vendorId}/unblock`, {
      method: "PATCH",
      body: JSON.stringify({ reason }),
    });

    if (result?.success) updateTag("VENDOR-LIST");
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

