import PageHeader from "@/components/ui/page-header";

export default async function PackagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Packages / Membership Plans"
        description="Configure membership plans and pricing packages."
      />
      <div className="p-4 rounded-lg border border-border bg-card text-card-foreground shadow-sm">
        <p>Configure membership plans and pricing packages.</p>
      </div>
    </div>
  );
}
