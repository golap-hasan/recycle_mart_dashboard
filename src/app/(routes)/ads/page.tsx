import { DataTable } from "@/components/ui/data-table";
import { adsColumns, type Ad } from "@/components/ads/columns";
import PageHeader from "@/components/ui/page-header";

const mockAds: Ad[] = [
  {
    id: "1",
    title: "iPhone 14 Pro Max 256GB - Purple",
    seller: "Karim Ahmed",
    category: "Mobiles",
    location: "Dhanmondi, Dhaka",
    price: 125000,
    condition: "New",
    status: "approved",
    postedDate: "2024-11-28",
    views: 234,
  },
  {
    id: "2",
    title: "Toyota Corolla 2020 - Excellent Condition",
    seller: "Rahim Khan",
    category: "Vehicles",
    location: "Gulshan, Dhaka",
    price: 2850000,
    condition: "Used",
    status: "approved",
    postedDate: "2024-11-27",
    views: 456,
  },
  {
    id: "3",
    title: "3 Bed Flat for Rent - Dhanmondi",
    seller: "Fatima Begum",
    category: "Property",
    location: "Dhanmondi, Dhaka",
    price: 35000,
    condition: "Used",
    status: "pending",
    postedDate: "2024-11-29",
    views: 89,
  },
  {
    id: "4",
    title: "Samsung Galaxy S23 Ultra 512GB",
    seller: "Tanvir Hasan",
    category: "Mobiles",
    location: "Mirpur, Dhaka",
    price: 98000,
    condition: "Used",
    status: "approved",
    postedDate: "2024-11-26",
    views: 312,
  },
  {
    id: "5",
    title: "MacBook Pro M2 14-inch - Space Gray",
    seller: "Sabrina Islam",
    category: "Electronics",
    location: "Uttara, Dhaka",
    price: 195000,
    condition: "New",
    status: "pending",
    postedDate: "2024-11-30",
    views: 67,
  },
  {
    id: "6",
    title: "Honda Civic 2018 - Well Maintained",
    seller: "Imran Sheikh",
    category: "Vehicles",
    location: "Chittagong",
    price: 2250000,
    condition: "Used",
    status: "rejected",
    postedDate: "2024-11-25",
    views: 145,
  },
  {
    id: "7",
    title: "Gaming PC - RTX 4070 Ti",
    seller: "Nahid Rahman",
    category: "Electronics",
    location: "Banani, Dhaka",
    price: 185000,
    condition: "Refurbished",
    status: "approved",
    postedDate: "2024-11-24",
    views: 523,
  },
  {
    id: "8",
    title: "Commercial Space for Rent - Gulshan",
    seller: "Rashed Properties",
    category: "Property",
    location: "Gulshan, Dhaka",
    price: 125000,
    condition: "Used",
    status: "expired",
    postedDate: "2024-10-15",
    views: 789,
  },
  {
    id: "9",
    title: "Gaming PC - RTX 4070 Ti",
    seller: "Nahid Rahman",
    category: "Electronics",
    location: "Banani, Dhaka",
    price: 185000,
    condition: "Refurbished",
    status: "approved",
    postedDate: "2024-11-24",
    views: 523,
  },
  {
    id: "10",
    title: "Commercial Space for Rent - Gulshan",
    seller: "Rashed Properties",
    category: "Property",
    location: "Gulshan, Dhaka",
    price: 125000,
    condition: "Used",
    status: "expired",
    postedDate: "2024-10-15",
    views: 789,
  },
];
const meta = {
  total: mockAds.length,
  page: 1,
  limit: 10,
  totalPages: 5,
};

export default async function AdsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ads Management"
        description="Review, approve, and manage classified advertisements."
      />
      <DataTable columns={adsColumns} data={mockAds} meta={meta} />
    </div>
  );
}
