import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return;
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/((?!/).*)',
  ],
};
