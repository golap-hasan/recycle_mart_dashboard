import { DataTable } from "@/components/ui/data-table";
import { rolesColumns, type Role } from "@/components/roles/columns";
import PageHeader from "@/components/ui/page-header";

// Mock roles data (Bikroy.com admin roles)
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with all permissions",
    permissions: ["System Config", "User Management", "Analytics"],
    userCount: 2,
    canManageAds: true,
    canManageUsers: true,
    createdDate: "2023-01-01",
  },
  {
    id: "2",
    name: "Admin",
    description: "Manage ads, users, and platform operations",
    permissions: ["Reports", "Categories"],
    userCount: 5,
    canManageAds: true,
    canManageUsers: true,
    createdDate: "2023-01-01",
  },
  {
    id: "3",
    name: "Moderator",
    description: "Review and approve ads, handle reports",
    permissions: ["Verify Sellers", "Handle Reports"],
    userCount: 12,
    canManageAds: true,
    canManageUsers: false,
    createdDate: "2023-02-15",
  },
  {
    id: "4",
    name: "Content Manager",
    description: "Manage categories, featured ads, and promotions",
    permissions: ["Promotions", "SEO"],
    userCount: 4,
    canManageAds: true,
    canManageUsers: false,
    createdDate: "2023-03-10",
  },
  {
    id: "5",
    name: "Support Agent",
    description: "Handle customer support and user inquiries",
    permissions: ["Tickets", "Chat Support"],
    userCount: 8,
    canManageAds: false,
    canManageUsers: false,
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
