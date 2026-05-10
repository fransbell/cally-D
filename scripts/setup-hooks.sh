#!/bin/bash
# setup-hooks.sh — Install git hooks for cally-D
# Usage: ./scripts/setup-hooks.sh

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HOOKS_DIR="$REPO_DIR/.git/hooks"

echo "Installing git hooks for cally-D..."

# Install pre-push hook
cp "$REPO_DIR/scripts/pre-push" "$HOOKS_DIR/pre-push"
chmod +x "$HOOKS_DIR/pre-push"
echo "✅ pre-push hook installed"

echo ""
echo "Hooks installed:"
echo "  - pre-push: Runs 'npm run build' before every push"
echo ""
echo "To deploy to GitHub Pages after push:"
echo "  ./scripts/deploy-pages.sh"
