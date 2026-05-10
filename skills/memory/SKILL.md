---
name: memory
description: >
  Persistent session memory and worklog management across conversations.
  Use this skill whenever you need to recall past session work, restore context
  from a previous conversation, log session activity, save session state before
  ending, or bootstrap a new session from the cally-D repo. Also triggers when
  the user mentions "worklog", "session history", "past sessions", "remember
  what we did", "save state", "boot from cally-d", "restore session", or
  "session memory". This skill is the single source of truth for cross-session
  continuity.
---

# Memory Skill — Persistent Session Memory via cally-D

## Why This Exists

Each conversation session starts with a blank slate. The worklog and repo-based
storage in cally-D provide continuity so that context, progress, and decisions
carry forward across sessions automatically.

## Architecture

```
cally-D/                          # Git repo — persistent store
├── skills/memory/                # This skill
│   ├── SKILL.md                  # You are reading this
│   ├── scripts/
│   │   ├── bootstrap.sh          # Restore session at start
│   │   └── save-state.sh         # Persist session before end
│   └── references/
│       └── worklog-schema.md     # Worklog format reference
├── config/
│   └── worklog.md                # The actual worklog (append-only)
├── prompts/                      # Reusable prompt templates
├── agent.md                      # Process documentation
└── index.html                    # GitHub Pages site
```

## Session Lifecycle

### 1. Bootstrap (Session Start)

When a new session begins, the agent should:

1. Check if `/home/z/my-project/.git-remote-cally-d` exists.
2. If not, clone the repo: `git clone https://github.com/fransbell/cally-D.git .git-remote-cally-d`
3. If it exists, pull latest: `cd .git-remote-cally-d && git pull`
4. Copy the worklog to the workspace: `cp config/worklog.md /home/z/my-project/worklog.md`
5. Read the worklog to understand prior session history.
6. Report a brief summary to the user.

**Trigger phrases from user:** "boot from cally-d", "restore session", "pull my memory", "load worklog"

### 2. Working (During Session)

- The agent appends entries to `/home/z/my-project/worklog.md` after each significant task.
- Worklog entries follow the schema defined in `references/worklog-schema.md`.
- Each entry captures: Task ID, agent name, task description, work log steps, and stage summary.

### 3. Save State (Session End)

Before the session ends, the agent should:

1. Copy the updated worklog back: `cp /home/z/my-project/worklog.md /home/z/my-project/.git-remote-cally-d/config/worklog.md`
2. Copy any new custom skills created during the session into the repo.
3. Commit and push:
   ```bash
   cd /home/z/my-project/.git-remote-cally-d
   git add -A
   git commit -m "session: <date> <brief summary>"
   git push origin main
   ```

**Trigger phrases from user:** "save state", "persist session", "push to cally-d", "save my work"

## Worklog Entry Format

Every worklog entry MUST follow this template:

```markdown
---
Task ID: <id, e.g. 1, 2-a, 3>
Agent: <agent name>
Task: <description of the task>

Work Log:
- <concrete step 1>
- <concrete step 2>
- ...

Stage Summary:
- <key results / decisions / artifacts>
```

Entries are appended in chronological order. NEVER overwrite existing entries.

## Key Principles

- **Append-only worklog**: Never delete or modify past entries. Only append.
- **Git is the transport**: The cally-D repo is the persistence layer. Clone at start, push at end.
- **Idempotent bootstrap**: Running bootstrap multiple times should be safe (pull if exists, clone if not).
- **Minimal footprint**: Only persist what matters — worklog, custom skills, and config. Don't persist temporary files or build artifacts.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Clone fails | Check network access and repo permissions |
| Push rejected | Pull first (`git pull --rebase`), then push |
| Worklog missing | Create it from the template in `references/worklog-schema.md` |
| Merge conflicts | Prefer the remote version for worklog; manual merge for skills |
