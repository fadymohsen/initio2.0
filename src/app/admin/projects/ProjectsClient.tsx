'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/data-service';
import { ProjectForm } from '@/components/admin/project-form';
import { Search, Plus, MapPin, Edit2 } from 'lucide-react';

const CATEGORIES = ['All', 'Events', 'Branding', 'Marketing'];

const CATEGORY_COLORS: Record<string, string> = {
  Events: 'text-purple-700 bg-purple-50',
  Branding: 'text-amber-700 bg-amber-50',
  Marketing: 'text-emerald-700 bg-emerald-50',
};

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Project | null | 'new'>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = initialProjects.filter(p => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filter === 'All' || p.category === filter;
    return matchSearch && matchCat;
  });

  const handleClose = () => { setEditing(null); router.refresh(); };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Projects Management</h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or remove projects from your portfolio</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex overflow-x-auto gap-2 w-full sm:w-auto">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
                filter === c
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-sm font-medium">No projects found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filtered.map(p => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Image */}
                <div className="w-24 h-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200 shrink-0">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-bold text-base truncate">{p.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${CATEGORY_COLORS[p.category] ?? 'text-gray-600 bg-gray-100'}`}>
                      {p.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{p.year}</span>
                    {p.location && (
                      <span className="flex items-center gap-1 text-gray-400 text-xs truncate">
                        <MapPin size={12} />
                        {p.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center justify-end">
                  <button
                    onClick={() => setEditing(p)}
                    className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {editing && (
        <ProjectForm
          project={editing === 'new' ? null : editing}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

