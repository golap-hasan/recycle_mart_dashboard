import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { usersColumns, type User } from "@/components/users/columns";

// Fake user data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    joinedDate: "2024-01-15",
    avatar: "",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active",
    joinedDate: "2024-02-20",
    avatar: "",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "moderator",
    status: "inactive",
    joinedDate: "2024-03-10",
    avatar: "",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "user",
    status: "banned",
    joinedDate: "2024-04-05",
    avatar: "",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "user",
    status: "active",
    joinedDate: "2024-05-12",
    avatar: "",
  },
];
const meta = {
  total: mockUsers.length,
  page: 1,
  limit: 10,
  totalPages: 10,
};

export default async function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage users, roles, and permissions here."
      />
      <DataTable columns={usersColumns} data={mockUsers} meta={meta} />
    </div>
  );
}
