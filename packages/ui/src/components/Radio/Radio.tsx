import { useId, type ReactNode } from 'react';
import { Radio as RACRadio, type RadioProps as RACRadioProps, type RadioRenderProps } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { LABEL, SHADOW, type Mode } from '../Checkbox/Checkbox';

export interface RadioProps extends Omit<RACRadioProps, 'children' | 'className' | 'style'> {
  /** Label (Figma hasLabel + label). Without it, pass aria-label. */
  children?: ReactNode;
  /** Muted text under the label (Figma hasDescription + description). */
  description?: ReactNode;
  /** Shown under the label while the group is invalid (Figma hasError + errorMessage). Usually left out: RadioGroup shows one error. */
  errorMessage?: ReactNode;
  className?: string;
}

type Value = 'unchecked' | 'checked';

const modeOf = (p: RadioRenderProps): Mode => (p.isDisabled ? 'disabled' : p.isReadOnly ? 'read-only' : p.isInvalid ? 'invalid' : 'normal');

// Figma _radio-indicator variants. Class names are written out in full so Tailwind can find them.
// Same state order as CheckboxIndicator: hover only while not pressed and not focused, press only while not focused,
// keyboard focus wins. Checked keeps the input background; the ring and the dot take the accent colour.

const H = 'group-data-hovered:not-group-data-pressed:not-group-data-focus-visible:';
const P = 'group-data-pressed:not-group-data-focus-visible:';
const F = 'group-data-focus-visible:';

const CIRCLE: Record<Mode, Record<Value, string>> = {
  normal: {
    unchecked: `bg-input-bg-default inset-ring-input-border-default ${H}bg-input-bg-hover ${H}inset-ring-input-border-hover ${P}bg-input-bg-hover ${P}inset-ring-input-border-hover ${F}bg-input-bg-focus ${F}inset-ring-input-border-focus`,
    checked: `bg-input-bg-default inset-ring-interactive-primary-transparent-icon-default ${H}bg-input-bg-hover ${H}inset-ring-interactive-primary-transparent-icon-hover ${P}bg-input-bg-hover ${P}inset-ring-interactive-primary-transparent-icon-active ${F}bg-input-bg-focus`,
  },
  invalid: {
    unchecked: `bg-input-bg-invalid inset-ring-input-border-invalid ${H}bg-input-bg-invalid-hover ${H}inset-ring-input-border-invalid-hover ${P}bg-input-bg-invalid-hover ${P}inset-ring-input-border-invalid-hover ${F}bg-input-bg-invalid-focus ${F}inset-ring-input-border-invalid-focus`,
    checked: `bg-input-bg-invalid inset-ring-interactive-danger-transparent-icon-default ${H}bg-input-bg-invalid-hover ${H}inset-ring-interactive-danger-transparent-icon-hover ${P}bg-input-bg-invalid-hover ${P}inset-ring-interactive-danger-transparent-icon-hover ${F}bg-input-bg-invalid-focus`,
  },
  disabled: {
    unchecked: 'bg-input-bg-disabled inset-ring-input-border-disabled',
    checked: 'bg-input-bg-disabled inset-ring-interactive-primary-transparent-icon-disabled',
  },
  'read-only': {
    unchecked: 'bg-input-bg-default inset-ring-input-border-default',
    checked: 'bg-input-bg-default inset-ring-interactive-primary-transparent-icon-default',
  },
};

/** Dot colour (Figma _radio-dot). Unchecked shows a faint dot only as a hover / press preview (not while invalid). */
const DOT: Record<Mode, Record<Value, string>> = {
  normal: {
    unchecked: `invisible ${H}visible ${H}text-interactive-neutral-subtle-icon-hover ${P}visible ${P}text-interactive-neutral-subtle-icon-active`,
    checked: `text-interactive-primary-transparent-icon-default ${H}text-interactive-primary-transparent-icon-hover ${P}text-interactive-primary-transparent-icon-active`,
  },
  invalid: {
    unchecked: 'invisible',
    checked: `text-interactive-danger-transparent-icon-default ${H}text-interactive-danger-transparent-icon-hover ${P}text-interactive-danger-transparent-icon-hover`,
  },
  disabled: { unchecked: 'invisible', checked: 'text-interactive-primary-transparent-icon-disabled' },
  'read-only': { unchecked: 'invisible', checked: 'text-interactive-primary-transparent-icon-default' },
};

/**
 * Internal (Figma `_radio-indicator`): the 16 px circle with a border-width/lg ring and the 8 px dot. Visual only.
 * The click area is extended to 24 px with a pseudo-element, without changing layout.
 */
function RadioIndicator({ value, mode }: { value: Value; mode: Mode }) {
  return (
    <span
      aria-hidden
      className={cx(
        'relative flex size-control-2xs shrink-0 items-center justify-center rounded-full inset-ring-(length:--border-width-lg)',
        'before:absolute before:-inset-(--space-xs)',
        CIRCLE[mode][value],
        SHADOW[mode],
      )}
    >
      <svg viewBox="0 0 16 16" fill="currentColor" className={cx('size-icon-xs', DOT[mode][value])}>
        <circle cx="8" cy="8" r="4" />
      </svg>
    </span>
  );
}

const TEXT = 'font-ui text-body-sm font-normal';

/** One option of a RadioGroup. The group holds the selected value. */
export function Radio({ children, description, errorMessage, className, ...props }: RadioProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  return (
    <RACRadio
      {...props}
      // The error span exists only while the group is invalid; an id that is not in the DOM is ignored.
      aria-describedby={cx(props['aria-describedby'], descriptionId, errorId) || undefined}
      className={cx('group inline-flex items-start gap-(--space-md) outline-none', 'cursor-pointer data-disabled:cursor-default data-readonly:cursor-default', className)}
    >
      {(rp) => {
        const mode = modeOf(rp);
        const disabled = mode === 'disabled';
        const hasContent = children != null || description != null || (rp.isInvalid && errorMessage != null);
        return (
          <>
            <RadioIndicator value={rp.isSelected ? 'checked' : 'unchecked'} mode={mode} />
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
    </RACRadio>
  );
}

