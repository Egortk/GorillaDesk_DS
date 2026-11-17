import type { ReactNode } from 'react';
import { FieldError, RadioGroup as RACRadioGroup, type RadioGroupProps as RACRadioGroupProps } from 'react-aria-components';
import { cx } from '../../lib/cx';

export interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children' | 'className' | 'style' | 'orientation'> {
  /** Two or more Radio elements, each with a `value` (Figma slot `group`). */
  children: ReactNode;
  /** One error for the whole group, shown under it while isInvalid. Leave errorMessage off the items. */
  errorMessage?: ReactNode;
  className?: string;
}

/**
 * A vertical list of Radios; the user picks exactly one. There is no visible group label:
 * name the group with aria-label, or aria-labelledby pointing at the field label above it.
 * isDisabled, isReadOnly and isInvalid apply to every Radio inside. Arrow keys move the selection.
 */
export function RadioGroup({ children, errorMessage, className, ...props }: RadioGroupProps) {
  return (
    <RACRadioGroup {...props} orientation="vertical" className={cx('flex flex-col items-start gap-(--space-md)', className)}>
      {children}
      {errorMessage != null && <FieldError className="font-ui text-body-sm font-normal text-field-helper-invalid">{errorMessage}</FieldError>}
    </RACRadioGroup>
  );
}
