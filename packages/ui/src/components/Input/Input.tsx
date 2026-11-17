import type { ReactNode } from 'react';
import { Group, Input as RACInput, TextField, type TextFieldProps } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { FIELD_FOCUS_RING, FIELD_FRAME, FIELD_ICON, FIELD_INPUT, FIELD_ROOT, FIELD_TEXT, fieldShape, type FieldMode } from '../../lib/input';
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
  const mode: FieldMode = isDisabled ? 'disabled' : isReadOnly ? 'readonly' : isInvalid ? 'invalid' : 'normal';
  const invalid = Boolean(isInvalid);
  return (
    <TextField {...props} className={cx('flex w-full', className)}>
      <Group
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        className={cx(FIELD_ROOT, FIELD_FRAME[mode], FIELD_FOCUS_RING[mode], fieldShape(variant, mode))}
      >
        {startAddon && <Addon position="start" variant={variant} invalid={invalid}>{startAddon}</Addon>}
        <span className="flex min-w-0 flex-1 items-center px-(--space-input-padding-x)">
          {icon && <span aria-hidden className={cx(ICON_SLOT, FIELD_ICON[mode])}>{icon}</span>}
          <RACInput
            placeholder={placeholder}
            className={cx(FIELD_INPUT, FIELD_TEXT[mode])}
          />
        </span>
        {endAddon && <Addon position="end" variant={variant} invalid={invalid}>{endAddon}</Addon>}
      </Group>
    </TextField>
  );
}
