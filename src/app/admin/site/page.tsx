import { getContent } from '@/lib/data-service';
import SiteContentClient from './SiteContentClient';

export default async function AdminSitePage() {
  const content = await getContent();
  return <SiteContentClient initialContent={content.site} />;
}
