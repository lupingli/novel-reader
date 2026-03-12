#!/bin/bash
set -e

TOKEN=$(cat /root/.openclaw/workspace/github_person_access_token.txt)
REPO="your-github-username/novel-reader"  # 需要替换为实际的仓库名

# 构建
echo "🔨 构建项目..."
npm run build

# 配置 git
echo "⚙️ 配置 git..."
git config --global user.name "OpenClaw Bot"
git config --global user.email "bot@openclaw.ai"

# 使用 gh-pages 部署
echo "🚀 部署到 GitHub Pages..."
npx gh-pages -d dist -u "OpenClaw Bot <bot@openclaw.ai>" --token "$TOKEN"

echo "✅ 部署完成！"
