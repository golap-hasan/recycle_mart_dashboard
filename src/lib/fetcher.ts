import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";

export const serverFetch = async (
  endpoint: string,
  options: RequestInit & { tags?: string[]; revalidate?: number } = {}
) => {
  const accessToken = await getValidAccessTokenForServerActions();
  const { tags, revalidate, ...rest } = options;

  const isFormData = rest.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}${endpoint}`, {
    ...rest,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      Authorization: `Bearer ${accessToken}`,
      ...rest.headers,
    },
    next: {
      ...(tags && { tags }),
      ...(revalidate !== undefined && { revalidate }),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Fetch failed: ${res.statusText}`);
  }
  return res.json();
};
