import PageHeader from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Package, columns } from "@/components/packages/columns";
import { CreatePackageModal } from "@/components/packages/CreatePackageModal";

const packages: Package[] = [
  {
    id: "1",
    name: "Free",
    price: 0,
    duration: "Month",
    ads: 6
  },
  {
    id: "2",
    name: "Basic",
    price: 299,
    duration: "Month",
    ads: 10
  },
  {
    id: "3",
    name: "Pro",
    price: 799,
    duration: "Month",
    ads: 15
  },
  {
    id: "4",
    name: "Premium",
    price: 1499,
    duration: "Month",
    ads: 20
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
        <CreatePackageModal />
      </div>
      <DataTable columns={columns} data={packages} meta={meta} />
    </div>
  );
}
