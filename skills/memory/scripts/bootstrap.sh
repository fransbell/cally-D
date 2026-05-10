#!/bin/bash
# bootstrap.sh — Restore session state from cally-D repo
# Usage: Run at the start of each new session

REPO_URL="https://github.com/fransbell/cally-D.git"
WORKSPACE="/home/z/my-project"
REPO_DIR="$WORKSPACE/.git-remote-cally-d"

echo "========================================="
echo "  Cally-D Session Bootstrap"
echo "========================================="

# Step 1: Clone or pull the repo
if [ -d "$REPO_DIR/.git" ]; then
  echo "[1/4] Repo exists. Pulling latest..."
  cd "$REPO_DIR" && git pull origin main 2>&1
else
  echo "[1/4] Cloning repo..."
  git clone "$REPO_URL" "$REPO_DIR" 2>&1
fi

# Step 2: Restore worklog
echo "[2/4] Restoring worklog..."
if [ -f "$REPO_DIR/config/worklog.md" ]; then
  cp "$REPO_DIR/config/worklog.md" "$WORKSPACE/worklog.md"
  echo "  -> Worklog restored."
else
  echo "  -> No worklog found. Creating fresh one."
  mkdir -p "$WORKSPACE"
  cat > "$WORKSPACE/worklog.md" << 'EOF'
# Session Worklog

This file tracks all agent session activity across conversations.
It is persisted via the cally-D repository.

EOF
fi

# Step 3: Restore custom skills (if any)
echo "[3/4] Restoring custom skills..."
if [ -d "$REPO_DIR/skills" ]; then
  for skill_dir in "$REPO_DIR/skills"/*/; do
    skill_name=$(basename "$skill_dir")
    if [ "$skill_name" != "memory" ] && [ ! -d "$WORKSPACE/skills/$skill_name" ]; then
      cp -r "$skill_dir" "$WORKSPACE/skills/$skill_name"
      echo "  -> Restored skill: $skill_name"
    fi
  done
fi

# Step 4: Restore prompts (if any)
echo "[4/4] Restoring prompts..."
if [ -d "$REPO_DIR/prompts" ] && [ "$(ls -A "$REPO_DIR/prompts" 2>/dev/null)" ]; then
  mkdir -p "$WORKSPACE/prompts"
  cp -r "$REPO_DIR/prompts/"* "$WORKSPACE/prompts/" 2>/dev/null
  echo "  -> Prompts restored."
fi

echo ""
echo "========================================="
echo "  Bootstrap complete!"
echo "========================================="

# Show last 5 worklog entries for quick context
if [ -f "$WORKSPACE/worklog.md" ]; then
  echo ""
  echo "Recent session history:"
  echo "---"
  grep -A 8 "^---" "$WORKSPACE/worklog.md" | tail -40
fi
