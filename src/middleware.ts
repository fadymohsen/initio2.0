import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { COOKIE_NAME } from '@/lib/auth';

const LOGIN_PATH = '/admin/login';

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error('ADMIN_JWT_SECRET is not set');
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const isAuthed = token
    ? await jwtVerify(token, getSecret()).then(() => true).catch(() => false)
    : false;

  // Tag every admin request so root layout skips site header/footer/cursor
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-admin-route', '1');

  if (isAuthed && pathname === LOGIN_PATH) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (!isAuthed && pathname !== LOGIN_PATH) {
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/admin/:path*'],
};
