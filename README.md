# ai-tech-articles

技術記事マルチプラットフォーム投稿システム。1本のMarkdown記事を5つのプラットフォームに一元管理・投稿する。

## 対応プラットフォーム

| プラットフォーム | 言語 | 投稿方式 |
|---|---|---|
| Zenn | 日本語 | zenn-cli + GitHub連携 |
| Qiita | 日本語 | Qiita CLI + GitHub Actions |
| Dev.to | 英語 | BlogCaster MCP |
| Hashnode | 英語 | BlogCaster MCP |
| X | 日本語 | ブラウザ操作（API不要） |

## ディレクトリ構成

```
ai-tech-articles/
├── articles/          # Zenn記事（Zenn CLIが管理）
├── books/             # Zenn本（Zenn CLIが管理）
├── public/            # Qiita記事（Qiita CLIが管理）
├── drafts/            # 共通下書き置き場
├── scripts/           # 投稿用スクリプト
├── docs/              # セットアップ・設定ドキュメント
├── .github/workflows/ # GitHub Actions
├── .env               # APIキー（git管理外）
├── Makefile           # ショートカットコマンド
└── package.json
```

## クイックスタート

```bash
# プレビュー
make preview-zenn
make preview-qiita

# 新規記事作成
make new-zenn SLUG=my-article
make new-qiita SLUG=my-article

# Qiita既存記事の同期
make pull
```

## Claude Code スキル

| スキル | トリガー | 機能 |
|---|---|---|
| `/tech-draft` | 「記事書いて」「ブログ書いて」 | 記事下書き生成 |
| `/tech-review` | 「レビューして」「校正して」 | レビュー・校正 |
| `/tech-publish` | 「投稿して」「公開して」 | Zenn/Qiita投稿 |
| `/tech-crosspost` | 「Qiitaにも出して」 | プラットフォーム間変換 |
| `/tech-intl` | 「英語版も」「Dev.toに出して」 | 英訳してDev.to/Hashnode投稿 |
| `/tech-x-post` | 「Xに投稿」「告知して」 | X告知（ブラウザ操作） |
| `/tech-publish-all` | 「全部に投稿」「フル展開」 | 全プラットフォーム一括 |

## ドキュメント

- [セットアップガイド](docs/setup-guide.md) — 別PCでの再構築手順
- [APIキー取得方法](docs/api-keys.md) — 各プラットフォームのキー取得手順
- [Claude Code設定](docs/claude-config.md) — Skills, MCP, settings.json
