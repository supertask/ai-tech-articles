# Claude Code 設定

## Skills 一覧

`~/.claude/skills/` に以下の7つを配置：

| ディレクトリ | スキル名 | 機能 |
|---|---|---|
| `tech-draft/` | tech-draft | 記事下書き生成 |
| `tech-review/` | tech-review | レビュー・校正 |
| `tech-publish/` | tech-publish | Zenn/Qiita投稿 |
| `tech-crosspost/` | tech-crosspost | プラットフォーム間変換 |
| `tech-intl/` | tech-intl | 英訳してDev.to/Hashnode投稿 |
| `tech-x-post/` | tech-x-post | X告知（ブラウザ操作） |
| `tech-publish-all/` | tech-publish-all | 全プラットフォーム一括 |

`tech-crosspost/references/conversion-rules.md` にZenn⇔Qiitaの記法変換ルールがある。

## カスタムコマンド

`~/.claude/commands/publish-all.md` — `/publish-all <ファイルパス>` で全プラットフォーム投稿。

## MCP サーバー

| 名前 | 用途 | 接続コマンド |
|---|---|---|
| blogcaster | Dev.to + Hashnode投稿 | `claude mcp add --transport http blogcaster https://blogcaster-mcp.rrpb2580.workers.dev/mcp` |
| playwright | X投稿用ブラウザ操作 | `claude mcp add playwright -- npx @anthropic-ai/mcp-playwright@latest` |

## settings.json

`~/.claude/settings.json` に以下を追加すると権限確認がスキップされる：

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": ["mcp__plugin_discord_discord__*"]
  },
  "skipDangerousModePermissionPrompt": true,
  "skipAutoPermissionPrompt": true
}
```

## 別PCへの引き継ぎチェックリスト

1. [ ] リポジトリをclone + `npm install`
2. [ ] `.env` に各APIキーを設定（[api-keys.md](api-keys.md) 参照）
3. [ ] `npx qiita login` でQiita認証
4. [ ] Zenn GitHub連携（https://zenn.dev/dashboard/deploys）
5. [ ] GitHub Secretsに `QIITA_TOKEN` 登録
6. [ ] MCP サーバー接続（blogcaster, playwright）
7. [ ] Skills を `~/.claude/skills/` に配置（構築プロンプトをClaude Codeに渡してPhase 4実行）
8. [ ] `~/.claude/commands/publish-all.md` を配置
9. [ ] `~/.claude/settings.json` の権限設定
10. [ ] ブラウザでx.comにログイン（X投稿用）
