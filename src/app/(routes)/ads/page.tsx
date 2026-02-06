import { DataTable } from "@/components/ui/data-table";
import { adsColumns } from "@/components/ads/columns";
import PageHeader from "@/components/ui/page-header";
import { getAllAds } from "@/services/ads";
import { SearchParams } from "@/types/global.types";

export default async function AdsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const { data: ads, meta } = await getAllAds(params);

  return (
    <div className="space-y-6 p-1">
      <PageHeader
        title="Ads Management"
        description="Review, approve, and manage classified advertisements."
        length={meta.total}
      />
      <DataTable columns={adsColumns} data={ads} meta={meta} />
    </div>
  );
}
