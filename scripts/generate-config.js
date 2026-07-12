#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { TIER_MODELS } = require('./lib/tier-models.js');
const { DESKTOP } = require('./lib/execution-mode.js');

const SCRIPT_DIR = __dirname;
const SKILL_DIR = path.resolve(SCRIPT_DIR, '..');

function hasCli(binary) {
  const result = spawnSync('command', ['-v', binary], {
    shell: true,
    stdio: 'ignore',
  });
  return result.status === 0;
}

function hasAgentCli() {
  return hasCli('agent') || hasCli('cursor') || hasCli('cursor-agent');
}

/**
 * Собирает command/model для member по tier и режиму исполнения.
 *
 * @param tier — fast | medium | pro
 * @param execution — desktop | cli
 * @returns {{ command: string | null, model: string }}
 */
function resolveMemberForExecution(tier, execution = DESKTOP) {
  const model = TIER_MODELS[tier] || TIER_MODELS.medium;

  if (execution === DESKTOP) {
    return { command: null, model };
  }

  if (hasAgentCli()) {
    return {
      command: `agent -p --trust --model ${model}`,
      model,
    };
  }

  if (tier === 'fast' && hasCli('claude')) {
    return { command: 'claude -p', model };
  }
  if (tier === 'medium' && hasCli('codex')) {
    return { command: 'codex exec', model };
  }
  if (tier === 'pro' && hasCli('gemini')) {
    return { command: 'gemini', model };
  }

  if (hasCli('claude')) {
    return { command: 'claude -p', model };
  }
  if (hasCli('codex')) {
    return { command: 'codex exec', model };
  }
  if (hasCli('gemini')) {
    return { command: 'gemini', model };
  }

  return { command: null, model };
}

/**
 * @deprecated Используйте resolveMemberForExecution
 */
function resolveMemberCommand(tier) {
  return resolveMemberForExecution(tier, 'cli');
}

function loadYaml() {
  try {
    return require('yaml');
  } catch {
    process.stderr.write(
      'Missing dependency: yaml. Run npm install in the skill directory.\n',
    );
    process.exit(1);
  }
}

function main() {
  const destSkillDir = process.argv[2] || SKILL_DIR;
  const examplePath = path.join(destSkillDir, 'council.config.example.yaml');
  const outPath = path.join(destSkillDir, 'council.config.yaml');

  if (!fs.existsSync(examplePath)) {
    process.stderr.write(`missing ${examplePath}\n`);
    process.exit(1);
  }

  const YAML = loadYaml();
  const parsed = YAML.parse(fs.readFileSync(examplePath, 'utf8'));
  const members = parsed?.council?.members;
  const execution = String(parsed?.council?.settings?.execution || DESKTOP);

  if (!Array.isArray(members)) {
    process.stderr.write(
      'invalid example config: council.members must be an array\n',
    );
    process.exit(1);
  }

  const resolvedCommands = members.map((member) => {
    const tier = String(member.tier || 'medium');
    return resolveMemberForExecution(tier, execution);
  });

  const uniqueCommands = new Set(
    resolvedCommands.map((r) => r.command).filter(Boolean),
  );

  if (execution !== DESKTOP && uniqueCommands.size === 0) {
    process.stderr.write(
      'warning: no member CLI detected; council.config.yaml keeps example commands\n',
    );
  } else if (
    execution !== DESKTOP &&
    hasAgentCli() &&
    uniqueCommands.size === 1
  ) {
    const only = [...uniqueCommands][0];
    if (!only.includes('--model')) {
      process.stderr.write(
        `warning: single CLI without per-tier models: ${only}\n`,
      );
    }
  }

  for (let i = 0; i < members.length; i++) {
    const resolved = resolvedCommands[i];
    if (resolved.command) {
      members[i].command = resolved.command;
    } else {
      delete members[i].command;
    }
    if (resolved.model) {
      members[i].model = resolved.model;
    }
  }

  fs.writeFileSync(outPath, YAML.stringify(parsed), 'utf8');
  process.stdout.write(`generated: ${outPath}\n`);
}

if (require.main === module) {
  main();
}

module.exports = {
  hasCli,
  hasAgentCli,
  resolveMemberCommand,
  resolveMemberForExecution,
  TIER_MODELS,
};
