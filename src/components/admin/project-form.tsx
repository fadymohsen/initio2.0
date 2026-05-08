'use client';

import { useState } from 'react';
import type { Project } from '@/lib/data-service';
import { X, Trash2, Plus, Minus, Save, ChevronDown } from 'lucide-react';
import { addProject, updateProject, deleteProject } from '@/lib/actions';
import { ImageUpload } from './image-upload';

interface Props {
  project?: Project | null;
  onClose: () => void;
}

const CATEGORIES = ['Events', 'Branding', 'Marketing'];

const inp = "w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-base text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow placeholder:text-gray-400";
const ta = `${inp} resize-y min-h-[120px]`;
const lbl = "block text-sm font-semibold text-gray-700 mb-2";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 border-t border-gray-200 pt-6 mt-6 first:border-0 first:pt-0 first:mt-0">
        <span className="text-lg font-bold text-gray-900">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function ProjectForm({ project, onClose }: Props) {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [form, setForm] = useState<Partial<Project>>(
    project ?? {
      title: '', slug: '', category: 'Events', image: '',
      description: '', year: new Date().getFullYear().toString(),
      location: '', typology: '', summary: '',
      challenge: '', approach: '', outcome: '',
      services: [], images: [], stats: [],
    }
  );

  const set = <K extends keyof Project>(key: K, val: Project[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const services = form.services ?? [];
  const images = form.images ?? [];
  const stats = form.stats ?? [];

  const addService = () => set('services', [...services, '']);
  const setService = (i: number, v: string) => { const n = [...services]; n[i] = v; set('services', n); };
  const rmService = (i: number) => set('services', services.filter((_, x) => x !== i));

  const addImg = () => set('images', [...images, '']);
  const setImg = (i: number, v: string) => { const n = [...images]; n[i] = v; set('images', n); };
  const rmImg = (i: number) => set('images', images.filter((_, x) => x !== i));

  const addStat = () => set('stats', [...stats, { number: '', label: '' }]);
  const setStat = (i: number, f: 'number' | 'label', v: string) =>
    set('stats', stats.map((s, x) => x === i ? { ...s, [f]: v } : s));
  const rmStat = (i: number) => set('stats', stats.filter((_, x) => x !== i));

  const handleSave = async () => {
    if (!form.title || !form.image) return;
    setSaving(true);
    const clean = {
      ...form,
      services: services.filter(Boolean),
      images: images.filter(Boolean),
      stats: stats.filter(s => s.number || s.label),
    };
    try {
      if (project?.id) await updateProject(project.id, clean);
      else await addProject(clean as Omit<Project, 'id'>);
      onClose();
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!project?.id) return;
    setDeleting(true);
    try { await deleteProject(project.id); onClose(); }
    catch { alert('Failed to delete'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {project ? 'Edit Project' : 'New Project'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 bg-gray-50">

          <Section title="Cover Image">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <ImageUpload
                value={form.image ?? ''}
                onChange={v => set('image', v)}
                aspectRatio="aspect-video"
              />
            </div>
          </Section>

          <Section title="Basic Info">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
              <div>
                <label className={lbl}>Project Title (EN)</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({
                    ...f,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                  }))}
                  placeholder="Project Name"
                  className={inp}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={lbl}>Category</label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={e => set('category', e.target.value)}
                      className={`${inp} appearance-none pr-10`}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className={lbl}>Year</label>
                  <input value={form.year} onChange={e => set('year', e.target.value)} className={inp} />
                </div>
              </div>

              <div>
                <label className={lbl}>Location</label>
                <input
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                  placeholder="Riyadh, KSA"
                  className={inp}
                />
              </div>

              <div>
                <label className={lbl}>
                  Description <span className="text-gray-400 font-normal ml-1">(Shown on cards)</span>
                </label>
                <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className={ta} />
              </div>
            </div>
          </Section>

          <Section title="Narrative Details (Optional)">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
              {([
                ['Summary', 'summary'],
                ['The Challenge', 'challenge'],
                ['Our Approach', 'approach'],
                ['The Outcome', 'outcome'],
              ] as [string, keyof Project][]).map(([lbText, key]) => (
                <div key={key}>
                  <label className={lbl}>
                    {lbText}
                  </label>
                  <textarea
                    rows={3}
                    value={(form[key] as string) ?? ''}
                    onChange={e => set(key, e.target.value)}
                    placeholder="Leave empty to hide"
                    className={ta}
                  />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Gallery">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
              {images.map((src, i) => (
                <div key={i} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <ImageUpload value={src} onChange={v => setImg(i, v)} aspectRatio="aspect-video" />
                  </div>
                  <button
                    type="button"
                    onClick={() => rmImg(i)}
                    className="p-2.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50 bg-white border border-gray-200 shadow-sm"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImg}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg py-6 text-gray-500 font-bold transition-colors"
              >
                <Plus size={18} /> Add Image
              </button>
            </div>
          </Section>

          <Section title="Services">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
              {services.map((s, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input
                    value={s}
                    onChange={e => setService(i, e.target.value)}
                    placeholder={`Service ${i + 1}`}
                    className={`${inp} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => rmService(i)}
                    className="p-3 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50 bg-white border border-gray-200 shadow-sm"
                  >
                    <Minus size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addService}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline text-sm font-bold transition-colors mt-2"
              >
                <Plus size={16} /> Add Service
              </button>
            </div>
          </Section>

          {project && (
            <Section title="Danger Zone">
              <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm space-y-4">
                {confirmDelete ? (
                  <div className="flex flex-col gap-4 bg-red-50 border border-red-200 rounded-lg p-5">
                    <p className="text-red-700 text-sm font-bold">Are you sure you want to delete this project? This cannot be undone.</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="flex-1 py-2.5 text-gray-700 hover:text-gray-900 bg-white border border-gray-300 text-sm font-bold rounded-md hover:bg-gray-50 shadow-sm transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 bg-red-600 text-white border border-red-700 text-sm font-bold py-2.5 rounded-md hover:bg-red-700 shadow-sm transition-colors disabled:opacity-50"
                      >
                        {deleting ? 'Deleting...' : 'Confirm Delete'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="w-full text-center text-red-600 hover:text-red-700 text-sm font-bold transition-colors py-3 rounded-md bg-white border border-red-200 hover:bg-red-50 shadow-sm"
                  >
                    Delete Project
                  </button>
                )}
              </div>
            </Section>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-md text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.title || !form.image}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-2.5 rounded-md transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
