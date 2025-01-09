# Supabase認証機能 with Next.js App Router

## 概要

Supabaseの認証機能をNext.js App Routerで実装する方法について説明します。Server-Side Rendering (SSR)に対応した実装方法を含みます。

## 必要なコンポーネントと設定

### 1. 必要なパッケージ

```bash
@supabase/auth-helpers-nextjs
@supabase/supabase-js
```

### 2. 主要コンポーネント

- `middleware.ts`: ルート保護とセッション管理
- `lib/supabase.ts`: Supabaseクライアントの設定
- `components/auth/AuthProvider.tsx`: 認証状態管理用のProvider
- `app/auth/callback/route.ts`: OAuth認証コールバック処理

### 3. 環境変数

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 処理内容

### 1. ミドルウェアの実装

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}
```

### 2. サーバーコンポーネントでの認証チェック

```typescript
// app/protected/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return <div>Protected Content</div>
}
```

### 3. クライアントコンポーネントでの認証

```typescript
// components/auth/LoginForm.tsx
'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginForm() {
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return <button onClick={handleSignIn}>Googleでログイン</button>
}
```

### 4. コールバック処理

```typescript
// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
```

## セキュリティ考慮事項

1. **セッション管理**

   - セッショントークンはHTTP-onlyクッキーで管理
   - ミドルウェアでセッションの自動更新

2. **ルート保護**

   - 認証が必要なページは適切なチェックを実装
   - リダイレクト処理の適切な実装

3. **環境変数**
   - 機密情報は適切に管理
   - 本番環境とテスト環境で異なる値を使用

## ベストプラクティス

1. **パフォーマンス**

   - Server ComponentsとClient Componentsの適切な使い分け
   - 不要な再レンダリングの防止

2. **エラーハンドリング**

   - 認証エラーの適切な処理
   - ユーザーフレンドリーなエラーメッセージ

3. **UX考慮**
   - ローディング状態の表示
   - スムーズな認証フロー
   - 適切なフィードバック
