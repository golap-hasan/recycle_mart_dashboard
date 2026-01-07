import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { usersColumns } from "@/components/users/columns";
import { getAllUsers } from "@/services/users";
import { SearchParams } from "@/types/global.types";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const result = await getAllUsers(page, limit);
  const users = result?.success ? result.data : [];
  const meta = result?.success ? result.meta : { total: 0, page, limit, totalPages: 0 };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage users, roles, and permissions here."
      />
      <DataTable columns={usersColumns} data={users} meta={meta} />
    </div>
  );
}
