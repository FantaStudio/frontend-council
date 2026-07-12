# Desktop workflow (Cursor Agent)

With `execution: desktop`, council members are invoked via **Task subagent** in Cursor Desktop, not headless `agent -p` CLI.

## Why

CLI `agent -p --model <name>` may reject named models with "Free plans can only use Auto", even with Pro in the IDE. Task in Desktop uses your subscription and selected models directly.

## Workflow for the chairman (host agent)

1. **Prepare the job**

```bash
JOB_JSON=$(./scripts/council.sh start --json "user question")
```

JSON includes `execution: "desktop"`, `members[]` with `name`, `model`, `prompt`, `promptPath`.

2. **Launch Tasks in parallel** — one Task per member, in a single message:

| Task field          | Value                                                        |
| ------------------- | ------------------------------------------------------------ |
| `subagent_type`     | `generalPurpose`                                             |
| `model`             | `members[].model` (e.g. `gpt-5.5-medium`, `gemini-3.1-pro`) |
| `description`       | `[Frontend Council] <name>`                                  |
| `prompt`            | contents of `members[].prompt`                               |
| `run_in_background` | `false`                                                      |

3. **Record responses**

After each Task:

```bash
./scripts/council.sh record "$JOB_DIR" junior-portal --stdin <<'EOF'
<full member response>
EOF
```

On error:

```bash
./scripts/council.sh record "$JOB_DIR" middle-ai --stdin --state error <<'EOF'
error message
EOF
```

4. **Results and synthesis**

```bash
./scripts/council.sh results --json "$JOB_DIR"
```

Synthesize per `references/synthesis.md`, then:

```bash
./scripts/council.sh clean "$JOB_DIR"
```

## CLI fallback

Terminal without a host agent:

```bash
./scripts/council.sh start --cli "question"
# or council.config.yaml: settings.execution: cli
```

## Models by tier

See `scripts/lib/tier-models.js` and `council.config.yaml` — `model` field on each member.
