import { DataTable } from "@/components/ui/data-table";
import { supportColumns } from "@/components/support/columns";
import PageHeader from "@/components/ui/page-header";
import { getAllContacts } from "@/services/support";

export default async function SupportPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const response = await getAllContacts(query);

  const tickets = response?.data || [];
  const meta = response?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 0,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Management"
        description="Handle customer support tickets and inquiries."
      />
      <DataTable 
        columns={supportColumns} 
        data={tickets} 
        meta={{
          total: meta.total,
          page: meta.page,
          limit: meta.limit,
          totalPages: meta.totalPage
        }} 
      />
    </div>
  );
}
