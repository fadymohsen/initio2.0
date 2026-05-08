'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Settings, LogOut, Grid } from 'lucide-react';
import { logoutAction } from '@/lib/actions';

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Projects', icon: Briefcase, href: '/admin/projects' },
  { label: 'Site Content', icon: Settings, href: '/admin/site' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="admin-panel min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        {/* Brand */}
        <Link href="/admin" className="flex items-center gap-3">
          <div>
            <div className="font-bold text-base text-gray-900 leading-none">Initio Admin</div>
            <div className="text-xs text-gray-500 mt-1">Control Panel</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {NAV.map(({ label, icon: Icon, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Actions */}
        <form action={logoutAction} className="hidden sm:block">
          <button
            type="submit"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 px-3 py-2 rounded-md hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </form>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
