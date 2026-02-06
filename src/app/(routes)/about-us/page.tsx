import { getPageByType } from "@/services/legal";
import AboutUsForm from "./AboutUsForm";

export default async function AboutUs() {
  const res = await getPageByType("ABOUT_US");
  const initialData = res?.success ? res.data : null;

  return <AboutUsForm initialData={initialData} />;
}
