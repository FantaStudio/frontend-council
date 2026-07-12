---
name: frontend-council
description: >-
  Your frontend second opinion: three developers debate, you get the verdict.
  Junior, middle, and senior perspectives from different corporate projects.
  Use for "call the council", "frontend-council", contentious frontend decisions.
  Works in English and Russian.
---

# Frontend Council

Collect council opinions and synthesize the verdict. **Spec:** `docs/superpowers/specs/2026-06-30-frontend-council-design.md`

## Members

| Member        | Level  | Project           | Model             |
| ------------- | ------ | ----------------- | ----------------- |
| junior-portal | Junior | Corporate portal  | composer-2.5-fast |
| middle-ai     | Middle | AI platform       | gpt-5.5-medium    |
| senior-custom | Senior | Custom solutions  | gemini-3.1-pro    |

## Workflow (desktop, default)

1. `JOB_JSON=$(./scripts/council.sh start --json "$ARGUMENTS")`
2. From JSON, take `desktopMembers[]` — for **each** member launch **Task** in parallel:
   - `subagent_type`: `generalPurpose`
   - `model`: `desktopMembers[].model`
   - `description`: `[Frontend Council] <name>`
   - `prompt`: `desktopMembers[].prompt`
3. After each Task, record the response:
   `./scripts/council.sh record "$JOB_DIR" <name> --stdin` (heredoc with full text)
4. `./scripts/council.sh results --json "$JOB_DIR"`
5. Synthesize per `references/synthesis.md` (match the user's language)
6. `./scripts/council.sh clean "$JOB_DIR"`

Details: `references/desktop-workflow.md`

## CLI fallback

For terminal without host agent: `settings.execution: cli` or `./scripts/council.sh start --cli "question"`.

## One-shot (CLI only)

```bash
./scripts/council.sh --cli "question"
```

## Install

**Recommended (skills.sh / Cursor / Claude Code / etc.):**

```bash
npx skills add FantaStudio/frontend-council -g -y
cd ~/.cursor/skills/frontend-council && npm install && node scripts/generate-config.js .
```

**From a local clone:**

```bash
./scripts/install.sh --target both
```

## References

- `references/desktop-workflow.md` — Task subagents in Cursor
- `references/overview.md` — workflow
- `references/synthesis.md` — chairman output format
- `references/host-ui.md` — checklist in Cursor
- `references/config.md` — member configuration
