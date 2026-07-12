const DESKTOP = 'desktop';
const CLI = 'cli';

/**
 * Определяет режим исполнения совета: desktop (Task) или cli (headless agent).
 *
 * @param config — распарсенный council.config
 * @param options — CLI-флаги start (desktop, cli)
 * @returns {'desktop' | 'cli'}
 */
function resolveExecutionMode(config, options = {}) {
  if (options.cli) {
    return CLI;
  }
  if (options.desktop) {
    return DESKTOP;
  }

  const setting = config?.council?.settings?.execution;
  if (setting === CLI || setting === DESKTOP) {
    return setting;
  }

  return DESKTOP;
}

/**
 * Состояния member, считающиеся «ожидающими» для overallState.
 */
function isPendingMemberState(state) {
  const value = String(state || '');
  return value === 'queued' || value === 'awaiting_desktop';
}

module.exports = {
  DESKTOP,
  CLI,
  resolveExecutionMode,
  isPendingMemberState,
};
