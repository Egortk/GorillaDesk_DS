// Builds CSS variables and a Tailwind v4 theme from tokens/** with Style Dictionary v5.
// Usage: node scripts/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'pipeline.config.json'), 'utf8'));
const DIST = path.join(ROOT, 'dist');

// ---- preprocessor: resolve DTCG 2025.10 object values into strings SD transforms understand ----
const getPath = (tree, segs) => segs.reduce((n, s) => (n == null ? n : n[s]), tree);
function resolveAlias(tree, v, depth = 0) {
  if (depth > 20) throw new Error('Alias loop: ' + v);
  if (typeof v === 'string' && /^\{[^}]+\}$/.test(v)) {
    const t = getPath(tree, v.slice(1, -1).split('.'));
    if (!t || !('$value' in t)) throw new Error('Broken alias ' + v);
    return resolveAlias(tree, t.$value, depth + 1);
  }
  return v;
}
function resolvePointer(tree, p) {
  const segs = p.replace(/^#\//, '').split('/');
  const vi = segs.indexOf('$value');
  const tok = getPath(tree, segs.slice(0, vi));
  if (!tok) throw new Error('Broken $ref ' + p);
  let v = resolveAlias(tree, tok.$value);
  for (const s of segs.slice(vi + 1)) {
    v = resolveAlias(tree, v);
    if (typeof v === 'string' && v.startsWith('#')) v = hexToObj(v); // target already normalized earlier in this pass
    v = v[s];
  }
  return resolveAlias(tree, v);
}
const hexToObj = (h) => { const s = h.slice(1); return { components: [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255), alpha: s.length === 8 ? parseInt(s.slice(6), 16) / 255 : 1 }; };
const hex2 = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
function colorToString(tree, v) {
  const comps = v.components.$ref ? resolvePointer(tree, v.components.$ref) : v.components;
  let alpha = v.alpha == null ? 1 : v.alpha.$ref ? resolvePointer(tree, v.alpha.$ref) : resolveAlias(tree, v.alpha);
  if (typeof alpha !== 'number') throw new Error('Alpha is not a number: ' + JSON.stringify(v));
  return '#' + comps.map(hex2).join('') + (alpha < 1 ? hex2(alpha) : '');
}
function normalize(tree, node = tree) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$') || typeof v !== 'object' || v === null) continue;
    if ('$value' in v) {
      const val = v.$value;
      if (v.$type === 'color' && typeof val === 'object') v.$value = colorToString(tree, val);
      else if ((v.$type === 'dimension' || v.$type === 'duration') && typeof val === 'object') v.$value = val.value + val.unit;
      else if (v.$type === 'shadow') v.$value = val.map((l) => Object.fromEntries(Object.entries(l).map(([lk, lv]) => [lk, lv && typeof lv === 'object' && 'unit' in lv ? lv.value + lv.unit : lv && typeof lv === 'object' && 'colorSpace' in lv ? colorToString(tree, lv) : lv])));
    } else normalize(tree, v);
  }
  return tree;
}
StyleDictionary.registerPreprocessor({ name: 'gd/dtcg-2025', preprocessor: (dict) => normalize(dict) });

// ---- transforms ----
StyleDictionary.registerTransform({ name: 'gd/name', type: 'name', transform: (t) => t.path.join('-') });
StyleDictionary.registerTransform({
  name: 'gd/px-to-rem', type: 'value', transitive: true,
  // primitives stay in px so each semantic token decides its own unit after alias resolution
  filter: (t) => t.$type === 'dimension' && !t.filePath.includes('primitives'),
  transform: (t) => {
    const v = String(t.$value); const m = v.match(/^(-?[\d.]+)px$/);
    if (!m) return v;
    const n = Number(m[1]);
    const keepPx = cfg.pxKeep.some((p) => t.path.join('.').startsWith(p)) && !(cfg.pxKeepExcept ?? []).some((p) => t.path.join('.').startsWith(p));
    if (keepPx || n === 0 || n >= 9999) return n === 0 ? '0' : n >= 9999 ? '9999px' : v;
    return +(n / 16).toFixed(4) + 'rem';
  },
});
StyleDictionary.registerTransform({ name: 'gd/opacity', type: 'value', filter: (t) => t.$type === 'number' && t.path[0] === 'alpha', transform: (t) => t.$value });

async function buildTheme(theme) {
  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'default', warnings: 'error' },
    source: ['tokens/primitives.json', 'tokens/semantic/size.json', 'tokens/semantic/font.json', 'tokens/semantic/motion.json', 'tokens/semantic/layer.json', `tokens/semantic/color.${theme}.json`, 'tokens/components/*.json', 'tokens/styles/shadow.json'],
    preprocessors: ['gd/dtcg-2025'],
    platforms: { css: { transforms: ['gd/name', 'gd/px-to-rem'] } },
  });
  await sd.hasInitialized;
  const { allTokens } = await sd.getPlatformTokens('css');
  return allTokens;
}

const isHidden = (t) => t.filePath.includes('primitives') || t.path[0] === 'alpha';
const nameOf = (pathStr, byPath) => byPath.get(pathStr)?.name;

function cssValue(t, byPath) {
  const o = t.original.$value;
  const asRef = (v) => {
    if (typeof v === 'string' && /^\{[^}]+\}$/.test(v)) {
      const target = byPath.get(v.slice(1, -1));
      if (target && !isHidden(target)) return `var(--${target.name})`;
    }
    return null;
  };
  if (t.$type === 'shadow') {
    return o.map((layer, i) => {
      const r = t.$value[i];
      const sp = asRef(layer.spread) ?? r.spread;
      const col = asRef(layer.color) ?? r.color;
      const len = (x) => (x === '0px' ? '0' : x);
      return [r.inset ? 'inset' : '', len(r.offsetX), len(r.offsetY), len(r.blur), len(sp), col].filter(Boolean).join(' ');
    }).join(', ');
  }
  const r = asRef(o);
  if (r) return r;
  if (t.$type === 'fontFamily') return [].concat(t.$value).map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');
  if (t.$type === 'cubicBezier') return `cubic-bezier(${t.$value.join(', ')})`;
  return String(t.$value);
}

const light = await buildTheme('light');
const dark = await buildTheme('dark');
const index = (list) => new Map(list.map((t) => [t.path.join('.'), t]));
const L = index(light), D = index(dark);

const emitted = light.filter((t) => !isHidden(t));
const out = emitted.map((t) => ({ name: t.name, path: t.path.join('.'), type: t.$type, light: cssValue(t, L), dark: cssValue(D.get(t.path.join('.')), D), description: t.$description || '' }));

// Tokens that must be redeclared under the dark selector: own value differs, or they reference a themed var.
// (A var defined on :root is resolved there; a subtree with data-theme="dark" would otherwise inherit light values.)
const themed = new Set(out.filter((t) => t.light !== t.dark).map((t) => t.name));
let grew = true;
while (grew) {
  grew = false;
  for (const t of out) if (!themed.has(t.name) && [...t.light.matchAll(/var\(--([\w-]+)\)/g)].some((m) => themed.has(m[1]))) { themed.add(t.name); grew = true; }
}

// collisions after flattening
const seen = new Map();
for (const t of out) { if (seen.has(t.name)) throw new Error(`CSS name collision: --${t.name} (${seen.get(t.name)} / ${t.path})`); seen.set(t.name, t.path); }

const header = `/* Generated from Figma "Tokens" library by scripts/build.mjs. Do not edit by hand. */\n`;
const decl = (list, key, indent = '  ') => list.map((t) => `${indent}--${t.name}: ${t[key]};`).join('\n');
const inTheme = (t) => cfg.tailwindTheme.some((ns) => t.name.startsWith(ns + '-'));
const themedList = out.filter((t) => themed.has(t.name));

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// 1) Framework-agnostic CSS variables
fs.writeFileSync(path.join(DIST, 'tokens.css'),
  header + `${cfg.themes.light}, ${cfg.themes.lightScope} {\n  color-scheme: light;\n${decl(out, 'light')}\n}\n\n${cfg.themes.dark} {\n  color-scheme: dark;\n${decl(themedList, 'dark')}\n}\n`);

// 2) Tailwind v4 theme
const themeTokens = out.filter(inTheme);
const rootTokens = out.filter((t) => !inTheme(t));
const resets = cfg.tailwindResets.map((ns) => `  --${ns}-*: initial;`).join('\n');
fs.writeFileSync(path.join(DIST, 'tailwind.css'),
  header +
  `/* Usage: @import "tailwindcss"; @import "./tailwind.css";  Dark: set data-theme="dark" on any element. */\n` +
  `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));\n\n` +
  `@theme static {\n${resets}\n\n${decl(themeTokens, 'light')}\n}\n\n` +
  `/* Outside the Tailwind theme on purpose: use as p-(--space-md), border-(length:--border-width-md), duration-(--duration-fast), z-(--z-index-modal). */\n` +
  `:root {\n${decl(rootTokens, 'light')}\n}\n\n` +
  `${cfg.themes.dark} {\n  color-scheme: dark;\n${decl(themedList, 'dark')}\n}\n\n` +
  `/* Lets a light subtree sit inside a dark page. */\n${cfg.themes.lightScope} {\n  color-scheme: light;\n${decl(themedList, 'light')}\n}\n`);

// 3) Flat JSON for docs, the component manifest and prototyping
fs.writeFileSync(path.join(DIST, 'tokens.flat.json'), JSON.stringify(Object.fromEntries(out.map((t) => [t.name, { type: t.type, light: t.light, dark: t.dark, ...(t.description ? { description: t.description } : {}) }])), null, 2) + '\n');

// 4) Text style -> Tailwind classes map (Figma style name -> classes)
const typo = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens/styles/typography.json'), 'utf8')).typography;
const styles = {};
const walk = (n, p = []) => { for (const [k, v] of Object.entries(n)) { if (k.startsWith('$')) continue; if ('$value' in v) { const name = [...p, k].join('/'); const size = v.$value.fontSize.slice(1, -1).split('.').slice(1).join('-'); const w = v.$value.fontWeight.slice(1, -1); styles[name] = ['font-ui', 'text-' + size, w.startsWith('font-weight.') ? 'font-' + w.split('.')[1] : null].filter(Boolean).join(' '); } else walk(v, [...p, k]); } };
walk(typo);
fs.writeFileSync(path.join(DIST, 'text-styles.json'), JSON.stringify(styles, null, 2) + '\n');

console.log(`emitted ${out.length} vars (${themeTokens.length} in @theme, ${rootTokens.length} in :root), ${themedList.length} redeclared for dark`);
