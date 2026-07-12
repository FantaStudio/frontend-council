const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  resolveExecutionMode,
  DESKTOP,
  CLI,
} = require('../lib/execution-mode.js');

describe('resolveExecutionMode', () => {
  const config = { council: { settings: { execution: DESKTOP } } };

  it('defaults to desktop from config', () => {
    assert.equal(resolveExecutionMode(config, {}), DESKTOP);
  });

  it('honors --cli flag', () => {
    assert.equal(resolveExecutionMode(config, { cli: true }), CLI);
  });

  it('honors --desktop flag over cli setting', () => {
    const cliConfig = { council: { settings: { execution: CLI } } };
    assert.equal(resolveExecutionMode(cliConfig, { desktop: true }), DESKTOP);
  });

  it('reads execution from settings', () => {
    const cliConfig = { council: { settings: { execution: CLI } } };
    assert.equal(resolveExecutionMode(cliConfig, {}), CLI);
  });
});
