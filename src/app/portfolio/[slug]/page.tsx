import { notFound } from "next/navigation";
import { getContent } from "@/lib/data-service";
import { ProjectDetailContent } from "@/components/portfolio/project-detail-content";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getContent();
  const project = content.projects.find(p => p.slug === slug);

  if (!project) notFound();

  return <ProjectDetailContent project={project} />;
}
