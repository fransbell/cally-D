# Worklog Schema Reference

## File Location

The worklog lives at `config/worklog.md` in the cally-D repo, and is copied to `/home/z/my-project/worklog.md` during bootstrap.

## Format

The worklog uses a simple markdown-based format. Each entry is separated by a horizontal rule and contains structured fields.

```markdown
---
Task ID: <string>
Agent: <string>
Task: <string>

Work Log:
- <step 1>
- <step 2>
- ...

Stage Summary:
- <result 1>
- <result 2>
```

## Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| Task ID | Yes | Unique identifier reflecting order and parallelism (e.g., `1`, `2-a`, `2-b`, `3`) |
| Agent | Yes | Name of the agent or "main" for the primary agent |
| Task | Yes | Brief description of what the task was |
| Work Log | Yes | Bullet list of concrete steps taken |
| Stage Summary | Yes | Key results, decisions, and artifacts produced |

## Example

```markdown
---
Task ID: 1
Agent: main
Task: Clone cally-D repo and set up memory skill

Work Log:
- Cloned https://github.com/fransbell/cally-D.git to .git-remote-cally-d
- Explored existing repo structure (index.html, README.md)
- Created skills/memory/SKILL.md with session lifecycle instructions
- Created bootstrap.sh and save-state.sh scripts
- Created agent.md with process documentation

Stage Summary:
- Memory skill fully created and documented
- Bootstrap and save-state scripts ready
- All files committed and pushed to cally-D
```

## Rules

1. **Append only** — Never modify or delete existing entries
2. **Chronological order** — New entries go at the bottom
3. **One entry per task** — Each discrete task gets its own entry
4. **Be specific** — Include file paths, URLs, and concrete details
5. **Summary matters** — The Stage Summary is what future sessions will scan first
