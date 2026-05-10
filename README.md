# Cally-D

Persistent session memory and worklog for AI agent conversations.

## What Is This?

Cally-D is a git-based persistence layer that allows AI agent sessions to carry context across conversations. It stores:

- **Worklog** — Append-only session history in `config/worklog.md`
- **Memory Skill** — Instructions for bootstrapping and saving session state in `skills/memory/`
- **Custom Skills** — Any user-created skills are backed up here
- **Prompts** — Reusable prompt templates for common workflows

## Quick Start

At the start of each session, say:

> **"Boot from cally-d"**

At the end of each session, say:

> **"Save state"**

## Repository Structure

```
cally-D/
├── skills/memory/          # Session memory skill
│   ├── SKILL.md
│   ├── scripts/
│   │   ├── bootstrap.sh    # Restore session at start
│   │   └── save-state.sh   # Persist session at end
│   └── references/
│       └── worklog-schema.md
├── config/
│   └── worklog.md          # Session worklog (append-only)
├── prompts/                # Reusable prompt templates
├── agent.md                # Process documentation
├── index.html              # GitHub Pages site
└── README.md
```

## How It Works

1. **Bootstrap**: Clone/pull the repo, restore worklog and custom skills
2. **Work**: Agent appends entries to the worklog after each task
3. **Save**: Copy worklog and new skills back, commit and push

See [agent.md](agent.md) for full process documentation.
