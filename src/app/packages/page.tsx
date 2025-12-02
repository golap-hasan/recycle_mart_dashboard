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
    duration: "Forever",
    features: 5,
    status: "active",
    popular: false,
  },
  {
    id: "2",
    name: "Basic",
    price: 299,
    duration: "Month",
    features: 6,
    status: "active",
    popular: false,
  },
  {
    id: "3",
    name: "Pro",
    price: 799,
    duration: "Month",
    features: 9,
    status: "active",
    popular: true,
  },
  {
    id: "4",
    name: "Enterprise",
    price: 1999,
    duration: "Month",
    features: 10,
    status: "active",
    popular: false,
  },
  {
    id: "5",
    name: "Legacy Basic",
    price: 199,
    duration: "Month",
    features: 4,
    status: "inactive",
    popular: false,
  },
];

const meta = {
  total: 5,
  page: 1,
  limit: 5,
  totalPages: 20,
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
