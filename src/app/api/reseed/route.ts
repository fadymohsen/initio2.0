import { reseedFromFile } from '@/lib/data-service';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await reseedFromFile();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
