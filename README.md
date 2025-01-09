# Modern Full-Stack Development Template

モダンなフルスタック開発のためのテンプレートプロジェクトです。Next.js、TypeScript、Supabase、Prismaを使用した高速な開発環境を提供します。

## 🚀 特徴

- **フルスタックTypeScript**: エンドツーエンドの型安全性
- **Next.js 14+**: App Router、Server Components対応
- **Supabase**: 認証・データベース・リアルタイム機能
- **Prisma**: タイプセーフなORM
- **Tailwind CSS + Shadcn UI**: モダンなUIコンポーネント
- **Zustand**: 効率的な状態管理
- **pnpm**: 高速な依存関係管理

## 🛠️ 必要要件

- Node.js v20.x (LTS)
- pnpm v8.x
- Volta（推奨）

## 🏃‍♂️ 開始方法

1. **環境のセットアップ**

```bash
# Voltaのインストール（まだの場合）
curl https://get.volta.sh | bash

# Node.jsとpnpmのインストール
volta install node@20
volta install pnpm@8

# プロジェクトのクローン
git clone [your-repository-url]
cd [your-project-name]

# 依存関係のインストール
pnpm install
```

2. **環境変数の設定**

`.env.local`ファイルを作成し、必要な環境変数を設定：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=your-database-url
```

3. **開発サーバーの起動**

```bash
pnpm dev
```

## 📁 プロジェクト構造

```
├── app/                 # Next.js アプリケーション
│   ├── (auth)/         # 認証関連ページ
│   ├── (dashboard)/    # ダッシュボード
│   └── api/            # APIルート
├── components/         # UIコンポーネント
├── lib/               # ユーティリティ
├── stores/            # Zustandストア
├── prisma/            # データベース設定
└── config/            # 環境設定
```

## 🔧 主要コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 本番環境起動
pnpm start

# データベースマイグレーション
pnpm db:migrate

# 型チェック
pnpm typecheck

# リント
pnpm lint

# フォーマット
pnpm format
```

## 🛡️ 型安全性

- TypeScriptによる完全な型チェック
- Prismaによる自動生成された型定義
- Zodによるランタイムバリデーション
- ESLintとPrettierによるコード品質管理

## 📚 主要な技術スタック

- **フロントエンド**

  - Next.js 14+
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn UI
  - Zustand

- **バックエンド**

  - Supabase
  - Prisma
  - PostgreSQL

- **開発ツール**
  - pnpm
  - ESLint
  - Prettier
  - Volta

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 開発フロー

このテンプレートを使用した開発は、以下のフローで進めることを推奨します：

### 1. 要件定義（`structure.yaml`）

1. プロジェクトのルートにある`structure.yaml`にアプリケーションの要件を追加
2. 以下の項目を明確に定義：
   - 機能の概要
   - 必要な依存関係
   - ディレクトリ構造
   - コンポーネント構成
   - データモデル

例：

```yaml
features:
  auth:
    description: 'ユーザー認証機能'
    dependencies:
      - '@supabase/ssr'
      - '@supabase/supabase-js'
    components:
      - 'components/auth/LoginForm'
      - 'components/auth/SignupForm'
```

### 2. 機能仕様のドキュメント化（`docs/`）

1. `docs/` ディレクトリに新機能のドキュメントを作成
2. 以下の内容を含めて記述：
   - 機能の概要
   - 必要なライブラリ
   - 設定手順
   - 主要コンポーネントの実装例
   - セキュリティ考慮事項
   - ベストプラクティス

例：`docs/auth.md`を参考に、以下の構造で作成：

```markdown
# 機能名

## 概要

## 必要なライブラリ

## 手動設定が必要な項目

## 主要コンポーネント

## セキュリティ考慮事項

## ベストプラクティス
```

### 3. 実装フェーズ

1. ドキュメントに基づいて実装を開始
2. 以下の順序で実装を進める：
   - 必要なライブラリのインストール
   - 環境変数の設定
   - 基本的なユーティリティの実装
   - コンポーネントの実装
   - テストの作成

### 4. レビューとテスト

1. 実装した機能のセルフレビュー
   - ドキュメントとの整合性確認
   - 型安全性の確認
   - セキュリティチェック
2. テストの実行
   - ユニットテスト
   - 統合テスト
   - E2Eテスト（必要な場合）

### 5. デプロイとモニタリング

1. ステージング環境へのデプロイ
2. 本番環境へのデプロイ
3. パフォーマンスモニタリング
4. エラー監視

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
