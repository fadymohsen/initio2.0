import { getContent } from "@/lib/data-service";
import { PortfolioContent } from "@/components/portfolio/portfolio-content";

export default async function PortfolioPage() {
  const content = await getContent();

  return <PortfolioContent initialProjects={content.projects} />;
}
