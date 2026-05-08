'use client';

import { useRef, useState } from 'react';
import { Upload, X, ImageIcon, Loader2, Link2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: string;
}

export function ImageUpload({ value, onChange, label, aspectRatio = 'aspect-video' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [urlMode, setUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const upload = async (file: File) => {
    setError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      onChange(data.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setUrlMode(false);
    }
  };

  return (
    <div className="space-y-3 w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
      )}

      {value ? (
        /* Preview */
        <div className={`relative rounded-md overflow-hidden ${aspectRatio} bg-gray-100 border border-gray-200 group shadow-sm`}>
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 text-sm font-bold px-4 py-2 rounded-md transition-colors"
            >
              <Upload size={16} /> Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-sm font-bold px-4 py-2 rounded-md transition-colors"
            >
              <X size={16} /> Remove
            </button>
          </div>
        </div>
      ) : (
        /* Upload zone */
        <div
          className={`rounded-lg border-2 border-dashed transition-colors shadow-sm ${
            dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50'
          }`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {urlMode ? (
            <div className="p-4 flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="url"
                autoFocus
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleUrlSubmit(); if (e.key === 'Escape') setUrlMode(false); }}
                placeholder="https://..."
                className="flex-1 w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex w-full sm:w-auto gap-2">
                <button
                  type="button"
                  onClick={handleUrlSubmit}
                  className="flex-1 sm:flex-none bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Use URL
                </button>
                <button
                  type="button"
                  onClick={() => setUrlMode(false)}
                  className="px-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ) : uploading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 size={24} className="text-blue-600 animate-spin" />
              <p className="text-gray-600 text-sm font-medium">Uploading...</p>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-10 gap-3 cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
                <ImageIcon size={24} className="text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Drop an image or{' '}
                  <span className="text-blue-600 hover:text-blue-700 cursor-pointer hover:underline">browse</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP — max 10 MB</p>
              </div>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); setUrlMode(true); }}
                className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 font-medium text-xs transition-colors mt-2"
              >
                <Link2 size={14} /> Paste URL instead
              </button>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-600 font-medium text-sm mt-2">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
      />
    </div>
  );
}
