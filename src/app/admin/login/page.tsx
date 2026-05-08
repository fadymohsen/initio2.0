'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { loginAction } from '@/lib/actions';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      const result = await loginAction(password);
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/admin');
        router.refresh();
      }
    });
  };

  return (
    <div className="admin-panel min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <div className="w-full max-w-md">
        
        {/* Brand */}
        <div className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Initio Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage your content</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow pr-12 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="text-sm font-medium text-red-600 mt-2">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-4"
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
