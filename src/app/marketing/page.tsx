import PageHeader from "@/components/ui/page-header";

export default async function MarketingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketing Tools"
        description="Manage lottery systems, promo codes, and campaigns."
      />
      <div className="p-4 rounded-lg border border-border bg-card text-card-foreground shadow-sm">
        <p>Manage lottery systems, promo codes, and campaigns.</p>
      </div>
    </div>
  );
}
