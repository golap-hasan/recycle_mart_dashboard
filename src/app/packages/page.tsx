import PageHeader from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Package, columns } from "@/components/packages/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const packages: Package[] = [
  {
    id: "1",
    name: "Free",
    price: 0,
    duration: "Month",
    features: 6,
    status: "active",
    popular: false,
  },
  {
    id: "2",
    name: "Basic",
    price: 299,
    duration: "Month",
    features: 10,
    status: "active",
    popular: false,
  },
  {
    id: "3",
    name: "Pro",
    price: 799,
    duration: "Month",
    features: 15,
    status: "active",
    popular: true,
  },
  {
    id: "4",
    name: "Premium",
    price: 1499,
    duration: "Month",
    features: 20,
    status: "active",
    popular: false,
  },
];

const meta = {
  total: 4,
  page: 1,
  limit: 10,
  totalPages: 1,
};

export default function PackagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-col md:flex-row md:items-center justify-between">
        <PageHeader
          title="Packages / Membership Plans"
          description="Manage membership plans and pricing packages."
        />
        <Button size="sm" className="w-fit">
          <Plus />
          Create Package
        </Button>
      </div>
      <DataTable columns={columns} data={packages} meta={meta} />
    </div>
  );
}
