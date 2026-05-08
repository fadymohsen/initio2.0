'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { compare } from 'bcryptjs';
import { getContent, saveContent, Project, SiteContent } from './data-service';
import { signAdminToken, setAdminCookie, clearAdminCookie } from './auth';

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAction(password: string): Promise<{ error?: string }> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return { error: 'Server misconfiguration' };
  const valid = await compare(password, hash);
  if (!valid) return { error: 'Invalid access key' };
  const token = await signAdminToken();
  await setAdminCookie(token);
  return {};
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect('/admin/login');
}

// ── Site content ──────────────────────────────────────────────────────────────

export async function updateSiteContent(data: Partial<SiteContent['site']>) {
  const content = await getContent();
  content.site = { ...content.site, ...data };
  await saveContent(content);
  revalidatePath('/');
  revalidatePath('/who-we-are');
  return { success: true };
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function addProject(project: Omit<Project, 'id'>) {
  const content = await getContent();
  const newProject: Project = {
    ...project,
    id: Math.random().toString(36).substr(2, 9),
  };
  content.projects.unshift(newProject);
  await saveContent(content);
  revalidatePath('/portfolio');
  revalidatePath('/');
  return { success: true, project: newProject };
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const content = await getContent();
  const index = content.projects.findIndex(p => p.id === id);
  if (index === -1) return { success: false, error: 'Project not found' };
  content.projects[index] = { ...content.projects[index], ...updates };
  await saveContent(content);
  revalidatePath('/portfolio');
  revalidatePath('/');
  revalidatePath(`/portfolio/${content.projects[index].slug}`);
  return { success: true };
}

export async function deleteProject(id: string) {
  const content = await getContent();
  content.projects = content.projects.filter(p => p.id !== id);
  await saveContent(content);
  revalidatePath('/portfolio');
  revalidatePath('/');
  return { success: true };
}
