# Agent Process Documentation

> This document describes the end-to-end process for maintaining persistent session memory across conversations using the cally-D repository.

## Overview

The **cally-D** repo (`https://github.com/fransbell/cally-D.git`) serves as a persistent storage layer for cross-session continuity. It stores the worklog, custom skills, prompts, and configuration that allow an AI agent to "remember" past sessions and resume work seamlessly.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Static Site Generator | Vite + React + TypeScript |
| UI Library | Mantine UI v7 |
| Persistence | Git (cally-D repo) |
| Deployment | GitHub Pages (local build + gh-pages branch) |
| Build Hook | Git pre-push (builds locally before push) |
| Workflow | PR-based — all changes via feature branches + Pull Requests |

## Repository Structure

```
cally-D/
├── src/                            # Flat source directory (Vite + React)
│   ├── main.tsx                    # Entry point with MantineProvider
│   ├── App.tsx                     # Main app component
│   ├── index.css                   # Global styles
│   └── assets/                     # Static assets
├── public/                         # Public static files
├── skills/
│   ├── memory/                     # Session memory skill
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   │   ├── bootstrap.sh
│   │   │   └── save-state.sh
│   │   └── references/
│   │       └── worklog-schema.md
│   └── mantine-ui/                 # Mantine UI reference skill
│       ├── SKILL.md
│       └── references/
│           ├── mantine-index.md
│           └── mantine-part1..49.md
├── scripts/                        # Utility scripts
│   ├── setup-hooks.sh              # Install git hooks
│   ├── pre-push                    # Pre-push hook: build before push
│   └── deploy-pages.sh             # Deploy build/ to gh-pages branch
├── config/
│   └── worklog.md                  # Append-only session worklog
├── prompts/                        # Reusable prompt templates
├── index.html                      # Vite entry HTML
├── vite.config.ts                  # Vite configuration
├── postcss.config.cjs              # PostCSS config for Mantine
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript config
├── agent.md                        # This file
└── README.md                       # Repo readme
```

## Session Lifecycle

### Phase 1: Bootstrap (Start of Session)

**When:** At the very beginning of each new conversation, or when the user says "boot from cally-d", "restore session", "load my memory".

**Steps:**

1. **Clone or Pull** the cally-D repo to `/home/z/my-project/.git-remote-cally-d`
   - If the directory already exists: `git pull origin main`
   - If not: `git clone https://github.com/fransbell/cally-D.git .git-remote-cally-d`

2. **Restore the worklog** from `config/worklog.md` to `/home/z/my-project/worklog.md`
   - If no worklog exists, create a fresh one with the standard header.

3. **Restore custom skills** from the repo's `skills/` directory (excluding `memory/` which is built-in) into the workspace's `skills/` directory.

4. **Restore prompts** from `prompts/` if any exist.

5. **Read and summarize** the last few worklog entries to provide context to the user.

6. **Report** a brief summary: "Restored N session entries. Last session was on [date]."

### Phase 2: Working (During Session)

**When:** Throughout the conversation, after each significant task or subtask.

**Steps:**

1. After completing a task, **append an entry** to `/home/z/my-project/worklog.md` using the standard format (see worklog-schema.md).

2. Each entry includes: Task ID, Agent name, Task description, Work Log (steps), Stage Summary (results).

3. Entries are always **appended**, never modified or deleted.

### Phase 3: Save State (End of Session)

**When:** Before the conversation ends, or when the user says "save state", "persist session", "push to cally-d".

**Steps:**

1. **Copy the worklog** from `/home/z/my-project/worklog.md` back to `config/worklog.md` in the repo.

2. **Copy any new custom skills** created during the session into the repo's `skills/` directory.

3. **Create a feature branch and PR** (see PR Workflow below).

4. **Confirm** to the user that the session state has been saved and provide the PR link.

---

## PR Workflow — All Changes via Pull Requests

### Rule: NEVER push directly to `main`

Every change to the cally-D repository must go through a Pull Request. This ensures:

- **Review trail** — Every change is visible and reviewable
- **Rollback safety** — Bad changes can be reverted by merging a revert PR
- **Build verification** — The pre-push hook validates the build before any branch is pushed
- **Clean history** — Squash-merged PRs produce a linear, readable git log

### Branch Naming Convention

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat/` | New feature or addition | `feat/memory-skill`, `feat/mantine-ui` |
| `fix/` | Bug fix | `fix/createRoot-mount`, `fix/asset-paths` |
| `docs/` | Documentation only | `docs/update-agent-md`, `docs/README` |
| `refactor/` | Code restructuring | `refactor/src-structure` |
| `chore/` | Maintenance, configs, deps | `chore/update-vite`, `chore/git-hooks` |

### Step-by-Step PR Process

```
1. Pull latest main
   git checkout main && git pull origin main

2. Create feature branch
   git checkout -b feat/my-change

3. Make changes and commit
   git add -A
   git commit -m "feat: description of change"

4. Push feature branch (pre-push hook runs build)
   git push origin feat/my-change

5. Create PR via GitHub API
   gh pr create --title "feat: description" --body "## What This PR Does..."

6. Share PR link with user for review

7. User merges the PR

8. Pull merged main
   git checkout main && git pull origin main

9. Deploy if needed
   ./scripts/deploy-pages.sh
```

### When to Create a PR

| Scenario | Action |
|----------|--------|
| End of session (save state) | Create 1 PR with all session changes |
| Major feature completed | Create a PR immediately |
| Bug fix | Create a PR immediately |
| Work in progress (not ready) | Push branch, create draft PR |
| Small config change | Still create a PR — no exceptions |

### PR Template

Every PR description should include:

```markdown
## What This PR Adds

[Summary of changes]

### Files Changed

| File | Change |
|------|--------|
| `path/to/file` | What was changed and why |

### Testing

- [ ] Build passes (`npm run build`)
- [ ] Dev server runs (`npm run dev`)
- [ ] GitHub Pages looks correct (if UI changes)

### Related

- Worklog entry: Task ID #N
```

### Merging PRs

- Use **squash merge** by default to keep history clean
- Delete the feature branch after merge
- Pull `main` after every merge before starting new work

```bash
# Merge via gh CLI
gh pr merge <number> --squash --delete-branch

# Then pull
git checkout main && git pull origin main
```

---

## Development & Deployment Workflow

### Git Hooks (Local Build)

The project uses a **pre-push git hook** that automatically builds the project before every push. If the build fails, the push is aborted.

```bash
# Install hooks (run once after clone)
./scripts/setup-hooks.sh

# Now every `git push` will:
# 1. Run npm run build
# 2. If build succeeds → push proceeds
# 3. If build fails → push is blocked
```

### Deploy to GitHub Pages

After a PR is merged and main is updated, deploy the built site:

```bash
# Deploy build/ to gh-pages branch
./scripts/deploy-pages.sh

# This script:
# 1. Runs npm run build (output → build/)
# 2. Clones/updates gh-pages branch
# 3. Copies build/ contents to gh-pages
# 4. Pushes gh-pages to origin
# Site: https://fransbell.github.io/cally-D/
```

### Standard Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build to build/ folder
npm run preview      # Preview production build
./scripts/setup-hooks.sh   # Install git hooks
./scripts/deploy-pages.sh  # Deploy to GitHub Pages
```

## Quick Reference Commands

| Action | Command / Phrase |
|--------|-----------------|
| Start session | "Boot from cally-d" / "Restore session" |
| View history | "Show my worklog" / "What did we do last session?" |
| Save session | "Save state" / "Push to cally-d" |
| Add worklog entry | Automatic after each task, or "Log this task" |
| Start dev server | `npm run dev` |
| Create PR | `gh pr create` or tell agent "create a PR" |

## Troubleshooting

| Issue | Resolution |
|-------|-----------|
| `git push` rejected | Pull first: `git pull --rebase origin main`, then push |
| Clone fails | Check internet access and repo URL/permissions |
| Worklog not found | Bootstrap will create a fresh one automatically |
| Merge conflict on worklog | Keep both versions (append-only); resolve manually if needed |
| Bootstrap runs twice | Safe — it's idempotent (pull if exists, clone if not) |
| Mantine styles missing | Ensure `postcss.config.cjs` is in project root and PostCSS is installed |
| Vite build fails | Run `npm install` to ensure all dependencies are present |
| Blank page on deploy | Check `main.tsx` has `createRoot().render()` — not just `export default` |
| JS bundle too small | Rollup tree-shaking bug — ensure `treeshake: false` in `vite.config.ts` |

## Design Decisions

1. **Why git?** Git provides version control, free hosting via GitHub, and reliable sync. It's the simplest persistence layer that requires no additional infrastructure.

2. **Why append-only worklog?** Past session history should never be rewritten. The worklog is a log, not a document. This prevents accidental data loss and maintains an audit trail.

3. **Why separate `.git-remote-cally-d` directory?** The workspace itself may have its own git repo. Keeping cally-D in a separate directory avoids conflicts and keeps concerns separated.

4. **Why Vite + React?** Fast dev server, excellent TypeScript support, and optimized builds. The React ecosystem pairs well with Mantine UI.

5. **Why Mantine?** Comprehensive component library with 100+ components, built-in dark mode, accessibility, and excellent TypeScript support. The llms.txt resource makes it ideal for AI-assisted development.

6. **Why flat /src?** Simplicity for now. The project structure will evolve as features are added, but starting flat keeps things easy to navigate.

7. **Why not a database?** For the current scale (session-level entries), a markdown file in git is simpler, more transparent, and easier to debug than a database.

8. **Why PR-only workflow?** Direct pushes to main create unreviewed changes with no rollback path. PRs provide a review checkpoint, build verification via the pre-push hook, and a clean squash-merged history. This is especially important for AI-generated code where human oversight is valuable.

9. **Why `treeshake: false`?** Rollup's tree-shaking has a known compatibility issue with React 19 + Mantine where it aggressively removes the entire React app code, leaving only the modulepreload polyfill. Disabling tree-shaking produces a working 444KB bundle instead of a broken 0.8KB one. This can be revisited when the upstream issue is resolved.

## Future Enhancements

- **Prompt templates**: Store reusable prompt templates in `prompts/` for common workflows
- **Skill versioning**: Track skill versions and changes across sessions
- **Session analytics**: Aggregate worklog data to produce usage reports
- **Auto-save hooks**: Trigger save-state automatically on session timeout
- **GitHub Actions**: Auto-deploy to GitHub Pages on merge to main
- **Dynamic worklog UI**: Render worklog entries in the React app with live data
- **Branch protection**: Enable GitHub branch protection rules on `main` to enforce PR-only merges
