// Converts the compact Figma export (raw/*.txt) into W3C DTCG 2025.10 token files (tokens/**).
// Usage: node scripts/figma-to-dtcg.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'pipeline.config.json'), 'utf8'));

// ---------- parse ----------
const tokens = []; // {file, name, kind, values:[light,dark?], description}
const effects = []; const textStyles = [];
const FILE = { P: 'primitives', S: 'semantic/size', F: 'semantic/font', M: 'semantic/motion', L: 'semantic/layer', CC: 'components/color', CS: 'components/size', C: 'semantic/color' };

for (const line of fs.readFileSync(path.join(ROOT, 'raw/export1.txt'), 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const [k, name, t, vals, ...rest] = line.split(';');
  if (k === 'E') { effects.push({ name, layers: t.split('|') }); continue; }
  if (k === 'T') { textStyles.push({ name, binds: t.split('|') }); continue; }
  tokens.push({ file: FILE[k], name, figmaType: t, values: vals.split('|'), description: (rest.join(';') || '').replace(/&quot\s?/g, '"').trim() });
}
for (const line of fs.readFileSync(path.join(ROOT, 'raw/semantic-color.txt'), 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const [name, vals] = line.split(';');
  tokens.push({ file: 'semantic/color', name: 'color/' + name, figmaType: 'C', values: vals.replace(/@~/g, '@color/').replace(/\^/g, '~').split('|'), description: '' });
}
// descriptions that the semantic color export grouped instead of listing per token
for (const t of tokens) {
  if (t.file !== 'semantic/color' || t.description) continue;
  if (/\/selected$/.test(t.name)) t.description = 'Selected state (tabs, toggles, segmented controls, selected rows). Starts equal to active.';
  if (t.name === 'color/focus/default') t.description = 'Focus ring color for all interactive elements.';
  if (t.name === 'color/focus/invalid') t.description = 'Focus ring for fields in the invalid state.';
}

// ---------- types ----------
function dtcgType(name, figmaType) {
  if (figmaType === 'C') return 'color';
  if (/^(alpha|opacity)\//.test(name)) return 'number';
  if (/^font\/family\//.test(name) || /^font\/(ui|code)$/.test(name)) return 'fontFamily';
  if (/^font\/weight\//.test(name) || /^font-weight\//.test(name) || /--font-weight$/.test(name)) return 'fontWeight';
  if (/^(duration)\//.test(name)) return 'duration';
  if (/^(easing|ease)\//.test(name)) return 'cubicBezier';
  if (/^(layer|z-index)\//.test(name)) return 'number';
  return 'dimension';
}

const ref = (n) => '{' + n.replace(/^@/, '').split('/').join('.') + '}';
const ptr = (n, tail) => '#/' + n.replace(/^@/, '').split('/').join('/') + '/$value' + (tail ? '/' + tail : '');
const hexToColor = (h) => {
  const s = h.slice(1); const c = [0, 2, 4].map((i) => +(parseInt(s.slice(i, i + 2), 16) / 255).toFixed(4));
  const a = s.length === 8 ? +(parseInt(s.slice(6, 8), 16) / 255).toFixed(4) : 1;
  return { colorSpace: 'srgb', components: c, alpha: a, hex: '#' + s.slice(0, 6) };
};

function literal(type, raw, name) {
  if (type === 'color') return hexToColor(raw);
  if (type === 'number') return /^(alpha|opacity)\//.test(name) ? +(Number(raw) / 100).toFixed(4) : Number(raw);
  if (type === 'fontFamily') { const fam = JSON.parse(raw); return [fam, ...(cfg.fontFallbacks[fam] || [])]; }
  if (type === 'fontWeight') return Number(raw);
  if (type === 'duration') return { value: Number(raw), unit: 'ms' };
  if (type === 'cubicBezier') return JSON.parse(raw).replace(/cubic-bezier\(|\)/g, '').split(',').map(Number);
  return { value: Number(raw), unit: 'px' };
}

function value(type, raw, name) {
  if (raw.includes('~')) { // composite: color + separate alpha token (DTCG 2025.10 property-level $ref)
    const [c, a] = raw.split('~');
    return { colorSpace: 'srgb', components: { $ref: ptr(c, 'components') }, alpha: { $ref: ptr(a) } };
  }
  if (raw.startsWith('@')) return ref(raw);
  return literal(type, raw, name);
}

// ---------- build trees ----------
const trees = {};
function put(file, name, tok) {
  trees[file] ??= {};
  let node = trees[file]; const parts = name.split('/');
  for (const p of parts.slice(0, -1)) node = node[p] ??= {};
  if (node[parts.at(-1)]) throw new Error('Duplicate token ' + name);
  node[parts.at(-1)] = tok;
}

for (const t of tokens) {
  const type = dtcgType(t.name, t.figmaType);
  const base = { $type: type };
  if (t.description) base.$description = t.description;
  base.$extensions = { 'com.figma': { collection: t.file.replace('semantic/', 'semantic/') } };
  if (t.values.length === 2) {
    put('semantic/color.light', t.name, { ...base, $value: value(type, t.values[0], t.name) });
    put('semantic/color.dark', t.name, { ...base, $value: value(type, t.values[1], t.name) });
  } else {
    put(t.file, t.name, { ...base, $value: value(type, t.values[0], t.name) });
  }
}

// effect styles -> shadow tokens
for (const e of effects) {
  const layers = e.layers.map((l) => {
    const [kind, x, y, blur, spread, color, spreadVar] = l.split(',');
    const px = (v) => ({ value: Number(v), unit: 'px' });
    return {
      color: color.startsWith('@') ? ref(color) : hexToColor(color),
      offsetX: px(x), offsetY: px(y), blur: px(blur),
      spread: spreadVar ? ref(spreadVar) : px(spread),
      inset: kind === 'i',
    };
  });
  put('styles/shadow', e.name, { $type: 'shadow', $value: layers, $extensions: { 'com.figma': { style: 'effect', name: e.name } } });
}

// text styles -> typography tokens (for docs/other platforms; CSS/Tailwind use the text-* parts)
for (const s of textStyles) {
  const [fontFamily, fontSize, lineHeight, letterSpacing, fontWeight] = s.binds.map(ref);
  put('styles/typography', 'typography/' + s.name, { $type: 'typography', $value: { fontFamily, fontSize, lineHeight, letterSpacing, fontWeight }, $extensions: { 'com.figma': { style: 'text', name: s.name } } });
}

fs.rmSync(path.join(ROOT, 'tokens'), { recursive: true, force: true });
for (const [file, tree] of Object.entries(trees)) {
  const out = path.join(ROOT, 'tokens', file + '.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(tree, null, 2) + '\n');
}
const count = (o) => Object.entries(o).reduce((n, [k, v]) => n + (k.startsWith('$') ? 0 : ('$value' in v ? 1 : count(v))), 0);
console.log(Object.entries(trees).map(([f, t]) => `${f}: ${count(t)}`).join('\n'));
