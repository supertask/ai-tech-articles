# セットアップガイド（別PCでの再構築手順）

## 前提条件

- Node.js 18+
- Git / GitHub CLI (`gh`)
- Claude Code

## 1. リポジトリのクローン

```bash
cd ~/projects/personal
git clone https://github.com/supertask/ai-tech-articles.git
cd ai-tech-articles
npm install
```

## 2. 認証情報の設定

### .env ファイル作成

`.env.example` を参考に `.env` を作成し、各APIキーを設定する。
取得方法は [api-keys.md](api-keys.md) を参照。

```bash
cp .env.example .env
# 各キーを記入
```

### Qiita CLI ログイン

```bash
npx qiita login
# ブラウザ認証 or トークン入力
```

### Zenn GitHub連携

1. https://zenn.dev/dashboard/deploys にアクセス
2. 「リポジトリを連携する」→ `ai-tech-articles` を選択
3. 「Only select repositories」で `ai-tech-articles` を指定
4. 「Install & Authorize」
5. デプロイ対象ブランチ = `main`

### GitHub Secrets（GitHub Actions用）

```bash
gh secret set QIITA_TOKEN --repo supertask/ai-tech-articles --body "YOUR_TOKEN"
```

## 3. Claude Code 設定

### MCP サーバー接続

```bash
# BlogCaster MCP（Dev.to + Hashnode投稿用）
claude mcp add --transport http blogcaster https://blogcaster-mcp.rrpb2580.workers.dev/mcp

# Playwright MCP（X投稿用ブラウザ操作）
claude mcp add playwright -- npx @anthropic-ai/mcp-playwright@latest
```

### Skills インストール

Skills は `~/.claude/skills/` に配置する。本リポジトリの設定プロンプト（`tech-articles-full-pipeline.md`）をClaude Codeに渡してPhase 4を実行すれば自動作成される。

手動の場合は以下の7つを作成：
- `tech-draft`, `tech-review`, `tech-publish`, `tech-crosspost`, `tech-intl`, `tech-x-post`, `tech-publish-all`

詳細は [claude-config.md](claude-config.md) を参照。

## 4. 動作確認

```bash
# Zennプレビュー
make preview-zenn

# Qiitaプレビュー
make preview-qiita

# テスト記事作成
make new-zenn SLUG=test-$(date +%Y%m%d)
```
