import { notFound } from "next/navigation";
import { getContent } from "@/lib/data-service";
import { ProjectDetailContent } from "@/components/portfolio/project-detail-content";
import { Modal } from "@/components/ui/modal";

export default async function ProjectModal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getContent();
  const project = content.projects.find(p => p.slug === slug);

  if (!project) notFound();

  return (
    <Modal title={project.title}>
      <ProjectDetailContent project={project} isModal={true} />
    </Modal>
  );
}
