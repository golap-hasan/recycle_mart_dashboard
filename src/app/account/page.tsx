import PageHeader from "@/components/ui/page-header";
import { ProfileHeader } from "@/components/account/ProfileHeader";
import { ProfileForm } from "@/components/account/ProfileForm";
import { SecuritySettings } from "@/components/account/SecuritySettings";


export default function AccountPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Account"
        description="Manage your profile information and security settings."
      />
      
      <ProfileHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileForm />
        <SecuritySettings />
      </div>
    </div>
  );
}
