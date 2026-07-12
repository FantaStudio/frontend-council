const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { buildMemberPrompt, readPersonaFile } = require('../lib/prompt-assembly.js');

describe('prompt-assembly', () => {
  it('buildMemberPrompt joins persona and user question', () => {
    const result = buildMemberPrompt({
      personaContent: 'Ты junior на портале.',
      userQuestion: 'Нужен ли Redux?',
    });
    assert.match(result, /Ты junior на портале/);
    assert.match(result, /Вопрос совета:\nНужен ли Redux\?/);
  });

  it('readPersonaFile resolves relative path from skill dir', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-persona-'));
    const personaPath = path.join(tmpDir, 'persona.md');
    fs.writeFileSync(personaPath, 'Persona body', 'utf8');
    const content = readPersonaFile(personaPath, tmpDir);
    assert.equal(content, 'Persona body');
  });

  it('readPersonaFile throws when file missing', () => {
    assert.throws(
      () => readPersonaFile('missing.md', '/tmp'),
      /persona file not found/i,
    );
  });
});
