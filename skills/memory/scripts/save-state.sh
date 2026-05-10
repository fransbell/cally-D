#!/bin/bash
# save-state.sh — Persist session state back to cally-D repo
# Usage: Run before ending a session

WORKSPACE="/home/z/my-project"
REPO_DIR="$WORKSPACE/.git-remote-cally-d"
SESSION_DATE=$(date +"%Y-%m-%d_%H:%M")

echo "========================================="
echo "  Cally-D Session Save State"
echo "========================================="

# Step 1: Ensure repo exists
if [ ! -d "$REPO_DIR/.git" ]; then
  echo "[ERROR] cally-D repo not found. Run bootstrap first."
  exit 1
fi

cd "$REPO_DIR"

# Step 2: Pull latest (avoid conflicts)
echo "[1/4] Pulling latest from remote..."
git pull origin main 2>&1

# Step 3: Copy worklog back
echo "[2/4] Saving worklog..."
if [ -f "$WORKSPACE/worklog.md" ]; then
  mkdir -p "$REPO_DIR/config"
  cp "$WORKSPACE/worklog.md" "$REPO_DIR/config/worklog.md"
  echo "  -> Worklog saved."
else
  echo "  -> No worklog found in workspace."
fi

# Step 4: Copy any new custom skills back
echo "[3/4] Saving custom skills..."
if [ -d "$WORKSPACE/skills" ]; then
  for skill_dir in "$WORKSPACE/skills"/*/; do
    skill_name=$(basename "$skill_dir")
    # Skip built-in skills (those that already existed in repo)
    if [ ! -d "$REPO_DIR/skills/$skill_name" ]; then
      mkdir -p "$REPO_DIR/skills/$skill_name"
      cp -r "$skill_dir"* "$REPO_DIR/skills/$skill_name/"
      echo "  -> Saved new skill: $skill_name"
    fi
  done
fi

# Step 5: Commit and push
echo "[4/4] Committing and pushing..."
git add -A
git commit -m "session: $SESSION_DATE auto-save" 2>/dev/null || echo "  -> No changes to commit."
git push origin main 2>&1

echo ""
echo "========================================="
echo "  State saved successfully!"
echo "========================================="
