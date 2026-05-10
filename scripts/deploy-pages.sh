#!/bin/bash
# deploy-pages.sh — Deploy build/ folder to gh-pages branch
# Usage: ./scripts/deploy-pages.sh
#
# This script:
# 1. Builds the Vite project (output to build/)
# 2. Pushes the build/ contents to the gh-pages branch
# 3. GitHub Pages serves from gh-pages branch

set -e

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$REPO_DIR/build"
GH_PAGES_DIR="/tmp/cally-d-gh-pages"

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
git clone --branch gh-pages --single-branch . "$GH_PAGES_DIR" 2>/dev/null || \
  mkdir -p "$GH_PAGES_DIR" && cd "$GH_PAGES_DIR" && git init && git checkout -b gh-pages

cd "$GH_PAGES_DIR"

# Copy build output
rm -rf *
cp -r "$BUILD_DIR/"* .

# Add CNAME or .nojekyll if needed
touch .nojekyll

# Step 3: Commit and push
echo "[4/4] Deploying to gh-pages..."
git add -A
git commit -m "deploy: $(date +%Y-%m-%d_%H:%M)" 2>/dev/null || echo "No changes to deploy."

# Push to origin gh-pages
git push origin gh-pages 2>&1 || \
  git push https://github.com/fransbell/cally-D.git gh-pages 2>&1

# Cleanup
rm -rf "$GH_PAGES_DIR"

echo ""
echo "========================================="
echo "  ✅ Deployed to GitHub Pages!"
echo "  URL: https://fransbell.github.io/cally-D/"
echo "========================================="
