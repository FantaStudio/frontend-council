const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { TIER_MODELS } = require('../lib/tier-models.js');
const {
  resolveMemberCommand,
  resolveMemberForExecution,
} = require('../generate-config.js');
const { DESKTOP } = require('../lib/execution-mode.js');

describe('tier-models', () => {
  it('defines distinct models per tier', () => {
    assert.equal(TIER_MODELS.fast, 'composer-2.5-fast');
    assert.equal(TIER_MODELS.medium, 'gpt-5.5-medium');
    assert.equal(TIER_MODELS.pro, 'gemini-3.1-pro');
    assert.notEqual(TIER_MODELS.fast, TIER_MODELS.medium);
    assert.notEqual(TIER_MODELS.medium, TIER_MODELS.pro);
  });
});

describe('resolveMemberForExecution', () => {
  it('returns model without command in desktop mode', () => {
    const result = resolveMemberForExecution('fast', DESKTOP);
    assert.equal(result.model, 'composer-2.5-fast');
    assert.equal(result.command, null);
  });

  it('returns distinct models per tier in desktop mode', () => {
    const fast = resolveMemberForExecution('fast', DESKTOP);
    const medium = resolveMemberForExecution('medium', DESKTOP);
    const pro = resolveMemberForExecution('pro', DESKTOP);
    assert.notEqual(fast.model, medium.model);
    assert.notEqual(medium.model, pro.model);
  });
});

describe('resolveMemberCommand', () => {
  it('returns agent command with model when agent CLI exists', () => {
    const result = resolveMemberCommand('fast');
    if (!result.command) {
      return;
    }
    if (result.command.startsWith('agent ')) {
      assert.match(result.command, /--model composer-2\.5-fast/);
      assert.equal(result.model, 'composer-2.5-fast');
    }
  });

  it('maps medium tier to gpt-5.5-medium via agent', () => {
    const result = resolveMemberCommand('medium');
    if (!result.command?.startsWith('agent ')) {
      return;
    }
    assert.match(result.command, /--model gpt-5\.5-medium/);
    assert.equal(result.model, 'gpt-5.5-medium');
  });

  it('maps pro tier to gemini-3.1-pro via agent', () => {
    const result = resolveMemberCommand('pro');
    if (!result.command?.startsWith('agent ')) {
      return;
    }
    assert.match(result.command, /--model gemini-3\.1-pro/);
    assert.equal(result.model, 'gemini-3.1-pro');
  });
});
