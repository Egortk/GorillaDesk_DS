import type { ReactNode } from 'react';
import { Group, Input as RACInput, TextField, type TextFieldProps } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { ICON_SLOT } from '../../lib/styles';

export type InputVariant = 'box' | 'inline';

export interface InputProps extends Omit<TextFieldProps, 'children' | 'className' | 'style'> {
  /** box = standalone field; inline = table cell or input-group item (no radius, no resting shadow). */
  variant?: InputVariant;
  placeholder?: string;
  /** 24 px icon before the value (Figma hasIcon + icon). */
  icon?: ReactNode;
  /** Fixed text before the value, e.g. "$" (Figma hasStartAddon). */
  startAddon?: ReactNode;
  /** Fixed text after the value, e.g. "USD" (Figma hasEndAddon). */
  endAddon?: ReactNode;
  className?: string;
}

type Mode = 'normal' | 'invalid' | 'readonly' | 'disabled';

// Class names are written out in full so Tailwind can find them. Hover applies only while not focused; focus wins.

/** Background on the root, border on ::after so it is drawn above the addons (Figma stroke INSIDE, on top). */
const FRAME: Record<Mode, string> = {
  normal:
    'bg-input-bg-default after:inset-ring-input-border-default data-hovered:not-data-focus-within:bg-input-bg-hover data-hovered:not-data-focus-within:after:inset-ring-input-border-hover data-focus-within:bg-input-bg-focus data-focus-within:after:inset-ring-input-border-focus',
  invalid:
    'bg-input-bg-invalid after:inset-ring-input-border-invalid data-hovered:not-data-focus-within:bg-input-bg-invalid-hover data-hovered:not-data-focus-within:after:inset-ring-input-border-invalid-hover data-focus-within:bg-input-bg-invalid-focus data-focus-within:after:inset-ring-input-border-invalid-focus',
  readonly: 'bg-input-bg-readonly after:inset-ring-input-border-readonly',
  disabled: 'bg-input-bg-disabled after:inset-ring-input-border-disabled',
};

const FOCUS_RING: Record<Mode, string> = {
  normal: 'data-focus-within:shadow-interactive-focus',
  invalid: 'data-focus-within:shadow-interactive-focus-invalid',
  readonly: 'data-focus-within:shadow-interactive-focus',
  disabled: '',
};

const TEXT: Record<Mode, string> = {
  normal: 'text-input-text-value',
  invalid: 'text-input-text-value',
  readonly: 'text-input-text-readonly',
  disabled: 'text-input-text-disabled',
};

const ICON: Record<Mode, string> = {
  normal:
    'text-input-icon-default group-data-hovered:not-group-data-focus-within:text-input-icon-hover group-data-focus-within:text-input-icon-focus',
  invalid:
    'text-input-icon-invalid group-data-hovered:not-group-data-focus-within:text-input-icon-invalid-hover group-data-focus-within:text-input-icon-invalid-focus',
  readonly: 'text-input-icon-readonly',
  disabled: 'text-input-icon-disabled',
};

/** Internal part of Input (Figma `_addon`): fixed text with a border on the side that faces the field. */
function Addon({ position, variant, invalid, children }: { position: 'start' | 'end'; variant: InputVariant; invalid: boolean; children: ReactNode }) {
  const box =
    variant === 'box' &&
    cx(
      invalid ? 'bg-input-addon-bg-invalid' : 'bg-input-addon-bg-default',
      position === 'start'
        ? invalid
          ? 'shadow-[inset_calc(var(--border-width-md)*-1)_0_0_0_var(--color-input-addon-border-invalid)]'
          : 'shadow-[inset_calc(var(--border-width-md)*-1)_0_0_0_var(--color-input-addon-border-default)]'
        : invalid
          ? 'shadow-[inset_var(--border-width-md)_0_0_0_var(--color-input-addon-border-invalid)]'
          : 'shadow-[inset_var(--border-width-md)_0_0_0_var(--color-input-addon-border-default)]',
    );
  return (
    <span
      className={cx(
        'flex shrink-0 items-center px-(--space-md) font-ui text-body-md font-normal whitespace-nowrap',
        invalid ? 'text-input-addon-text-invalid' : 'text-input-addon-text-default',
        box,
      )}
    >
      {children}
    </span>
  );
}

/** Single-line field for entering or editing a value. */
export function Input({ variant = 'box', placeholder, icon, startAddon, endAddon, className, ...props }: InputProps) {
  const { isDisabled, isReadOnly, isInvalid } = props;
  const mode: Mode = isDisabled ? 'disabled' : isReadOnly ? 'readonly' : isInvalid ? 'invalid' : 'normal';
  const invalid = Boolean(isInvalid);
  return (
    <TextField {...props} className={cx('flex w-full', className)}>
      <Group
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        className={cx(
          'group relative flex h-control-md w-full items-stretch overflow-hidden',
          'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:inset-ring-(length:--border-width-md)',
          FRAME[mode],
          FOCUS_RING[mode],
          variant === 'box' && cx('rounded-md', mode !== 'disabled' && 'shadow-interactive-default'),
        )}
      >
        {startAddon && <Addon position="start" variant={variant} invalid={invalid}>{startAddon}</Addon>}
        <span className="flex min-w-0 flex-1 items-center px-(--space-input-padding-x)">
          {icon && <span aria-hidden className={cx(ICON_SLOT, ICON[mode])}>{icon}</span>}
          <RACInput
            placeholder={placeholder}
            className={cx(
              'h-full min-w-0 flex-1 bg-transparent px-(--space-input-label-inset) font-ui text-body-md font-normal outline-none placeholder:text-input-text-placeholder',
              TEXT[mode],
            )}
          />
        </span>
        {endAddon && <Addon position="end" variant={variant} invalid={invalid}>{endAddon}</Addon>}
      </Group>
    </TextField>
  );
}
