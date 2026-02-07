import PageHeader from "@/components/ui/page-header";
import { ContentManager } from "@/components/content/ContentManager";
import { getExtraData } from "@/services/extra-data";

export default async function ContentPage() {
  const res = await getExtraData();
  const initialData = res?.success ? res.data : {};

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Management"
        description="Manage homepage carousel banners and advertisement sections."
      />
      
      <div className="container mx-auto">
        <ContentManager initialData={initialData} />
      </div>
    </div>
  );
}
