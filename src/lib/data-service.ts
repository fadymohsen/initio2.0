import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/content.json');

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  year: string;
  location: string;
  // Detail page fields — all optional; empty = hidden on frontend
  typology?: string;
  summary?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  services?: string[];
  images?: string[];
  stats?: { number: string; label: string }[];
}

export interface SiteSection {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  description: string;
  list: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface SiteContent {
  site: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      image: string;
    };
    philosophy: {
      title: string;
      description: string;
    };
    whoWeAre: {
      title: string;
      subtitle: string;
      description: string;
      sections: SiteSection[];
    };
    services: {
      title: string;
      subtitle: string;
      pillars: ServicePillar[];
    };
    partners: Partner[];
  };
  projects: Project[];
}

// ── Storage helpers ───────────────────────────────────────────────────────────

// Module-level cache so we don't call list() on every read in the same lambda instance
let _blobUrl: string | null = null;

async function getBlobUrl(): Promise<string | null> {
  if (_blobUrl) return _blobUrl;
  const { list } = await import('@vercel/blob');
  const { blobs } = await list({ prefix: 'content.json' });
  if (blobs.length > 0) {
    _blobUrl = blobs[0].url;
    return _blobUrl;
  }
  return null;
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getContent(): Promise<SiteContent> {
  // Local dev: no blob token → use filesystem
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  }

  const blobUrl = await getBlobUrl();

  if (!blobUrl) {
    // First deploy: seed blob from the bundled content.json
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const content: SiteContent = JSON.parse(data);
    await saveContent(content);
    return content;
  }

  // cache: no-store so admin edits are reflected immediately
  const res = await fetch(blobUrl, { cache: 'no-store' });
  return res.json();
}

export async function saveContent(content: SiteContent): Promise<void> {
  // Local dev: write to filesystem
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), 'utf-8');
    return;
  }

  const { put } = await import('@vercel/blob');
  const result = await put('content.json', JSON.stringify(content, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
  // Update cache with new URL (url may stay the same but ensures freshness)
  _blobUrl = result.url;
}

export async function reseedFromFile(): Promise<void> {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  const content: SiteContent = JSON.parse(data);
  await saveContent(content);
}
