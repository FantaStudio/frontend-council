---
name: frontend-council
description: >-
  Собирает мнения трёх фронтенд-разработчиков (junior/middle/senior) с разных
  корпоративных проектов через параллельные Task в Cursor Desktop, синтез —
  текущий агент. Использовать при «созови совет», «frontend-council»,
  «мнение фронтендеров», спорных фронтенд-решениях.
---

# Frontend Council

Собери мнения совета и синтезируй итог. **Spec:** `docs/superpowers/specs/2026-06-30-frontend-council-design.md`

## Участники

| Member        | Уровень | Проект               | Model             |
| ------------- | ------- | -------------------- | ----------------- |
| junior-portal | Junior  | Корпоративный портал | composer-2.5-fast |
| middle-ai     | Middle  | ИИ-платформа         | gpt-5.5-medium    |
| senior-custom | Senior  | Заказные решения     | gemini-3.1-pro    |

## Workflow (desktop, по умолчанию)

1. `JOB_JSON=$(./scripts/council.sh start --json "$ARGUMENTS")`
2. Из JSON возьми `desktopMembers[]` — для **каждого** member параллельно запусти **Task**:
   - `subagent_type`: `generalPurpose`
   - `model`: `desktopMembers[].model`
   - `description`: `[Frontend Council] <name>`
   - `prompt`: `desktopMembers[].prompt`
3. После каждого Task запиши ответ:
   `./scripts/council.sh record "$JOB_DIR" <name> --stdin` (heredoc с полным текстом)
4. `./scripts/council.sh results --json "$JOB_DIR"`
5. Синтез по `references/synthesis.md`
6. `./scripts/council.sh clean "$JOB_DIR"`

Подробности: `references/desktop-workflow.md`

## CLI fallback

Для терминала без host agent: `settings.execution: cli` или `./scripts/council.sh start --cli "вопрос"`.

## One-shot (только CLI)

```bash
./scripts/council.sh --cli "вопрос"
```

## Установка

**Рекомендуется (skills.sh / Cursor / Claude Code / др.):**

```bash
npx skills add YOUR_GITHUB_USER/frontend-council -g -y
cd ~/.cursor/skills/frontend-council && npm install && node scripts/generate-config.js .
```

**Локально из клона репозитория:**

```bash
./scripts/install.sh --target both
```

## References

- `references/desktop-workflow.md` — Task subagents в Cursor
- `references/overview.md` — workflow
- `references/synthesis.md` — формат итога chairman
- `references/host-ui.md` — checklist в Cursor
- `references/config.md` — настройка members
