"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";
import { updateTag } from "next/cache";

// GET ALL VENDORS
export const getAllVendors = async (query: Record<string, any> = {}) => {
  const accessToken = await getValidAccessTokenForServerActions();
  
  const queryString = new URLSearchParams(query as any).toString();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/vendor/admin?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 300,
          tags: ["VENDOR-LIST"],
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch");

    return await res.json();
  } catch {
    return {
      success: false,
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    };
  }
};

// APPROVE VENDOR
export const approveVendor = async (vendorId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/vendor/${vendorId}/approve`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();

    if (result?.success) {
      updateTag("VENDOR-LIST"); 
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

// REJECT VENDOR
export const rejectVendor = async (vendorId: string, reason: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/vendor/${vendorId}/reject`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      }
    );

    const result = await res.json();
    if (result?.success) {
      updateTag("VENDOR-LIST");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

// BLOCK VENDOR
export const blockVendor = async (vendorId: string, reason: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/vendor/${vendorId}/block`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      }
    );

    const result = await res.json();
    if (result?.success) {
      updateTag("VENDOR-LIST");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

// UNBLOCK VENDOR
export const unblockVendor = async (vendorId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/vendor/${vendorId}/unblock`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();
    if (result?.success) {
      updateTag("VENDOR-LIST");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};
