import { DataTable } from "@/components/ui/data-table";
import { supportColumns, type Ticket } from "@/components/support/columns";

// Mock support tickets (Bikroy.com style)
const mockTickets: Ticket[] = [
  {
    id: "1",
    ticketId: "TKT-2024-0145",
    subject: "Cannot post ad - Error 500",
    userName: "Anika Rahman",
    userEmail: "anika.rahman@example.com",
    priority: "High",
    status: "Open",
    category: "Ad Problem",
    createdDate: "2024-11-30",
  },
  {
    id: "2",
    ticketId: "TKT-2024-0144",
    subject: "Scam seller reported - Fake product",
    userName: "Fahim Hossain",
    userEmail: "fahim.h@example.com",
    priority: "Urgent",
    status: "In Progress",
    category: "Scam Report",
    createdDate: "2024-11-30",
    assignedTo: "Moderator Team",
  },
  {
    id: "3",
    ticketId: "TKT-2024-0143",
    subject: "Payment not received for featured ad",
    userName: "Shabnam Akter",
    userEmail: "shabnam.a@example.com",
    priority: "Medium",
    status: "In Progress",
    category: "Payment Issue",
    createdDate: "2024-11-29",
    assignedTo: "Finance Team",
  },
  {
    id: "4",
    ticketId: "TKT-2024-0142",
    subject: "Account banned by mistake",
    userName: "Rakib Khan",
    userEmail: "rakib.khan@example.com",
    priority: "High",
    status: "Resolved",
    category: "Account Issue",
    createdDate: "2024-11-28",
  },
  {
    id: "5",
    ticketId: "TKT-2024-0141",
    subject: "Suggestion: Add video upload feature",
    userName: "Tamim Ahmed",
    userEmail: "tamim.a@example.com",
    priority: "Low",
    status: "Open",
    category: "Feature Request",
    createdDate: "2024-11-27",
  },
  {
    id: "6",
    ticketId: "TKT-2024-0140",
    subject: "Unable to verify phone number",
    userName: "Nusrat Jahan",
    userEmail: "nusrat.j@example.com",
    priority: "Medium",
    status: "Closed",
    category: "Account Issue",
    createdDate: "2024-11-26",
  },
  {
    id: "7",
    ticketId: "TKT-2024-0139",
    subject: "Ad images not uploading",
    userName: "Mahmudul Hasan",
    userEmail: "mahmud.h@example.com",
    priority: "High",
    status: "In Progress",
    category: "Ad Problem",
    createdDate: "2024-11-26",
    assignedTo: "Tech Support",
  },
];

export default function SupportPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Support Management</h1>
        <p className="text-muted-foreground">
          Handle customer support tickets and inquiries.
        </p>
      </div>
      <DataTable columns={supportColumns} data={mockTickets} />
    </div>
  );
}
