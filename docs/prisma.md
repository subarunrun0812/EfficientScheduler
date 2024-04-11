## Prisma について
ORM に Prisma を採用している。開発環境におけるセットアップ方法をまとめる。

### セットアップ
プロジェクトルートの `.env` に以下を追記。
```dotenv
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

Prisma Client を生成する。
```bash
prisma generate
```

### マイグレーション
`prisma/schema.prisma` を更新したら行う。
```bash
prisma migrate dev
```

DB に変更が反映される。併せて、Client の型情報も更新される。