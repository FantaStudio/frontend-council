# Overview

Frontend Council gathers opinions from three frontend developer personas (junior, middle, senior) on different corporate projects. Each member receives a persona-specific prompt assembled from `references/personas/*.md` plus the user's question.

The chairman synthesizes the final response — always the current host agent (`role: auto`). There is no `chairman.command`; synthesis follows `references/synthesis.md`.

Configure members in `council.config.yaml`. Default execution is **desktop** (Cursor Task subagents). See `references/desktop-workflow.md`.

## Workflow (3 stages)

1. **Prepare prompts** — `council.sh start --json` writes `members/<name>/prompt.txt` and returns `desktopMembers` with `model` + `prompt` for each member.
2. **Collect responses** — Chairman runs Task subagents in parallel, then `council.sh record` per member. Poll with `council.sh status` / `wait`; update checklist per `references/host-ui.md`.
3. **Chairman synthesis** — Host agent reads `council.sh results --json` (includes `level`, `project`, `tier`, `model` per member) and produces the final answer per `references/synthesis.md`.

For headless CLI execution, set `settings.execution: cli` or use `start --cli`.
