const fs = require('fs');
const path = require('path');

const PROMPT_SEPARATOR = '\n\n---\n\n';

/**
 * Читает persona-файл относительно корня скилла.
 *
 * @param personaFile — путь из config (относительный или абсолютный)
 * @param skillDir — корень скилла frontend-council
 * @returns содержимое persona
 */
function readPersonaFile(personaFile, skillDir) {
  const resolved = path.isAbsolute(personaFile)
    ? personaFile
    : path.join(skillDir, personaFile);
  if (!fs.existsSync(resolved)) {
    throw new Error(`persona file not found: ${resolved}`);
  }
  return fs.readFileSync(resolved, 'utf8').trim();
}

/**
 * Собирает финальный prompt для member: persona + вопрос совета.
 *
 * @param personaContent — текст persona (включая формат ответа)
 * @param userQuestion — вопрос пользователя
 * @returns prompt для CLI
 */
function buildMemberPrompt({ personaContent, userQuestion }) {
  const persona = String(personaContent || '').trim();
  const question = String(userQuestion || '').trim();
  return [
    persona,
    `${PROMPT_SEPARATOR}Вопрос совета:\n${question}`,
  ].join(PROMPT_SEPARATOR);
}

module.exports = {
  readPersonaFile,
  buildMemberPrompt,
  PROMPT_SEPARATOR,
};
