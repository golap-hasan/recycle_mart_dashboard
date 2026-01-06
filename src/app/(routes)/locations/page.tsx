import { DataTable } from "@/components/ui/data-table";
import {
  locationsColumns,
  type Location,
} from "@/components/locations/columns";
import PageHeader from "@/components/ui/page-header";
import { AddLocationModal } from "@/components/locations/AddLocationModal";

// Mock location data (Bangladesh locations - Bikroy.com style)
const mockLocations: Location[] = [
  {
    id: "1",
    division: "Dhaka",
    area: "Dhanmondi",
    activeAds: 450
  },
  {
    id: "2",
    division: "Dhaka",
    area: "Gulshan",
    activeAds: 680
  },
  {
    id: "3",
    division: "Dhaka",
    area: "Mirpur",
    activeAds: 520
  },
  {
    id: "4",
    division: "Dhaka",
    area: "Uttara",
    activeAds: 390
  },
  {
    id: "5",
    division: "Chittagong",
    area: "Agrabad",
    activeAds: 320
  },
  {
    id: "6",
    division: "Chittagong",
    area: "Khulshi",
    activeAds: 180
  },
  {
    id: "7",
    division: "Sylhet",
    area: "Zindabazar",
    activeAds: 95
  },
  {
    id: "8",
    division: "Rajshahi",
    area: "Shaheb Bazar",
    activeAds: 65
  },
];
const meta = {
  total: mockLocations.length,
  page: 1,
  limit: 10,
  totalPages: 5,
};
export default async function LocationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-col md:flex-row md:items-center justify-between">
        <PageHeader
          title="Locations Management"
          description="Manage regions, cities, and areas across Bangladesh."
        />
        <AddLocationModal />
      </div>
      <DataTable columns={locationsColumns} data={mockLocations} meta={meta} />
    </div>
  );
}
