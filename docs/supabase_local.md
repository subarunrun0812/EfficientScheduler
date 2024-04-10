# Supabase のローカル開発環境
[Supabase CLI](https://supabase.com/docs/guides/cli) を使うことで、ローカルに Supabase の開発用コンテナを立ち上げられる。

## 手順
プロジェクトルートに `.env` を配置し、OAuth のクライアントシークレットを書く (値は担当者に聞く)。
```dotenv
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=
```

`supabase` コマンドを実行 (`node_modules` 以下にあるはず)。
```bash
supabase start
```

プロジェクトルートに `.env.local` を配置し、以下の値を書く。
`<anon_key>` は `supabase start` で表示された値です。
```dotenv
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
```