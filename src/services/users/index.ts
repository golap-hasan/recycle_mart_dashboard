/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";

export const getAllUsers = async (query: Record<string, any> = {}) => {
  const accessToken = await getValidAccessTokenForServerActions();
  
  const queryString = new URLSearchParams(query as any).toString();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/admin-get-all?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 300,
          tags: ["USER-LIST"],
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