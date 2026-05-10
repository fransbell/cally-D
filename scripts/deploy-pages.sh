#!/bin/bash
# deploy-pages.sh — Deploy build/ folder to gh-pages branch
# Usage: ./scripts/deploy-pages.sh

set -e

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$REPO_DIR/build"
GH_PAGES_DIR="/tmp/cally-d-gh-pages"
REPO_URL="https://github.com/fransbell/cally-D.git"

echo "========================================="
echo "  Deploy to GitHub Pages (gh-pages)"
echo "========================================="

# Step 1: Build
cd "$REPO_DIR"

if [ ! -d "node_modules" ]; then
  echo "[1/4] Installing dependencies..."
  npm install
else
  echo "[1/4] Dependencies already installed."
fi

echo "[2/4] Building project..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory not found. Build may have failed."
  exit 1
fi

# Step 2: Prepare gh-pages branch
echo "[3/4] Preparing gh-pages branch..."
rm -rf "$GH_PAGES_DIR"

if git ls-remote --heads "$REPO_URL" gh-pages 2>/dev/null | grep -q gh-pages; then
  git clone --branch gh-pages --single-branch "$REPO_URL" "$GH_PAGES_DIR"
else
  mkdir -p "$GH_PAGES_DIR"
  cd "$GH_PAGES_DIR"
  git init
  git checkout -b gh-pages
fi

cd "$GH_PAGES_DIR"

# Copy build output
rm -rf *
cp -r "$BUILD_DIR/"* .
touch .nojekyll

# Step 3: Commit and push
echo "[4/4] Deploying to gh-pages..."
git add -A
git commit -m "deploy: $(date +%Y-%m-%d_%H:%M)" 2>/dev/null || echo "No changes to deploy."

# Push using gh CLI auth if available, otherwise use PAT
if gh auth status &>/dev/null; then
  git push "$REPO_URL" gh-pages 2>&1
else
  echo "Note: If push fails, ensure gh CLI is authenticated or set up git credentials."
  git push origin gh-pages 2>&1 || git push "$REPO_URL" gh-pages 2>&1
fi

# Cleanup
rm -rf "$GH_PAGES_DIR"

echo ""
echo "========================================="
echo "  ✅ Deployed to GitHub Pages!"
echo "  URL: https://fransbell.github.io/cally-D/"
echo "========================================="
