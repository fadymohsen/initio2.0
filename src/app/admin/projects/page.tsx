import { getContent } from '@/lib/data-service';
import ProjectsClient from './ProjectsClient';

export default async function AdminProjectsPage() {
  const content = await getContent();
  return <ProjectsClient initialProjects={content.projects} />;
}
