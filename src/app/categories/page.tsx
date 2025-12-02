import { DataTable } from "@/components/ui/data-table";
import {
  categoriesColumns,
  type Category,
} from "@/components/categories/columns";
import PageHeader from "@/components/ui/page-header";
import { AddCategoryModal } from "@/components/categories/AddCategoryModal";

// Mock category data
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Mobiles",
    icon: "📱",
    subcategoryCount: 8,
    activeAds: 4560,
    status: "active",
    createdDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Electronics and Gadgets",
    icon: "💻",
    subcategoryCount: 15,
    activeAds: 2450,
    status: "active",
    createdDate: "2023-01-15",
  },
  {
    id: "3",
    name: "Vehicles",
    icon: "🚗",
    subcategoryCount: 12,
    activeAds: 1890,
    status: "active",
    createdDate: "2023-01-20",
  },
  {
    id: "4",
    name: "Home Living",
    icon: "🛋️",
    subcategoryCount: 14,
    activeAds: 1230,
    status: "active",
    createdDate: "2023-02-01",
  },
  {
    id: "5",
    name: "Property",
    icon: "🏠",
    subcategoryCount: 10,
    activeAds: 3200,
    status: "active",
    createdDate: "2023-02-10",
  },
  {
    id: "6",
    name: "Others",
    icon: "🧩",
    subcategoryCount: 5,
    activeAds: 780,
    status: "active",
    createdDate: "2023-03-01",
  },
];

const meta = {
  total: mockCategories.length,
  page: 1,
  limit: 10,
  totalPages: 1,
};

export default async function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-col md:flex-row md:items-center justify-between">
        <PageHeader
          title="Category & Subcategory"
          description="Manage product categories and subcategories structure."
        />
        <AddCategoryModal />
      </div>
      <DataTable
        columns={categoriesColumns}
        data={mockCategories}
        meta={meta}
      />
    </div>
  );
}
