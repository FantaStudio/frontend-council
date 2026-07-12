# Frontend Council

[![skills.sh](https://skills.sh/b/FantaStudio/frontend-council)](https://skills.sh/FantaStudio/frontend-council/frontend-council)

> **Your frontend second opinion: three developers debate, you get the verdict.**

**[English](#english)** · **[Русский](#русский)**

---

## English

Agent skill for Cursor, Claude Code, and [skills.sh](https://skills.sh)-compatible clients. Three frontend personas (junior / middle / senior) answer in parallel; the host agent synthesizes a balanced verdict. Works in **English and Russian** — members and chairman reply in your language.

### When to use

- Choosing an approach: state management, data fetching, component structure
- Reviewing an idea before implementation: «should we do it this way?»
- Trade-offs: speed vs maintainability, reuse vs simplicity
- Contentious decisions where one agent answer is not enough

### Quick start

**1. Install**

```bash
npx skills add FantaStudio/frontend-council -g
```

Select **Cursor** when prompted (recommended). Non-interactive:

```bash
npx skills add FantaStudio/frontend-council -g -y -a cursor
```

**2. Install dependencies** (once)

```bash
cd ~/.cursor/skills/frontend-council && npm install
```

`council.config.yaml` is generated automatically.

| OS | Skill folder (Cursor, global) |
| --- | --- |
| Windows | `%USERPROFILE%\.cursor\skills\frontend-council` |
| macOS / Linux | `~/.cursor/skills/frontend-council` |

**3. Ask the council**

```
Call frontend-council: should I extract this form into a separate component?
```

Trigger phrases: `call the council`, `frontend-council`, `созови совет`, `мнение фронтендеров`.

### Example prompts

```
Call frontend-council: do I need Redux Toolkit for a 5-field form?
Call the council: custom hook or RTK Query for fetching?
Should I extract this form into a separate component?
```

```
Созови frontend-council: нужен ли Redux Toolkit для формы из 5 полей?
Созови совет: выносить fetch в custom hook или в RTK Query?
Стоит ли выносить эту форму в отдельный компонент?
```

### How it works

1. **Prepare** — `council.sh start` builds per-member prompts from personas + your question
2. **Debate** — three members answer in parallel (Cursor Task subagents by default)
3. **Verdict** — chairman synthesizes agreements, disagreements, recommendation, and a checklist

| Member | Level | Project | Default model |
| --- | --- | --- | --- |
| junior-portal | Junior | Corporate portal | composer-2.5-fast |
| middle-ai | Middle | AI platform | gpt-5.5-medium |
| senior-custom | Senior | Custom solutions | gemini-3.1-pro |

### Agent compatibility

| Agent | Skill loads | Full council (3 parallel members) |
| --- | --- | --- |
| **Cursor Desktop** | ✅ | ✅ — Task subagents |
| Cursor CLI | ✅ | ⚠️ CLI mode only |
| Claude Code, Cline, others | ✅ | ⚠️ CLI mode only (bash + agent CLI) |

Install to **Cursor** for the primary desktop workflow. Other agents read `SKILL.md`; parallel `Task` subagents are Cursor Desktop only.

### Configuration

Edit `council.config.yaml` next to `SKILL.md`. Defaults work out of the box.

```yaml
members:
  - name: junior-portal
    model: composer-2.5-fast   # change model

settings:
  execution: cli   # default: desktop — use for terminal / non-Cursor agents
```

- **Personas** — `references/personas/*.md`
- **Chairman format** — `references/synthesis.md`
- **Full reference** — `references/config.md`

After edits: `npm install` regenerates config.

### License

MIT — see [LICENSE](LICENSE).

---

## Русский

Agent skill для Cursor, Claude Code и клиентов, совместимых с [skills.sh](https://skills.sh). Три фронтенд-персоны (junior / middle / senior) отвечают параллельно; host-агент синтезирует сбалансированный итог. Работает на **английском и русском** — участники и chairman отвечают на вашем языке.

### Когда использовать

- Выбор подхода: state manager, data fetching, структура компонентов
- Ревью идеи до реализации: «стоит ли так делать?»
- Trade-off: скорость vs поддерживаемость, переиспользование vs простота
- Спорные решения, где одного ответа агента недостаточно

### Быстрый старт

**1. Установите скилл**

```bash
npx skills add FantaStudio/frontend-council -g
```

При установке выберите **Cursor** (рекомендуется). Без вопросов:

```bash
npx skills add FantaStudio/frontend-council -g -y -a cursor
```

**2. Поставьте зависимости** (один раз)

```bash
cd ~/.cursor/skills/frontend-council && npm install
```

`council.config.yaml` создаётся автоматически.

| ОС | Папка скилла (Cursor, глобально) |
| --- | --- |
| Windows | `%USERPROFILE%\.cursor\skills\frontend-council` |
| macOS / Linux | `~/.cursor/skills/frontend-council` |

**3. Спросите совет**

```
Созови frontend-council: стоит ли выносить форму в отдельный компонент?
```

Триггеры: `созови совет`, `frontend-council`, `мнение фронтендеров`, `call the council`.

### Примеры вопросов

```
Созови frontend-council: нужен ли Redux Toolkit для формы из 5 полей?
Созови совет: выносить fetch в custom hook или в RTK Query?
Стоит ли выносить эту форму в отдельный компонент?
```

```
Call frontend-council: do I need Redux Toolkit for a 5-field form?
Call the council: custom hook or RTK Query for fetching?
Should I extract this form into a separate component?
```

### Как это работает

1. **Подготовка** — `council.sh start` собирает промпты из персон + ваш вопрос
2. **Дебаты** — три участника отвечают параллельно (по умолчанию — Task subagents в Cursor)
3. **Вердикт** — chairman синтезирует согласия, разногласия, рекомендацию и чеклист

| Участник | Уровень | Проект | Модель по умолчанию |
| --- | --- | --- | --- |
| junior-portal | Junior | Корпоративный портал | composer-2.5-fast |
| middle-ai | Middle | ИИ-платформа | gpt-5.5-medium |
| senior-custom | Senior | Заказные решения | gemini-3.1-pro |

### Совместимость с агентами

| Агент | Скилл подхватывается | Полный совет (3 участника) |
| --- | --- | --- |
| **Cursor Desktop** | ✅ | ✅ — Task subagents |
| Cursor CLI | ✅ | ⚠️ только CLI-режим |
| Claude Code, Cline, др. | ✅ | ⚠️ только CLI-режим (bash + agent CLI) |

Ставьте в **Cursor** для основного сценария. В других IDE агент читает `SKILL.md`; параллельные `Task` — только в Cursor Desktop.

### Настройка

Редактируйте `council.config.yaml` рядом с `SKILL.md`. Из коробки менять ничего не нужно.

```yaml
members:
  - name: junior-portal
    model: composer-2.5-fast   # смена модели

settings:
  execution: cli   # по умолчанию: desktop — для терминала / других IDE
```

- **Персоны** — `references/personas/*.md`
- **Формат итога** — `references/synthesis.md`
- **Полный справочник** — `references/config.md`

После правок: `npm install` пересоздаст конфиг.

### Лицензия

MIT — см. [LICENSE](LICENSE).
