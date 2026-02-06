 
"use server";

import { buildQueryString } from "@/lib/buildQueryString";
import { serverFetch } from "@/lib/fetcher";

// GET ALL CONTACTS/TICKETS
export const getAllContacts = async (query: Record<string, string | string[] | undefined> = {}) => {
  try {
    return await serverFetch(`/contact${buildQueryString(query)}`, {
      revalidate: 300,
      tags: ["CONTACT-LIST"],
    });
  } catch {
    return { success: false, data: [], meta: { total: 0, page: 1, limit: 10, totalPage: 0 } };
  }
};
