import { getContent } from "@/lib/data-service";
import { HomeContent } from "@/components/home/home-content";

export default async function Page() {
  const content = await getContent();

  return <HomeContent site={content.site} projects={content.projects} />;
}
