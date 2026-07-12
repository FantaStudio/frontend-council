const fs = require('fs');
const path = require('path');

const PROMPT_SEPARATOR = '\n\n---\n\n';

/**
 * Reads a persona file relative to the skill root.
 *
 * @param personaFile — path from config (relative or absolute)
 * @param skillDir — frontend-council skill root
 * @returns persona contents
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
 * Assembles the final member prompt: persona + council question.
 *
 * @param personaContent — persona text (including response format)
 * @param userQuestion — user's question (any language)
 * @returns prompt for CLI / Task
 */
function buildMemberPrompt({ personaContent, userQuestion }) {
  const persona = String(personaContent || '').trim();
  const question = String(userQuestion || '').trim();
  return `${persona}${PROMPT_SEPARATOR}Council question:\n${question}`;
}

module.exports = {
  readPersonaFile,
  buildMemberPrompt,
  PROMPT_SEPARATOR,
};
