# Agent Process Documentation

> This document describes the end-to-end process for maintaining persistent session memory across conversations using the cally-D repository.

## Overview

The **cally-D** repo (`https://github.com/fransbell/cally-D.git`) serves as a persistent storage layer for cross-session continuity. It stores the worklog, custom skills, prompts, and configuration that allow an AI agent to "remember" past sessions and resume work seamlessly.

## Repository Structure

```
cally-D/
├── skills/
│   └── memory/                    # Session memory skill
│       ├── SKILL.md               # Skill definition & instructions
│       ├── scripts/
│       │   ├── bootstrap.sh       # Session start: clone/pull + restore
│       │   └── save-state.sh      # Session end: copy back + commit + push
│       └── references/
│           └── worklog-schema.md  # Worklog format reference
├── config/
│   └── worklog.md                 # Append-only session worklog
├── prompts/                       # Reusable prompt templates (future use)
├── agent.md                       # This file
├── index.html                     # GitHub Pages landing
└── README.md                      # Repo readme
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

3. **Pull latest** from remote (in case of concurrent changes): `git pull origin main`

4. **Stage, commit, and push:**
   ```bash
   git add -A
   git commit -m "session: YYYY-MM-DD_HH:MM brief-summary"
   git push origin main
   ```

5. **Confirm** to the user that the session state has been saved.

## Quick Reference Commands

| Action | Command / Phrase |
|--------|-----------------|
| Start session | "Boot from cally-d" / "Restore session" |
| View history | "Show my worklog" / "What did we do last session?" |
| Save session | "Save state" / "Push to cally-d" |
| Add worklog entry | Automatic after each task, or "Log this task" |

## Troubleshooting

| Issue | Resolution |
|-------|-----------|
| `git push` rejected | Pull first: `git pull --rebase origin main`, then push |
| Clone fails | Check internet access and repo URL/permissions |
| Worklog not found | Bootstrap will create a fresh one automatically |
| Merge conflict on worklog | Keep both versions (append-only); resolve manually if needed |
| Bootstrap runs twice | Safe — it's idempotent (pull if exists, clone if not) |

## Design Decisions

1. **Why git?** Git provides version control, free hosting via GitHub, and reliable sync. It's the simplest persistence layer that requires no additional infrastructure.

2. **Why append-only worklog?** Past session history should never be rewritten. The worklog is a log, not a document. This prevents accidental data loss and maintains an audit trail.

3. **Why separate `.git-remote-cally-d` directory?** The workspace itself may have its own git repo. Keeping cally-D in a separate directory avoids conflicts and keeps concerns separated.

4. **Why copy files instead of symlinks?** Symlinks break across environments and sessions. File copies are reliable and allow the workspace to function independently if the repo is unavailable.

5. **Why not a database?** For the current scale (session-level entries), a markdown file in git is simpler, more transparent, and easier to debug than a database.

## Future Enhancements

- **Prompt templates**: Store reusable prompt templates in `prompts/` for common workflows
- **Skill versioning**: Track skill versions and changes across sessions
- **Session analytics**: Aggregate worklog data to produce usage reports
- **Auto-save hooks**: Trigger save-state automatically on session timeout
