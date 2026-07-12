# Desktop workflow (Cursor Agent)

Режим `execution: desktop` — участники совета вызываются через **Task subagent** в Cursor Desktop, а не через headless `agent -p` CLI.

## Почему

CLI `agent -p --model <name>` может отклонять named models с ошибкой «Free plans can only use Auto», даже при Pro в IDE. Task в Desktop использует подписку и выбранные модели напрямую.

## Workflow для chairman (host agent)

1. **Подготовка job**

```bash
JOB_JSON=$(./scripts/council.sh start --json "вопрос пользователя")
```

В JSON: `execution: "desktop"`, `members[]` с полями `name`, `model`, `prompt`, `promptPath`.

2. **Параллельный запуск Task** — один Task на member, в одном сообщении:

| Поле Task           | Значение                                                     |
| ------------------- | ------------------------------------------------------------ |
| `subagent_type`     | `generalPurpose`                                             |
| `model`             | `members[].model` (напр. `gpt-5.5-medium`, `gemini-3.1-pro`) |
| `description`       | `[Frontend Council] <name>`                                  |
| `prompt`            | содержимое `members[].prompt`                                |
| `run_in_background` | `false`                                                      |

3. **Запись ответов**

После каждого Task:

```bash
./scripts/council.sh record "$JOB_DIR" junior-portal --stdin <<'EOF'
<полный ответ member>
EOF
```

При ошибке:

```bash
./scripts/council.sh record "$JOB_DIR" middle-ai --stdin --state error <<'EOF'
текст ошибки
EOF
```

4. **Результаты и синтез**

```bash
./scripts/council.sh results --json "$JOB_DIR"
```

Синтез по `references/synthesis.md`, затем:

```bash
./scripts/council.sh clean "$JOB_DIR"
```

## CLI fallback

Терминал без host agent:

```bash
./scripts/council.sh start --cli "вопрос"
# или council.config.yaml: settings.execution: cli
```

## Модели по tier

См. `scripts/lib/tier-models.js` и `council.config.yaml` — поле `model` на каждом member.
