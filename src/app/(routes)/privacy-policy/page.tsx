import { getPageByType } from "@/services/legal";
import PrivacyPolicyForm from "./PrivacyPolicyForm";

export default async function PrivacyPolicy() {
  const res = await getPageByType("PRIVACY_POLICY");
  const initialData = res?.success ? res.data : null;

  return <PrivacyPolicyForm initialData={initialData} />;
}
