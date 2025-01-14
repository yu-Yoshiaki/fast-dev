import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/utils/supabase/middleware';

// 認証が不要なパスを定義
const PUBLIC_PATHS = ['/', '/login', '/signup', '/auth/callback', '/landing'];

export async function middleware(request: NextRequest) {
  // パブリックパスの場合はスキップ
  if (PUBLIC_PATHS.some(path => request.nextUrl.pathname === path)) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
