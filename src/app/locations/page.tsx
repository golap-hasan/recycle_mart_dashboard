import { DataTable } from "@/components/ui/data-table";
import { locationsColumns, type Location } from "@/components/locations/columns";

// Mock location data (Bangladesh locations - Bikroy.com style)
const mockLocations: Location[] = [
  {
    id: "1",
    division: "Dhaka",
    district: "Dhaka",
    area: "Dhanmondi",
    postcode: "1205",
    activeAds: 450,
    status: "active",
  },
  {
    id: "2",
    division: "Dhaka",
    district: "Dhaka",
    area: "Gulshan",
    postcode: "1212",
    activeAds: 680,
    status: "active",
  },
  {
    id: "3",
    division: "Dhaka",
    district: "Dhaka",
    area: "Mirpur",
    postcode: "1216",
    activeAds: 520,
    status: "active",
  },
  {
    id: "4",
    division: "Dhaka",
    district: "Dhaka",
    area: "Uttara",
    postcode: "1230",
    activeAds: 390,
    status: "active",
  },
  {
    id: "5",
    division: "Chittagong",
    district: "Chittagong",
    area: "Agrabad",
    postcode: "4100",
    activeAds: 320,
    status: "active",
  },
  {
    id: "6",
    division: "Chittagong",
    district: "Chittagong",
    area: "Khulshi",
    postcode: "4225",
    activeAds: 180,
    status: "active",
  },
  {
    id: "7",
    division: "Sylhet",
    district: "Sylhet",
    area: "Zindabazar",
    postcode: "3100",
    activeAds: 95,
    status: "active",
  },
  {
    id: "8",
    division: "Rajshahi",
    district: "Rajshahi",
    area: "Shaheb Bazar",
    postcode: "6100",
    activeAds: 65,
    status: "inactive",
  },
];

export default function LocationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Locations Management</h1>
        <p className="text-muted-foreground">
          Manage regions, cities, and areas across Bangladesh.
        </p>
      </div>
      <DataTable columns={locationsColumns} data={mockLocations} />
    </div>
  );
}
