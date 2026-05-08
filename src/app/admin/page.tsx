import { getContent } from '@/lib/data-service';
import Link from 'next/link';
import { ArrowRight, Briefcase, Layers, Grid } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  Events: 'text-purple-700 bg-purple-50',
  Branding: 'text-amber-700 bg-amber-50',
  Marketing: 'text-emerald-700 bg-emerald-50',
};

export default async function AdminDashboard() {
  const { projects } = await getContent();

  const categories = ['Events', 'Branding', 'Marketing'];
  const counts = Object.fromEntries(
    categories.map(c => [c, projects.filter(p => p.category === c).length])
  );

  const stats = [
    { label: 'Total Projects', value: projects.length, color: 'text-gray-900' },
    { label: 'Events', value: counts.Events, color: 'text-purple-700' },
    { label: 'Branding', value: counts.Branding, color: 'text-amber-700' },
    { label: 'Marketing', value: counts.Marketing, color: 'text-emerald-700' },
  ];

  return (
    <div className="space-y-8">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your website content</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-center">
            <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/admin/projects"
          className="flex items-center justify-between bg-white hover:bg-gray-50 shadow-sm border border-gray-200 rounded-xl p-6 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Briefcase size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-base text-gray-900 font-bold group-hover:text-blue-600 transition-colors">Manage Projects</p>
              <p className="text-sm text-gray-500 mt-1">Add, edit, or remove portfolio items</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
        </Link>

        <Link
          href="/admin/site"
          className="flex items-center justify-between bg-white hover:bg-gray-50 shadow-sm border border-gray-200 rounded-xl p-6 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <Layers size={20} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-base text-gray-900 font-bold group-hover:text-indigo-600 transition-colors">Site Content</p>
              <p className="text-sm text-gray-500 mt-1">Edit hero, services, and who we are sections</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-gray-400 group-hover:text-indigo-600 transition-colors shrink-0" />
        </Link>
      </div>

      {/* Recent projects */}
      <div>
        <div className="flex items-center justify-between mb-4 mt-8">
          <h2 className="text-lg font-bold text-gray-900">Recently Added Projects</h2>
          <Link
            href="/admin/projects"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            View all
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-10 text-center">
            <p className="text-gray-500 text-sm">No projects found</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
            <div className="divide-y divide-gray-200">
              {projects.slice(0, 5).map(p => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-12 rounded-md bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                    {p.image && (
                      <img src={p.image} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-bold truncate">{p.title}</p>
                    {p.location && (
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{p.location}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${CATEGORY_COLORS[p.category] ?? 'text-gray-600 bg-gray-100'}`}>
                      {p.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{p.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
