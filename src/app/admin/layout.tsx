import { getAdminSession } from '@/lib/auth';
import AdminShell from './AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuthed = await getAdminSession();

  // Not authenticated: render bare children (middleware already redirects protected
  // pages to /admin/login; only the login page itself reaches here unauthenticated)
  if (!isAuthed) return <>{children}</>;

  return <AdminShell>{children}</AdminShell>;
}
