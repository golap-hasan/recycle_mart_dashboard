import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { vendorsColumns } from "@/components/vendors/columns";
import { getAllVendors } from "@/services/vendors";
import { SearchParams } from "@/types/global.types";

export default async function VendorsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const result = await getAllVendors(page, limit);
  console.log(result)
  // Safely access data, assuming API structure. 
  // API response.txt shows: { data: [...vendors], meta: {...} }
  const vendors = result?.success ? result.data : [];
  console.log(vendors)
  const meta = result?.success ? result.meta : { total: 0, page, limit, totalPages: 0 };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendor Management"
        description="Manage vendors, verify stores, and handle approvals."
      />
      <DataTable columns={vendorsColumns} data={vendors} meta={meta} />
    </div>
  );
}
