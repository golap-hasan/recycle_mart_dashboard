import { DataTable } from "@/components/ui/data-table";
import { supportColumns, type Ticket } from "@/components/support/columns";
import PageHeader from "@/components/ui/page-header";

// Mock support tickets (Bikroy.com style)
const mockTickets: Ticket[] = [
  {
    id: "1",
    subject: "Cannot post ad - Error 500",
    userName: "Anika Rahman",
    userEmail: "anika.rahman@example.com",
    status: "Pending",
    category: "Ad Problem",
    createdDate: "2024-11-30",
  },
  {
    id: "2",
    subject: "Scam seller reported - Fake product",
    userName: "Fahim Hossain",
    userEmail: "fahim.h@example.com",
    status: "Pending",
    category: "Scam Report",
    createdDate: "2024-11-30",
    assignedTo: "Moderator Team",
  },
  {
    id: "3",
    subject: "Payment not received for featured ad",
    userName: "Shabnam Akter",
    userEmail: "shabnam.a@example.com",
    status: "Closed",
    category: "Payment Issue",
    createdDate: "2024-11-29",
    assignedTo: "Finance Team",
  },
  {
    id: "4",
    subject: "Account banned by mistake",
    userName: "Rakib Khan",
    userEmail: "rakib.khan@example.com",
    status: "Pending",
    category: "Account Issue",
    createdDate: "2024-11-28",
  },
  {
    id: "5",
    subject: "Suggestion: Add video upload feature",
    userName: "Tamim Ahmed",
    userEmail: "tamim.a@example.com",
    status: "Pending",
    category: "Feature Request",
    createdDate: "2024-11-27",
  },
  {
    id: "6",
    subject: "Unable to verify phone number",
    userName: "Nusrat Jahan",
    userEmail: "nusrat.j@example.com",
    status: "Closed",
    category: "Account Issue",
    createdDate: "2024-11-26",
  },
  {
    id: "7",
    subject: "Ad images not uploading",
    userName: "Mahmudul Hasan",
    userEmail: "mahmud.h@example.com",
    status: "Pending",
    category: "Ad Problem",
    createdDate: "2024-11-26",
    assignedTo: "Tech Support",
  },
];
const meta = {
  total: mockTickets.length,
  page: 1,
  limit: 10,
  totalPages: 5,
};

export default async function SupportPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Management"
        description="Handle customer support tickets and inquiries."
      />
      <DataTable columns={supportColumns} data={mockTickets} meta={meta} />
    </div>
  );
}
