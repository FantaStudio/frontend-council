# Frontend Council

Agent skill for Cursor and other coding agents. Runs three parallel frontend developer personas (junior / middle / senior) from different corporate projects, then synthesizes a chairman verdict.

Follows the [Agent Skills](https://agentskills.io/) format.

<!-- Replace YOUR_GITHUB_USER after publishing -->
<!-- [![skills.sh](https://skills.sh/b/YOUR_GITHUB_USER/frontend-council)](https://skills.sh/YOUR_GITHUB_USER/frontend-council) -->

## What it does

- Spawns 3 council members in parallel via Cursor `Task` subagents (desktop) or CLI fallback
- Collects opinions from junior (portal), middle (AI platform), and senior (custom solutions) personas
- Synthesizes a final recommendation as the host agent

## Install

```bash
npx skills add YOUR_GITHUB_USER/frontend-council -g -y
```

Global install (`-g`) makes the skill available in every project. Omit `-g` to install into the current repo only.

Other source formats:

```bash
# Full GitHub URL
npx skills add https://github.com/YOUR_GITHUB_USER/frontend-council

# Local path (development)
npx skills add ./frontend-council -g -y
```

After install, install Node dependencies once (required for `scripts/`):

```bash
cd ~/.cursor/skills/frontend-council   # or ~/.agents/skills/frontend-council
npm install
node scripts/generate-config.js .
```

On Windows, use the equivalent path under your user profile.

## Usage

Trigger phrases (Russian or English):

- «созови совет»
- «frontend-council»
- «мнение фронтендеров»
- disputed frontend architecture decisions

Example:

```
Созови frontend-council: стоит ли выносить форму в отдельный компонент или оставить inline?
```

The host agent reads `SKILL.md`, starts council members, records answers, and synthesizes the result.

## Skill structure

```
frontend-council/
├── SKILL.md              # Agent instructions (required)
├── references/           # Personas, synthesis format, config docs
├── scripts/              # council.sh, config generator, tests
├── council.config.example.yaml
└── package.json          # yaml dependency for scripts
```

## Customize members

Copy and edit the example config:

```bash
cp council.config.example.yaml council.config.yaml
```

See `references/config.md` for member tiers, models, and execution modes.

## Development

```bash
npm install
npm test
./scripts/install.sh --target both   # legacy local install
```

## Publish checklist

1. Create a public GitHub repo named `frontend-council`
2. Push this repository
3. Replace `YOUR_GITHUB_USER` in this README and uncomment the skills.sh badge
4. Run the first install yourself: `npx skills add YOUR_GITHUB_USER/frontend-council -g -y`
5. Add GitHub topics: `agent-skills`, `cursor`, `claude-code`, `frontend`

There is no separate registry submission. After people install via `npx skills add`, the skill can appear on [skills.sh](https://skills.sh/) through install telemetry.

## License

MIT
