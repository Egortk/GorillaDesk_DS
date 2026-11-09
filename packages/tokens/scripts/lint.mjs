// Structural lint for tokens/**: grammar, completeness, layer rules, alpha mirroring, Tailwind safety.
// Usage: node scripts/lint.mjs   (exit code 1 on errors; warnings do not fail)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens', f), 'utf8'));
const flat = (tree, file, p = [], out = new Map()) => {
  for (const [k, v] of Object.entries(tree)) {
    if (k.startsWith('$')) continue;
    if ('$value' in v) out.set([...p, k].join('/'), { ...v, file }); else flat(v, file, [...p, k], out);
  }
  return out;
};
const FILES = ['primitives', 'semantic/size', 'semantic/font', 'semantic/motion', 'semantic/layer', 'components/color', 'components/size', 'styles/shadow', 'styles/typography'];
const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);

for (const theme of ['light', 'dark']) {
  const all = new Map();
  for (const f of [...FILES, `semantic/color.${theme}`]) for (const [n, t] of flat(read(f + '.json'), f)) {
    if (all.has(n)) err(`[${theme}] duplicate path ${n}`);
    all.set(n, t);
  }
  const layer = (n) => all.get(n)?.file.split('/')[0];
  const refsOf = (v, out = []) => {
    if (typeof v === 'string' && /^\{[^}]+\}$/.test(v)) out.push(v.slice(1, -1).split('.').join('/'));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) {
      if (k === '$ref') out.push(x.slice(2).split('/$value')[0]); else refsOf(x, out);
    }
    return out;
  };

  for (const [n, t] of all) {
    const L = t.file.split('/')[0];
    const refs = refsOf(t.$value);
    for (const r of refs) if (!all.has(r)) err(`[${theme}] ${n}: broken reference ${r}`);
    // layer rules
    if (L !== 'primitives' && refs.length === 0 && t.$type !== 'shadow') err(`[${theme}] ${n}: raw value outside primitives`);
    if (L === 'primitives' && refs.length) err(`${n}: primitive must not reference other tokens`);
    if (L === 'semantic') for (const r of refs) {
      const ok = layer(r) === 'primitives' || (r.startsWith('alpha/') && n.startsWith('color/')) || (n.startsWith('alpha/') && layer(r) === 'primitives');
      if (!ok) err(`[${theme}] ${n}: semantic token references ${r} (${layer(r)}); semantic may reference primitives only`);
    }
    if (L === 'components') for (const r of refs) if (layer(r) !== 'semantic' || r.startsWith('alpha/')) err(`[${theme}] ${n}: component token references ${r}; components may reference semantic tokens only`);
    if (n.startsWith('alpha/') && !refs.every((r) => r.startsWith('opacity/'))) err(`${n}: alpha must alias an opacity primitive`);
  }

  if (theme !== 'light') continue; // grammar checks are theme-independent
  const INTENTS = ['primary', 'secondary', 'subsidiary', 'accent', 'success', 'warning', 'danger', 'neutral'];
  const EMPH = ['solid', 'subtle', 'transparent'], PROP = ['bg', 'border', 'text', 'icon'], STATE = ['default', 'hover', 'active', 'selected', 'disabled'];
  const LEVEL = ['strong', 'default', 'muted', 'faint'];
  const grammar = [
    new RegExp(`^color/interactive/(${INTENTS.join('|')})/(${EMPH.join('|')})/(${PROP.join('|')})/(${STATE.join('|')})$`),
    new RegExp(`^color/content/(${[...INTENTS.filter((i) => i !== 'neutral'), 'neutral', 'inverse'].join('|')})/(${PROP.join('|')})/(${LEVEL.join('|')})$`),
    /^color\/environment\/(surface\/(canvas|sunken|default|raised|overlay|inverse)|border\/(default|muted|strong)|scrim\/(default|subtle)|shadow\/\d+)$/,
    /^color\/focus\/(default|invalid)$/,
    // Component colour tokens. Add the component here when it gets its first token.
    /^color\/(button|input|field|link|avatar)\/[a-z0-9/-]+$/,
    /^color\/[a-z]+\/(0|50|[1-9]00|950|1000)$/,
    /^alpha\/(interactive\/(base|neutral)\/(solid|subtle|transparent)\/(bg|border|text|icon)\/(default|hover|active|selected|disabled)|content\/(base|inverse)\/(bg|border|text|icon)\/(strong|default|muted|faint)|environment\/(surface|border|scrim|shadow)\/[a-z0-9]+|focus\/(default|invalid))$/,
    /^(space|spacing|radius|border-width|dimension|opacity|duration|easing|ease|layer|z-index|font|font-weight|text|shadow|inset-shadow|typography)(\/|$)/,
  ];
  for (const n of all.keys()) if (!grammar.some((g) => g.test(n))) err(`${n}: does not match the naming grammar`);

  // completeness
  for (const i of INTENTS) for (const e of EMPH) for (const p of PROP) for (const s of STATE) if (!all.has(`color/interactive/${i}/${e}/${p}/${s}`)) err(`missing color/interactive/${i}/${e}/${p}/${s}`);
  for (const i of [...INTENTS, 'inverse']) for (const p of PROP) for (const l of LEVEL) if (!all.has(`color/content/${i}/${p}/${l}`)) err(`missing color/content/${i}/${p}/${l}`);

  // alpha mirroring: color/<group>/<intent>/<rest>  <->  alpha/<group>/<base|neutral|inverse>/<rest>
  for (const theme2 of ['light', 'dark']) {
    for (const [n, t] of flat(read(`semantic/color.${theme2}.json`), 'semantic')) {
      const a = t.$value?.alpha?.$ref; if (!a) continue;
      const ap = a.slice(2).split('/$value')[0].split('/');
      const cp = n.split('/');
      const tailC = cp.slice(3).join('/'), tailA = ap.slice(3).join('/');
      const sameGroup = ap[1] === cp[1];
      const env = cp[1] === 'environment' || cp[1] === 'focus';
      if (!sameGroup || (env ? ap.slice(1).join('/') !== cp.slice(1).join('/') : tailC !== tailA)) warn(`[${theme2}] ${n}: alpha ${ap.join('/')} does not mirror the color path`);
    }
  }

  // Tailwind v4 safety: named spacing keys collide with container sizes (max-w-*) — tailwindlabs/tailwindcss#18042, #19722
  const containers = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'none'];
  for (const n of all.keys()) if (n.startsWith('spacing/')) {
    const key = n.slice(8).replace(/\//g, '-');
    if (containers.includes(key)) err(`${n}: --spacing-${key} would override max-w-${key}; use space/* for padding and gap`);
    if (!/^(control|icon)\//.test(n.slice(8))) warn(`${n}: spacing/* is reserved for element sizes (control, icon)`);
  }

  // overlap gaps must cancel exactly one border: space/overlap/X == -border-width/X
  const num = (n) => { let v = all.get(n)?.$value; while (typeof v === 'string') v = all.get(v.slice(1, -1).split('.').join('/'))?.$value; return v?.value; };
  for (const n of all.keys()) if (n.startsWith('space/overlap/')) {
    const size = n.split('/')[2];
    if (num(n) !== -num('border-width/' + size)) err(`${n} (${num(n)}) must equal minus border-width/${size} (${num('border-width/' + size)})`);
  }

  // invisible pairs: text/icon equal to bg in the same intent/emphasis/state
  for (const th of ['light', 'dark']) {
    const m = flat(read(`semantic/color.${th}.json`), 'semantic');
    for (const i of INTENTS) for (const e of EMPH) for (const s of STATE) {
      const bg = JSON.stringify(m.get(`color/interactive/${i}/${e}/bg/${s}`)?.$value);
      for (const p of ['text', 'icon']) if (bg && bg === JSON.stringify(m.get(`color/interactive/${i}/${e}/${p}/${s}`)?.$value)) warn(`[${th}] color/interactive/${i}/${e}/${p}/${s} equals its bg (invisible)`);
    }
  }
}

for (const w of warnings) console.log('warn  ' + w);
for (const e of errors) console.log('error ' + e);
console.log(`\n${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
