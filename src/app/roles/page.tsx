import { DataTable } from "@/components/ui/data-table";
import { rolesColumns, type Role } from "@/components/roles/columns";
import PageHeader from "@/components/ui/page-header";

// Mock roles data (Bikroy.com admin roles)
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Jhon Doe",
    email: "jhon.doe@bikroy.com",
    role: "Super Admin",
    createdDate: "2023-01-01",
  },
  {
    id: "2",
    name: "Jhon Doe",
    email: "jhon.doe@bikroy.com",
    role: "Admin",
    createdDate: "2023-01-01",
  },
  {
    id: "3",
    name: "Jhon Doe",
    email: "jhon.doe@bikroy.com",
    role: "admin",
    createdDate: "2023-02-15",
  },
  {
    id: "4",
    name: "Jhon Doe",
    email: "jhon.doe@bikroy.com",
    role: "admin",
    createdDate: "2023-03-10",
  },
  {
    id: "5",
    name: "Jhon Doe",
    email: "jhon.doe@bikroy.com",
    role: "admin",
    createdDate: "2023-04-05",
  },
];
const meta = {
  total: mockRoles.length,
  page: 1,
  limit: 10,
  totalPages: 5,
};

export default async function RolesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin & Role Management"
        description="Configure admin access levels and role-based permissions."
      />
      <DataTable columns={rolesColumns} data={mockRoles} meta={meta} />
    </div>
  );
}
