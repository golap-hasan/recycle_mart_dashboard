/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from '@/lib/fetcher';

export const getDashboardStats = async () => {
  try {
    const result = await serverFetch('/admin/stats', {
      method: 'GET',
      next: {
        revalidate: 300, // Revalidate every 5 minutes
      },
    });

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Failed to fetch dashboard stats',
    };
  }
};
