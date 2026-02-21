const fs = require('fs');
const path = require('path');

function toArrayJoinConst(name, text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const body = lines.map(l => JSON.stringify(l)).join(',\n  ');
  return `export const ${name} = [\n  ${body}\n].join("\\n");\n`;
}

const v1Path = path.join(process.cwd(), 'artifacts', 'BLACK_BOX_PROMPT_V1.md');
const v2Path = path.join(process.cwd(), 'artifacts', 'BLACK_BOX_PROMPT_V2.md');

if (!fs.existsSync(v1Path)) throw new Error('Missing ' + v1Path);

const v1 = fs.readFileSync(v1Path, 'utf8');
const v2 = fs.existsSync(v2Path) ? fs.readFileSync(v2Path, 'utf8') : v1;

const out = `// AUTO-GENERATED from artifacts/*.md. Do not hand-edit.
// Regenerate: node scripts/generate-prompts.cjs

${toArrayJoinConst('BLACK_BOX_PROMPT_V1', v1)}
${toArrayJoinConst('BLACK_BOX_PROMPT_V2', v2)}
`;

const outPath = path.join(process.cwd(), 'src', 'lib', 'prompts.ts');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, 'utf8');

console.log('Wrote', outPath);
if (!fs.existsSync(v2Path)) console.warn('[prompts] V2 missing; BLACK_BOX_PROMPT_V2 falls back to V1');
