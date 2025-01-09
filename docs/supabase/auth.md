# Supabase認証機能 with Next.js App Router

## 概要

Supabaseの認証機能をNext.js App Routerで実装する方法について説明します。Server-Side Rendering (SSR)に対応した実装方法を含みます。

## 参考ドキュメント

- [要件定義](./structure.yaml)
- [Supabase Auth with Next.js Server Components](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
- [OAuth Provider Setup](https://supabase.com/docs/guides/auth/social-login)

## 必要なライブラリ

```bash
pnpm add @supabase/ssr @supabase/supabase-js
```

## 手動設定が必要な項目

### 1. Supabase プロジェクトの設定

1. [Supabase Dashboard](https://supabase.com/dashboard) にアクセス
2. プロジェクトを作成（または既存のプロジェクトを選択）
3. Project Settings > API から以下の情報を取得:
   - Project URL
   - Project API Keys (anon, public)

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 認証プロバイダーの設定

#### Google認証の設定

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクトを作成（または既存のプロジェクトを選択）
3. OAuth 2.0 クライアントIDを作成:
   - 承認済みのリダイレクトURI: `https://[PROJECT_REF].supabase.co/auth/v1/callback`
4. Supabaseダッシュボードで設定:
   - Authentication > Providers > Google
   - Client ID と Client Secret を入力
   - Enabled をオン

#### GitHub認証の設定

1. [GitHub Developer Settings](https://github.com/settings/developers) にアクセス
2. New OAuth App を作成:
   - Authorization callback URL: `https://[PROJECT_REF].supabase.co/auth/v1/callback`
3. Supabaseダッシュボードで設定:
   - Authentication > Providers > GitHub
   - Client ID と Client Secret を入力
   - Enabled をオン

### 4. Email認証の設定（オプション）

1. Supabaseダッシュボードで設定:
   - Authentication > Email Templates
   - 必要に応じてテンプレートをカスタマイズ
2. SMTP設定（本番環境用）:
   - Authentication > Email Settings
   - SMTP設定を入力

## 主要コンポーネント

### 1. Supabaseクライアントの設定

```typescript
// lib/utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/config/env';

export function createClient() {
  return createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}
```

```typescript
// lib/utils/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '@/config/env';

export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  });
}
```

### 2. ミドルウェアの実装

```typescript
// middleware.ts
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Match all request paths except for the ones starting with:
// - _next/static (static files)
// - _next/image (image optimization files)
// - favicon.ico (favicon file)
// - public folder
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
```

```typescript
// lib/utils/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { env } from '@/config/env';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 未認証ユーザーを/loginにリダイレクト（/loginと/auth以外のパスの場合）
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    import { createServerClient } from '@supabase/ssr';
    import { NextResponse, type NextRequest } from 'next/server';

    export async function updateSession(request: NextRequest) {
      let supabaseResponse = NextResponse.next({
        request,
      });

      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
              supabaseResponse = NextResponse.next({
                request,
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      // Do not run code between createServerClient and
      // supabase.auth.getUser(). A simple mistake could make it very hard to debug
      // issues with users being randomly logged out.

      // IMPORTANT: DO NOT REMOVE auth.getUser()

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth')
      ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }

      // IMPORTANT: You *must* return the supabaseResponse object as it is.
      // If you're creating a new response object with NextResponse.next() make sure to:
      // 1. Pass the request in it, like so:
      //    const myNewResponse = NextResponse.next({ request })
      // 2. Copy over the cookies, like so:
      //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
      // 3. Change the myNewResponse object to fit your needs, but avoid changing
      //    the cookies!
      // 4. Finally:
      //    return myNewResponse
      // If this is not done, you may be causing the browser and server to go out
      // of sync and terminate the user's session prematurely!

      return supabaseResponse;
    }
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

### 3. 認証フックの実装

```typescript
// lib/hooks/useAuth.ts
import { createClient } from '@/lib/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useAuthStore } from '@/stores/auth';

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();
  const { setUser } = useAuthStore();

  const signIn = useCallback(
    async (provider: 'google' | 'github') => {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/auth/login');
  }, [supabase, router, setUser]);

  return { signIn, signOut };
}
```

### 4. 認証状態管理

```typescript
// stores/auth.ts
import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  setUser: user => set({ user }),
}));
```

### 5. 認証コンポーネント

```typescript
// components/auth/LoginForm.tsx
'use client'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'

export function LoginForm() {
  const { signIn } = useAuth()

  return (
    <div className="space-y-4">
      <Button onClick={() => signIn('google')}>
        Googleでログイン
      </Button>
      <Button onClick={() => signIn('github')}>
        GitHubでログイン
      </Button>
    </div>
  )
}
```

### 6. 認証ページ

```typescript
// app/(auth)/login/page.tsx
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">ログイン</h1>
      <LoginForm />
    </div>
  )
}
```

### 7. コールバック処理

```typescript
// app/auth/callback/route.ts
import { createClient } from '@/lib/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin + next);
}
```

## セキュリティ考慮事項

1. **セッション管理**

   - セッショントークンはHTTP-onlyクッキーで管理
   - ミドルウェアでセッションの自動更新
   - サーバーコードでは必ず`getUser()`を使用し、`getSession()`は使用しない

2. **ルート保護**

   - 認証が必要なページは適切なチェックを実装
   - リダイレクト処理の適切な実装
   - クッキーは偽装される可能性があるため、必ず`getUser()`で検証

3. **環境変数**
   - 機密情報は適切に管理
   - 本番環境とテスト環境で異なる値を使用
   - 型安全な環境変数の管理

## ベストプラクティス

1. **パフォーマンス**

   - Server ComponentsとClient Componentsの適切な使い分け
   - 不要な再レンダリングの防止
   - データフェッチのキャッシュ制御
   - Zustandを使用した効率的な状態管理

2. **エラーハンドリング**

   - 認証エラーの適切な処理
   - ユーザーフレンドリーなエラーメッセージ
   - Zodを使用した型安全なバリデーション

3. **UX考慮**
   - Shadcn UIを使用した一貫性のあるデザイン
   - ローディング状態の表示
   - スムーズな認証フロー
   - 適切なフィードバック
