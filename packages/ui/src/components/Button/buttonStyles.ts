// Shared look of Button and IconButton (same variants, colours and states in Figma).
import { cx } from '../../lib/cx';
import { rest, stateful, type Intent, type Tone } from '../../lib/palette';
import { BORDER, SHADOW_FOCUS, SHADOW_INTERACTIVE } from '../../lib/styles';

export type ButtonVariant =
  | 'default'
  | 'default-subtle'
  | 'primary'
  | 'primary-subtle'
  | 'secondary'
  | 'secondary-subtle'
  | 'subsidiary-subtle'
  | 'accent'
  | 'success'
  | 'danger'
  | 'danger-subtle';

export type ButtonSize = 'md' | 'sm';

/** In Figma order. */
export const BUTTON_VARIANTS: ButtonVariant[] = [
  'default',
  'default-subtle',
  'primary',
  'primary-subtle',
  'secondary',
  'secondary-subtle',
  'subsidiary-subtle',
  'accent',
  'success',
  'danger',
  'danger-subtle',
];

/** Figma `state` values of Button and IconButton (for stories). */
export const BUTTON_STATES = ['default', 'hover', 'active', 'focused', 'disabled', 'loading'] as const;

interface Look {
  /** Root: background, border, text colour, shadow. */
  root: string;
  /** Icon slots (colour follows the root state through `group`). */
  icon: string;
  /** Spinner while pending. */
  spinner: string;
}

/** Intent variants: color/interactive/{intent}/{tone}/*. `framed` = border + resting shadow. */
const INTENT: Partial<Record<ButtonVariant, { intent: Intent; tone: Tone; framed: boolean }>> = {
  primary: { intent: 'primary', tone: 'solid', framed: true },
  'primary-subtle': { intent: 'primary', tone: 'transparent', framed: true },
  secondary: { intent: 'secondary', tone: 'solid', framed: true },
  'secondary-subtle': { intent: 'secondary', tone: 'transparent', framed: true },
  'subsidiary-subtle': { intent: 'subsidiary', tone: 'transparent', framed: false },
  accent: { intent: 'accent', tone: 'solid', framed: true },
  success: { intent: 'success', tone: 'solid', framed: true },
  danger: { intent: 'danger', tone: 'solid', framed: true },
  'danger-subtle': { intent: 'danger', tone: 'transparent', framed: false },
};

// default / default-subtle use the component tokens color/button/default/solid/*.
const DEFAULT_TEXT =
  'text-button-default-solid-text-default data-hovered:text-button-default-solid-text-hover data-pressed:text-button-default-solid-text-active data-disabled:text-button-default-solid-text-disabled';
const DEFAULT_ICON =
  'text-button-default-solid-icon-default group-data-hovered:text-button-default-solid-icon-hover group-data-pressed:text-button-default-solid-icon-active group-data-disabled:text-button-default-solid-icon-disabled';

const DEFAULT: Look = {
  root: cx(
    'bg-button-default-solid-bg-default data-hovered:bg-button-default-solid-bg-hover data-pressed:bg-button-default-solid-bg-active data-disabled:bg-button-default-solid-bg-disabled data-pending:bg-button-default-solid-bg-default',
    BORDER,
    'inset-ring-button-default-solid-border-default data-hovered:inset-ring-button-default-solid-border-hover data-pressed:inset-ring-button-default-solid-border-active data-disabled:inset-ring-button-default-solid-border-disabled data-pending:inset-ring-button-default-solid-border-default',
    DEFAULT_TEXT,
    SHADOW_INTERACTIVE,
  ),
  icon: DEFAULT_ICON,
  spinner: 'text-button-default-solid-icon-default',
};

/** No fill or border at rest; hover, press, focus and pending look like `default`. */
const DEFAULT_SUBTLE: Look = {
  root: cx(
    'bg-transparent data-focus-visible:bg-button-default-solid-bg-default data-hovered:bg-button-default-solid-bg-hover data-pending:bg-button-default-solid-bg-default data-pressed:bg-button-default-solid-bg-active',
    BORDER,
    'inset-ring-transparent data-focus-visible:inset-ring-button-default-solid-border-default data-hovered:inset-ring-button-default-solid-border-hover data-pending:inset-ring-button-default-solid-border-default data-pressed:inset-ring-button-default-solid-border-active',
    DEFAULT_TEXT,
    'data-hovered:not-data-focus-visible:shadow-interactive-hover data-pressed:not-data-focus-visible:shadow-none data-pending:not-data-focus-visible:shadow-none',
    SHADOW_FOCUS,
  ),
  icon: DEFAULT_ICON,
  spinner: 'text-button-default-solid-icon-default',
};

export function buttonLook(variant: ButtonVariant): Look {
  if (variant === 'default') return DEFAULT;
  if (variant === 'default-subtle') return DEFAULT_SUBTLE;
  const { intent: i, tone: t, framed } = INTENT[variant]!;
  return {
    root: cx(
      stateful('bg', i, t, 'bg'),
      `data-pending:${rest('bg', i, t, 'bg')}`,
      framed && cx(BORDER, stateful('inset-ring', i, t, 'border'), `data-pending:${rest('inset-ring', i, t, 'border')}`),
      stateful('text', i, t, 'text'),
      framed ? SHADOW_INTERACTIVE : SHADOW_FOCUS,
    ),
    icon: stateful('text', i, t, 'icon', 'group'),
    spinner: rest('text', i, t, 'icon'),
  };
}

/** Root classes shared by both buttons, before size. */
export const BUTTON_BASE = 'group relative inline-flex shrink-0 cursor-default items-center rounded-md whitespace-nowrap outline-none select-none';

/** Spinner box per button size: md → 24 px, sm → 20 px. */
export const SPINNER_SIZE = { md: 'sm', sm: 'xs' } as const;
