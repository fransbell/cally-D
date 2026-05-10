#!/bin/bash
# deploy-pages.sh — Deploy build/ folder to gh-pages branch + log release
# Usage: ./scripts/deploy-pages.sh

set -e

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$REPO_DIR/build"
GH_PAGES_DIR="/tmp/cally-d-gh-pages"
REPO_URL="https://github.com/fransbell/cally-D.git"
RELEASES_FILE="$REPO_DIR/RELEASES.md"

echo "========================================="
echo "  Deploy to GitHub Pages (gh-pages)"
echo "========================================="

# Step 1: Build
cd "$REPO_DIR"

if [ ! -d "node_modules" ]; then
  echo "[1/5] Installing dependencies..."
  npm install
else
  echo "[1/5] Dependencies already installed."
fi

echo "[2/5] Building project..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory not found. Build may have failed."
  exit 1
fi

# Step 2: Prepare gh-pages branch
echo "[3/5] Preparing gh-pages branch..."
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
echo "[4/5] Deploying to gh-pages..."
DEPLOY_DATE="$(date +%Y-%m-%d_%H:%M)"
git add -A
git commit -m "deploy: $DEPLOY_DATE" 2>/dev/null || echo "No changes to deploy."

# Push using gh CLI auth if available, otherwise use PAT
if gh auth status &>/dev/null; then
  git push "$REPO_URL" gh-pages 2>&1
else
  echo "Note: If push fails, ensure gh CLI is authenticated or set up git credentials."
  git push origin gh-pages 2>&1 || git push "$REPO_URL" gh-pages 2>&1
fi

# Cleanup
rm -rf "$GH_PAGES_DIR"

# Step 4: Log release to RELEASES.md
echo "[5/5] Logging release to RELEASES.md..."
cd "$REPO_DIR"

LATEST_COMMIT="$(git rev-parse --short HEAD)"
LATEST_MSG="$(git log -1 --pretty=%s)"
LATEST_AUTHOR="$(git log -1 --pretty=%an)"
DEPLOY_DATE_NICE="$(date '+%Y-%m-%d %H:%M %Z')"
RELEASE_COUNT="$(grep -c '^## v' RELEASES.md 2>/dev/null || echo "0")"
NEXT_VERSION=$((RELEASE_COUNT + 1))
RELEASE_TAG="v0.${NEXT_VERSION}"

# Create RELEASES.md header if it doesn't exist
if [ ! -f "$RELEASES_FILE" ]; then
  cat > "$RELEASES_FILE" << 'HEADER'
# Release Log

> Auto-generated deployment log. Each entry corresponds to a push to the `gh-pages` branch.
> Do not edit manually — entries are appended by `scripts/deploy-pages.sh`.

HEADER
fi

# Append release entry
cat >> "$RELEASES_FILE" << ENTRY

## ${RELEASE_TAG} — ${DEPLOY_DATE_NICE}

| Field | Value |
|-------|-------|
| **Commit** | \`${LATEST_COMMIT}\` |
| **Message** | ${LATEST_MSG} |
| **Author** | ${LATEST_AUTHOR} |
| **Tag** | ${RELEASE_TAG} |

ENTRY

echo ""
echo "========================================="
echo "  ✅ Deployed to GitHub Pages!"
echo "  URL: https://fransbell.github.io/cally-D/"
echo "  📋 Release logged: ${RELEASE_TAG}"
echo "========================================="
