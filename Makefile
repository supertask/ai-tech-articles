.PHONY: preview-qiita preview-zenn pull new-qiita new-zenn update version

preview-qiita:
	npx qiita preview

preview-zenn:
	npx zenn preview

pull:
	git pull && npx qiita pull

new-qiita:
	npx qiita new $(SLUG)

new-zenn:
	npx zenn new:article --slug $(SLUG)

update:
	npm install @qiita/qiita-cli@latest zenn-cli@latest

version:
	@echo "Qiita CLI: v$$(npx qiita version)" && echo "Zenn CLI: v$$(npx zenn --version)"
