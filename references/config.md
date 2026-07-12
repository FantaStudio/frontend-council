# Configure members

Edit `council.config.yaml` to set chairman and members. See `council.config.example.yaml` for the default frontend-council setup.

```yaml
council:
  chairman:
    role: auto
  members:
    - name: junior-portal
      level: junior
      project: corporate-portal
      tier: fast
      model: composer-2.5-fast
      persona_file: references/personas/junior-portal.md
      emoji: '🌱'
      color: 'GREEN'
  settings:
    execution: desktop
    exclude_chairman_from_members: true
    timeout: 180
```

## Execution mode

- `settings.execution: desktop` (default) — chairman запускает **Task subagents** в Cursor Desktop с `model` каждого member; ответы пишутся через `council.sh record`.
- `settings.execution: cli` — headless workers (`agent -p`, `claude`, `codex`, …). Флаг `start --cli` переопределяет на CLI.

## Member fields

- `name` — stable identifier (lowercase, short), e.g. `junior-portal`.
- `level` — seniority label for synthesis (`junior`, `middle`, `senior`); included in `results --json`.
- `project` — project context slug (`corporate-portal`, `ai-platform`, `custom-solutions`); included in results.
- `tier` — tier for model mapping (`fast`, `medium`, `pro`); maps via `tier-models.js`.
- `model` — model id for Cursor Task (`composer-2.5-fast`, `gpt-5.5-medium`, `gemini-3.1-pro`); included in `start --json` and `results --json`.
- `command` — только для `execution: cli`; генерируется `generate-config.js` при install.
- `persona_file` — path to persona markdown relative to skill root; assembled into per-member prompt at job start.
- `emoji` and `color` — optional UI labels for checklist and status output.

Add custom members by appending entries to `members`. Each member must have a `persona_file` pointing to a markdown file with role context and response format.

Note: `install.sh` runs `generate-config.js`. В desktop-режиме `command` не нужен — достаточно `tier`/`model`.
