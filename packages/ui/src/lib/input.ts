// Shared look of text fields (Input, SearchField). The field root is a React Aria Group with the `group` class:
// it sets data-hovered, data-focus-within and data-disabled. Select's trigger is a Button and keeps its own copy
// keyed on data-focus-visible.

export type FieldMode = 'normal' | 'invalid' | 'readonly' | 'disabled';

// Class names are written out in full so Tailwind can find them. Hover applies only while not focused; focus wins.

/** Root box: size, clipping and the border layer (::after, drawn above the content like Figma stroke INSIDE). */
export const FIELD_ROOT =
  'group relative flex h-control-md w-full items-stretch overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:inset-ring-(length:--border-width-md)';

/** Background on the root, border colour on ::after. */
export const FIELD_FRAME: Record<FieldMode, string> = {
  normal:
    'bg-input-bg-default after:inset-ring-input-border-default data-hovered:not-data-focus-within:bg-input-bg-hover data-hovered:not-data-focus-within:after:inset-ring-input-border-hover data-focus-within:bg-input-bg-focus data-focus-within:after:inset-ring-input-border-focus',
  invalid:
    'bg-input-bg-invalid after:inset-ring-input-border-invalid data-hovered:not-data-focus-within:bg-input-bg-invalid-hover data-hovered:not-data-focus-within:after:inset-ring-input-border-invalid-hover data-focus-within:bg-input-bg-invalid-focus data-focus-within:after:inset-ring-input-border-invalid-focus',
  readonly: 'bg-input-bg-readonly after:inset-ring-input-border-readonly',
  disabled: 'bg-input-bg-disabled after:inset-ring-input-border-disabled',
};

export const FIELD_FOCUS_RING: Record<FieldMode, string> = {
  normal: 'data-focus-within:shadow-interactive-focus',
  invalid: 'data-focus-within:shadow-interactive-focus-invalid',
  readonly: 'data-focus-within:shadow-interactive-focus',
  disabled: '',
};

/** box: radius and resting shadow; inline: neither. */
export function fieldShape(variant: 'box' | 'inline', mode: FieldMode) {
  return variant === 'box' ? (mode === 'disabled' ? 'rounded-md' : 'rounded-md shadow-interactive-default') : '';
}

/** The <input> element: fills the row, text and placeholder colours. */
export const FIELD_INPUT =
  'h-full min-w-0 flex-1 bg-transparent px-(--space-input-label-inset) font-ui text-body-md font-normal outline-none placeholder:text-input-text-placeholder';

export const FIELD_TEXT: Record<FieldMode, string> = {
  normal: 'text-input-text-value',
  invalid: 'text-input-text-value',
  readonly: 'text-input-text-readonly',
  disabled: 'text-input-text-disabled',
};

export const FIELD_ICON: Record<FieldMode, string> = {
  normal:
    'text-input-icon-default group-data-hovered:not-group-data-focus-within:text-input-icon-hover group-data-focus-within:text-input-icon-focus',
  invalid:
    'text-input-icon-invalid group-data-hovered:not-group-data-focus-within:text-input-icon-invalid-hover group-data-focus-within:text-input-icon-invalid-focus',
  readonly: 'text-input-icon-readonly',
  disabled: 'text-input-icon-disabled',
};
