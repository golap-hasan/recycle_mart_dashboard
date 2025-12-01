import { DataTable } from "@/components/ui/data-table";
import { categoriesColumns, type Category } from "@/components/categories/columns";

// Mock category data (Bikroy.com style)
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    icon: "📱",
    subcategoryCount: 15,
    activeAds: 2450,
    status: "active",
    createdDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Vehicles",
    icon: "🚗",
    subcategoryCount: 12,
    activeAds: 1890,
    status: "active",
    createdDate: "2023-01-15",
  },
  {
    id: "3",
    name: "Property",
    icon: "🏠",
    subcategoryCount: 10,
    activeAds: 3200,
    status: "active",
    createdDate: "2023-01-15",
  },
  {
    id: "4",
    name: "Mobiles",
    icon: "📞",
    subcategoryCount: 8,
    activeAds: 4560,
    status: "active",
    createdDate: "2023-02-01",
  },
  {
    id: "5",
    name: "Jobs",
    icon: "💼",
    subcategoryCount: 6,
    activeAds: 980,
    status: "active",
    createdDate: "2023-02-10",
  },
  {
    id: "6",
    name: "Home & Living",
    icon: "🛋️",
    subcategoryCount: 14,
    activeAds: 1230,
    status: "active",
    createdDate: "2023-03-05",
  },
  {
    id: "7",
    name: "Fashion & Beauty",
    icon: "👗",
    subcategoryCount: 11,
    activeAds: 1670,
    status: "active",
    createdDate: "2023-03-12",
  },
  {
    id: "8",
    name: "Services",
    icon: "🔧",
    subcategoryCount: 9,
    activeAds: 560,
    status: "inactive",
    createdDate: "2023-04-01",
  },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Category & Subcategory</h1>
        <p className="text-muted-foreground">
          Manage product categories and subcategories structure.
        </p>
      </div>
      <DataTable columns={categoriesColumns} data={mockCategories} />
    </div>
  );
}
