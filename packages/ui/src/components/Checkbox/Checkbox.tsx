import { useId, type ReactNode } from 'react';
import { Checkbox as RACCheckbox, type CheckboxProps as RACCheckboxProps, type CheckboxRenderProps } from 'react-aria-components';
import { cx } from '../../lib/cx';

export interface CheckboxProps extends Omit<RACCheckboxProps, 'children' | 'className' | 'style'> {
  /** Label (Figma hasLabel + label). Without it, pass aria-label. */
  children?: ReactNode;
  /** Muted text under the label (Figma hasDescription + description). */
  description?: ReactNode;
  /** Shown under the label while isInvalid (Figma hasError + errorMessage). Leave it out inside a CheckboxGroup that shows one error. */
  errorMessage?: ReactNode;
  className?: string;
}

/** Prop-driven part of the Figma `state`. hover / active / focused are CSS on top of it (React Aria data attributes). */
type Mode = 'normal' | 'invalid' | 'disabled' | 'read-only';
type Value = 'unchecked' | 'checked' | 'indeterminate';

const modeOf = (p: CheckboxRenderProps): Mode => (p.isDisabled ? 'disabled' : p.isReadOnly ? 'read-only' : p.isInvalid ? 'invalid' : 'normal');
const valueOf = (p: CheckboxRenderProps): Value => (p.isIndeterminate ? 'indeterminate' : p.isSelected ? 'checked' : 'unchecked');

// Figma _checkbox-indicator variants. Class names are written out in full so Tailwind can find them.
// Variant prefixes read the root (class "group"): hover applies only while not pressed and not focused, press only while
// not focused; keyboard focus wins. Shadow: interactive-default at rest, -hover on hover, none while pressed, focus ring on focus.

const SHADOW: Record<Mode, string> = {
  normal: `shadow-interactive-default group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:shadow-interactive-hover group-data-pressed:not-group-data-focus-visible:shadow-none group-data-focus-visible:shadow-interactive-focus`,
  invalid: `shadow-interactive-default group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:shadow-interactive-hover group-data-pressed:not-group-data-focus-visible:shadow-interactive-hover group-data-focus-visible:shadow-interactive-focus-invalid`,
  disabled: '',
  'read-only': '',
};

const BOX: Record<Mode, Record<Value, string>> = {
  normal: {
    unchecked: `bg-input-bg-default inset-ring-input-border-default group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:bg-input-bg-hover group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:inset-ring-input-border-hover group-data-pressed:not-group-data-focus-visible:bg-input-bg-hover group-data-pressed:not-group-data-focus-visible:inset-ring-input-border-hover group-data-focus-visible:bg-input-bg-focus group-data-focus-visible:inset-ring-input-border-focus`,
    checked: `bg-interactive-primary-solid-bg-default inset-ring-interactive-primary-solid-border-default group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:bg-interactive-primary-solid-bg-hover group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:inset-ring-interactive-primary-solid-border-hover group-data-pressed:not-group-data-focus-visible:bg-interactive-primary-solid-bg-active group-data-pressed:not-group-data-focus-visible:inset-ring-interactive-primary-solid-border-active`,
    indeterminate: '',
  },
  invalid: {
    unchecked: `bg-input-bg-invalid inset-ring-input-border-invalid group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:bg-input-bg-invalid-hover group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:inset-ring-input-border-invalid-hover group-data-pressed:not-group-data-focus-visible:bg-input-bg-invalid-hover group-data-pressed:not-group-data-focus-visible:inset-ring-input-border-invalid-hover group-data-focus-visible:bg-input-bg-invalid-focus group-data-focus-visible:inset-ring-input-border-invalid-focus`,
    checked: `bg-interactive-danger-solid-bg-default inset-ring-interactive-danger-solid-border-default group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:bg-interactive-danger-solid-bg-hover group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:inset-ring-interactive-danger-solid-border-hover group-data-pressed:not-group-data-focus-visible:bg-interactive-danger-solid-bg-hover group-data-pressed:not-group-data-focus-visible:inset-ring-interactive-danger-solid-border-hover`,
    indeterminate: '',
  },
  disabled: {
    unchecked: 'bg-input-bg-disabled inset-ring-input-border-disabled',
    checked: 'bg-interactive-primary-solid-bg-disabled inset-ring-interactive-primary-solid-border-disabled',
    indeterminate: '',
  },
  'read-only': {
    unchecked: 'bg-input-bg-default inset-ring-input-border-default',
    checked: 'bg-interactive-primary-solid-bg-default inset-ring-interactive-primary-solid-border-default',
    indeterminate: '',
  },
};

/** Glyph colour. Unchecked shows a faint check only as a hover / press preview (not while invalid). */
const GLYPH: Record<Mode, Record<Value, string>> = {
  normal: {
    unchecked: `invisible group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:visible group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:text-interactive-neutral-subtle-icon-hover group-data-pressed:not-group-data-focus-visible:visible group-data-pressed:not-group-data-focus-visible:text-interactive-neutral-subtle-icon-active`,
    checked: `text-interactive-primary-solid-icon-default group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:text-interactive-primary-solid-icon-hover group-data-pressed:not-group-data-focus-visible:text-interactive-primary-solid-icon-active`,
    indeterminate: '',
  },
  invalid: {
    unchecked: 'invisible',
    checked: `text-interactive-danger-solid-icon-default group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:text-interactive-danger-solid-icon-hover group-data-pressed:not-group-data-focus-visible:text-interactive-danger-solid-icon-hover`,
    indeterminate: '',
  },
  disabled: { unchecked: 'invisible', checked: 'text-interactive-primary-solid-icon-disabled', indeterminate: '' },
  'read-only': { unchecked: 'invisible', checked: 'text-interactive-primary-solid-icon-default', indeterminate: '' },
};

// indeterminate looks like checked with a dash.
for (const m of Object.keys(BOX) as Mode[]) {
  BOX[m].indeterminate = BOX[m].checked;
  GLYPH[m].indeterminate = GLYPH[m].checked;
}

const LABEL: Record<Mode, string> = {
  normal: `text-interactive-neutral-transparent-text-default group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:text-interactive-neutral-transparent-text-hover group-data-pressed:not-group-data-focus-visible:text-interactive-neutral-transparent-text-active`,
  invalid: 'text-interactive-neutral-transparent-text-default',
  disabled: 'text-interactive-neutral-transparent-text-disabled',
  'read-only': 'text-interactive-neutral-transparent-text-default',
};

// _checkbox-icon glyphs, exported from Figma (16 × 16).
const CHECK =
  'M11.5402 5.54019C11.794 5.28635 12.2063 5.28635 12.4601 5.54019C12.7138 5.79404 12.7139 6.20633 12.4601 6.46011L7.46011 11.4601C7.20633 11.7139 6.79404 11.7138 6.54019 11.4601L3.54019 8.46011C3.28635 8.20627 3.28635 7.79403 3.54019 7.54019C3.79403 7.28635 4.20627 7.28635 4.46011 7.54019L7.00015 10.0802L11.5402 5.54019Z';
const DASH = 'M11 7C11.5523 7 12 7.44772 12 8C12 8.55228 11.5523 9 11 9H5C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7H11Z';

/**
 * Internal (Figma `_checkbox-indicator`): the 16 px box. Visual only; also for ListBox items in multiple selection.
 * Put it inside an element with class "group" that carries the React Aria data attributes.
 * The click area is extended to 24 px with a pseudo-element, without changing layout.
 */
export function CheckboxIndicator({ value, mode }: { value: Value; mode: Mode }) {
  return (
    <span
      aria-hidden
      className={cx(
        'relative flex size-control-2xs shrink-0 items-center justify-center rounded-md inset-ring-(length:--border-width-md)',
        'before:absolute before:-inset-(--space-xs)',
        BOX[mode][value],
        SHADOW[mode],
      )}
    >
      <svg viewBox="0 0 16 16" fill="currentColor" className={cx('size-icon-xs', GLYPH[mode][value])}>
        <path d={value === 'indeterminate' ? DASH : CHECK} />
      </svg>
    </span>
  );
}

const TEXT = 'font-ui text-body-sm font-normal';

/** Turns one option on or off, or shows that a group is partly selected. */
export function Checkbox({ children, description, errorMessage, className, ...props }: CheckboxProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  return (
    <RACCheckbox
      {...props}
      aria-describedby={cx(props['aria-describedby'], descriptionId, props.isInvalid ? errorId : undefined) || undefined}
      className={cx('group inline-flex items-start gap-(--space-md) outline-none', 'cursor-pointer data-disabled:cursor-default data-readonly:cursor-default', className)}
    >
      {(rp) => {
        const mode = modeOf(rp);
        const disabled = mode === 'disabled';
        const hasContent = children != null || description != null || (rp.isInvalid && errorMessage != null);
        return (
          <>
            <CheckboxIndicator value={valueOf(rp)} mode={mode} />
            {hasContent && (
              <span className="flex min-w-0 flex-col gap-(--space-2xs)">
                {children != null && <span className={cx('font-ui text-label-md', LABEL[mode])}>{children}</span>}
                {/* Read through aria-describedby, kept out of the accessible name. */}
                {description != null && (
                  <span id={descriptionId} aria-hidden className={cx(TEXT, disabled ? 'text-interactive-neutral-transparent-text-disabled' : 'text-content-neutral-text-muted')}>
                    {description}
                  </span>
                )}
                {rp.isInvalid && errorMessage != null && (
                  <span id={errorId} aria-hidden className={cx(TEXT, 'text-field-helper-invalid')}>
                    {errorMessage}
                  </span>
                )}
              </span>
            )}
          </>
        );
      }}
    </RACCheckbox>
  );
}
