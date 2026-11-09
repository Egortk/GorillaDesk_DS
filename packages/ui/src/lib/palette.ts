// Classes for color/interactive/{intent}/{tone}/{property}/{state}.
// The combinations are listed for Tailwind in src/styles.css (@source inline). Keep both in sync.

export type Intent = 'primary' | 'secondary' | 'subsidiary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
export const INTENTS: Intent[] = ['primary', 'secondary', 'subsidiary', 'accent', 'success', 'warning', 'danger', 'neutral'];

/** Figma emphasis → token tone. `subtle` components use the `transparent` interactive tokens. */
export type Emphasis = 'solid' | 'subtle';
export type Tone = 'solid' | 'transparent';
export const toneOf = (emphasis: Emphasis): Tone => (emphasis === 'solid' ? 'solid' : 'transparent');

type Property = 'bg' | 'border' | 'text' | 'icon';
type Utility = 'bg' | 'bg-over' | 'inset-ring' | 'text';

const token = (i: Intent, t: Tone, p: Property, state: string) => `interactive-${i}-${t}-${p}-${state}`;

/** Only the default state. */
export function rest(util: Utility, i: Intent, t: Tone, p: Property): string {
  return `${util}-${token(i, t, p, 'default')}`;
}

/**
 * Default plus hover / pressed / disabled, driven by React Aria data attributes.
 * `self`: attributes on the same element (data-hovered). `group`: on an ancestor with class "group".
 */
export function stateful(util: Utility, i: Intent, t: Tone, p: Property, on: 'self' | 'group' = 'self'): string {
  const v = on === 'self' ? 'data' : 'group-data';
  return [
    `${util}-${token(i, t, p, 'default')}`,
    `${v}-hovered:${util}-${token(i, t, p, 'hover')}`,
    `${v}-pressed:${util}-${token(i, t, p, 'active')}`,
    `${v}-disabled:${util}-${token(i, t, p, 'disabled')}`,
  ].join(' ');
}
