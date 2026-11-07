// Token data for the Storybook "Tokens" pages. Read from the generated package output,
// so the pages follow every token sync without edits here.
import flat from '@gorilladesk/tokens/tokens.flat.json';
import textStylesJson from '@gorilladesk/tokens/text-styles.json';

export type Mode = 'light' | 'dark';

export interface Token {
  name: string;
  type: string;
  light: string;
  dark: string;
  description?: string;
}

const table = flat as Record<string, Omit<Token, 'name'>>;

export const tokens: Token[] = Object.entries(table).map(([name, t]) => ({ name, ...t }));

export const textStyles = textStylesJson as Record<string, string>;

export const byPrefix = (prefix: string) => tokens.filter((t) => t.name.startsWith(prefix));

export const get = (name: string) => tokens.find((t) => t.name === name);

/** Follows var(--x) references until a raw value. */
export function resolve(name: string, mode: Mode): string {
  let value = table[name]?.[mode];
  for (let i = 0; i < 10 && value?.startsWith('var(--'); i++) {
    value = table[value.slice(6, -1)]?.[mode];
  }
  return value ?? '';
}

/** "0.5rem" → "8px"; other units unchanged. */
export function toPx(value: string): string {
  return value.endsWith('rem') ? `${parseFloat(value) * 16}px` : value;
}

/** Order used for the last name segment (state or level). */
const ORDER = ['strong', 'default', 'hover', 'active', 'selected', 'focus', 'disabled', 'muted', 'faint'];
export const rank = (s: string) => {
  const i = ORDER.indexOf(s);
  return i === -1 ? ORDER.length : i;
};
