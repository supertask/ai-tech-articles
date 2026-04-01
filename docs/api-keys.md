# APIキー取得方法

## Qiita

1. https://qiita.com/settings/tokens にアクセス
2. 「新しいトークンを発行する」
3. スコープ: `read_qiita` + `write_qiita` にチェック
4. Description: `qiita-cli`
5. 「発行する」→ トークンをコピー
6. `.env` の `QIITA_TOKEN=` に設定
7. GitHub Secretsにも登録: `gh secret set QIITA_TOKEN --repo supertask/ai-tech-articles`

または `npx qiita login` でブラウザ認証（CLI用のトークンが自動保存される）。

## Dev.to

1. https://dev.to/settings/extensions にアクセス（GitHubログイン可）
2. ページ下部「Generate a new Key」セクション
3. Description: `ai-tech-articles`
4. 「Generate API Key」
5. 表示されたキーをコピー
6. `.env` の `DEVTO_API_KEY=` に設定

## Hashnode

1. https://hashnode.com/settings/developer にアクセス
2. 「Generate New Token」→ トークンをコピー
3. `.env` の `HASHNODE_TOKEN=` に設定

### Publication ID の取得

```bash
curl -s -X POST https://gql.hashnode.com \
  -H "Content-Type: application/json" \
  -d '{"query":"{ publication(host:\"YOUR_BLOG.hashnode.dev\") { id title } }"}'
```

レスポンスの `id` を `.env` の `HASHNODE_PUBLICATION_ID=` に設定。

## Zenn

Zenn CLIはAPIキー不要。GitHub連携でデプロイする。
`ZENN_USERNAME=` にはZennのユーザー名を設定（canonical URL生成用）。

## X (Twitter)

APIキー不要。ブラウザ操作（Claude in Chrome / Playwright MCP）で投稿する。
ブラウザでx.comにログインしておくだけでOK。
