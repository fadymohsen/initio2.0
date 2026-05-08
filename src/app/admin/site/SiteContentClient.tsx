'use client';

import { useState } from 'react';
import type { SiteContent, Partner } from '@/lib/data-service';
import { updateSiteContent } from '@/lib/actions';
import { Save, Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';

type Section = 'hero' | 'philosophy' | 'whoWeAre' | 'services' | 'partners';

const SECTIONS: { key: Section; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'philosophy', label: 'Philosophy' },
  { key: 'whoWeAre', label: 'Who We Are' },
  { key: 'services', label: 'Services' },
  { key: 'partners', label: 'Partners' },
];

const inp = "w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-gray-400";
const ta = `${inp} resize-y min-h-[120px]`;
const lbl = "block text-sm font-semibold text-gray-700 mb-2";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <label className={lbl}>{label}</label>
      {children}
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-6 mb-6">{children}</div>;
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 pt-8 mt-8 border-t border-gray-200">
      <span className="text-lg font-bold text-gray-900">{label}</span>
    </div>
  );
}

export default function SiteContentClient({ initialContent }: { initialContent: SiteContent['site'] }) {
  const [content, setContent] = useState({ ...initialContent, partners: initialContent.partners ?? [] });
  const [active, setActive] = useState<Section>('hero');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try { await updateSiteContent(content); }
    catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const setWWA = (idx: number, field: string, val: string) =>
    setContent(c => ({
      ...c,
      whoWeAre: {
        ...c.whoWeAre,
        sections: c.whoWeAre.sections.map((s, i) => i === idx ? { ...s, [field]: val } : s),
      },
    }));

  const setPillar = (idx: number, field: string, val: string) =>
    setContent(c => ({
      ...c,
      services: {
        ...c.services,
        pillars: c.services.pillars.map((p, i) => i === idx ? { ...p, [field]: val } : p),
      },
    }));

  const setPartner = (idx: number, field: keyof Partner, val: string) =>
    setContent(c => ({
      ...c,
      partners: c.partners.map((p, i) => i === idx ? { ...p, [field]: val } : p),
    }));

  const addPartner = () =>
    setContent(c => ({
      ...c,
      partners: [...c.partners, { id: Math.random().toString(36).substr(2, 9), name: '', logo: '' }],
    }));

  const removePartner = (idx: number) =>
    setContent(c => ({
      ...c,
      partners: c.partners.filter((_, i) => i !== idx),
    }));

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Site Content Management</h1>
          <p className="text-sm text-gray-500 mt-1">Edit homepage sections and global copy</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Tab nav */}
      <div className="flex overflow-x-auto gap-2 bg-white border border-gray-200 p-1.5 rounded-lg shadow-sm w-max">
        {SECTIONS.map(s => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`px-5 py-2 text-sm font-semibold whitespace-nowrap rounded-md transition-colors ${
              active === s.key
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Section form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-2">

        {/* ── Hero ── */}
        {active === 'hero' && (
          <>
            <Grid2>
              <Field label="Brand Name">
                <input
                  value={content.hero.title}
                  onChange={e => setContent(c => ({ ...c, hero: { ...c.hero, title: e.target.value } }))}
                  className={inp}
                />
              </Field>
              <Field label="Tagline">
                <input
                  value={content.hero.subtitle}
                  onChange={e => setContent(c => ({ ...c, hero: { ...c.hero, subtitle: e.target.value } }))}
                  className={inp}
                />
              </Field>
            </Grid2>
            <Field label="Description">
              <textarea
                rows={4}
                value={content.hero.description}
                onChange={e => setContent(c => ({ ...c, hero: { ...c.hero, description: e.target.value } }))}
                className={ta}
              />
            </Field>
            <div className="mt-8">
              <label className={lbl}>Hero Background Image</label>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <ImageUpload
                  value={content.hero.image}
                  onChange={v => setContent(c => ({ ...c, hero: { ...c.hero, image: v } }))}
                />
              </div>
            </div>
          </>
        )}

        {/* ── Philosophy ── */}
        {active === 'philosophy' && (
          <>
            <Field label="Heading">
              <input
                value={content.philosophy.title}
                onChange={e => setContent(c => ({ ...c, philosophy: { ...c.philosophy, title: e.target.value } }))}
                className={inp}
              />
            </Field>
            <Field label="Body Text">
              <textarea
                rows={6}
                value={content.philosophy.description}
                onChange={e => setContent(c => ({ ...c, philosophy: { ...c.philosophy, description: e.target.value } }))}
                className={ta}
              />
            </Field>
          </>
        )}

        {/* ── Who We Are ── */}
        {active === 'whoWeAre' && (
          <>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Section Overview</h2>
              <Grid2>
                <Field label="Title">
                  <input
                    value={content.whoWeAre.title}
                    onChange={e => setContent(c => ({ ...c, whoWeAre: { ...c.whoWeAre, title: e.target.value } }))}
                    className={inp}
                  />
                </Field>
                <Field label="Subtitle">
                  <input
                    value={content.whoWeAre.subtitle}
                    onChange={e => setContent(c => ({ ...c, whoWeAre: { ...c.whoWeAre, subtitle: e.target.value } }))}
                    className={inp}
                  />
                </Field>
              </Grid2>
              <Field label="Description">
                <textarea
                  rows={3}
                  value={content.whoWeAre.description}
                  onChange={e => setContent(c => ({ ...c, whoWeAre: { ...c.whoWeAre, description: e.target.value } }))}
                  className={ta}
                />
              </Field>
            </div>

            {content.whoWeAre.sections.map((s, idx) => (
              <div key={s.id}>
                <Divider label={`Content Block ${idx + 1}`} />
                <div className="mt-6">
                  <Field label="Title">
                    <input value={s.title} onChange={e => setWWA(idx, 'title', e.target.value)} className={inp} />
                  </Field>
                  <Field label="Description">
                    <textarea rows={4} value={s.description} onChange={e => setWWA(idx, 'description', e.target.value)} className={ta} />
                  </Field>
                  <div className="mt-6">
                    <label className={lbl}>Image</label>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <ImageUpload value={s.image} onChange={v => setWWA(idx, 'image', v)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Partners ── */}
        {active === 'partners' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Partners</h2>
              <button
                type="button"
                onClick={addPartner}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                <Plus size={16} /> Add Partner
              </button>
            </div>

            {content.partners.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-10">No partners yet. Click &ldquo;Add Partner&rdquo; to get started.</p>
            )}

            {content.partners.map((partner, idx) => (
              <div key={partner.id} className="border border-gray-200 rounded-xl p-5 mb-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-700">Partner {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removePartner(idx)}
                    className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <Field label="Name">
                  <input
                    value={partner.name}
                    onChange={e => setPartner(idx, 'name', e.target.value)}
                    placeholder="e.g. Saudi Aramco"
                    className={inp}
                  />
                </Field>
                <div className="mt-4">
                  <label className={lbl}>Logo <span className="text-gray-400 font-normal">(optional — name shown as fallback)</span></label>
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <ImageUpload
                      value={partner.logo}
                      onChange={v => setPartner(idx, 'logo', v)}
                      aspectRatio="aspect-[3/1]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Services ── */}
        {active === 'services' && (
          <>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Section Overview</h2>
              <Grid2>
                <Field label="Title">
                  <input
                    value={content.services.title}
                    onChange={e => setContent(c => ({ ...c, services: { ...c.services, title: e.target.value } }))}
                    className={inp}
                  />
                </Field>
                <Field label="Subtitle">
                  <input
                    value={content.services.subtitle}
                    onChange={e => setContent(c => ({ ...c, services: { ...c.services, subtitle: e.target.value } }))}
                    className={inp}
                  />
                </Field>
              </Grid2>
            </div>

            {content.services.pillars.map((pillar, idx) => (
              <div key={pillar.id}>
                <Divider label={`Service Block ${idx + 1}`} />
                <div className="mt-6">
                  <Grid2>
                    <Field label="Title">
                      <input value={pillar.title} onChange={e => setPillar(idx, 'title', e.target.value)} className={inp} />
                    </Field>
                    <div>
                      <label className={lbl}>
                        Services List <span className="text-gray-400 font-normal ml-1">(use • as separator)</span>
                      </label>
                      <textarea rows={1} value={pillar.list} onChange={e => setPillar(idx, 'list', e.target.value)} className={ta} />
                    </div>
                  </Grid2>
                  <Field label="Description">
                    <textarea rows={3} value={pillar.description} onChange={e => setPillar(idx, 'description', e.target.value)} className={ta} />
                  </Field>
                  <div className="mt-6">
                    <label className={lbl}>Image</label>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <ImageUpload value={pillar.image} onChange={v => setPillar(idx, 'image', v)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
