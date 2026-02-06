/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { buildQueryString } from "@/lib/buildQueryString";
import { serverFetch } from "@/lib/fetcher";
import { QueryParams } from "@/types/global.types";
import { updateTag } from "next/cache";

export const getAllLotteries = async (query: QueryParams = {}) => {
  
  try {
    return await serverFetch(`/lottery/admin${buildQueryString(query)}`, {
      next: { tags: ["LOTTERY-LIST"], revalidate: 3600 },
    });
  } catch {
    return { success: false, data: [], meta: {} };
  }
};

export const createLottery = async (formData: FormData) => {
  try {
    // Postman অনুযায়ী lotteryImage এবং data (JSON string) আলাদাভাবে পাঠাতে হবে
    const res = await serverFetch("/lottery", {
      method: "POST",
      body: formData,
    });
    if (res.success) updateTag("LOTTERY-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to create lottery" };
  }
};

export const updateLottery = async (id: string, formData: FormData) => {
  try {
    const res = await serverFetch(`/lottery/${id}`, {
      method: "PATCH",
      body: formData,
    });
    if (res.success) updateTag("LOTTERY-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update lottery" };
  }
};

export const runLotteryDraw = async (id: string) => {
  try {
    const res = await serverFetch(`/lottery/${id}/draw`, {
      method: "POST",
    });
    if (res.success) updateTag("LOTTERY-LIST");
    return res;
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to run draw" };
  }
};
