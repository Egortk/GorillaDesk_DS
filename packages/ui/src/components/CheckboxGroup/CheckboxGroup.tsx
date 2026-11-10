import type { ReactNode } from 'react';
import { CheckboxGroup as RACCheckboxGroup, FieldError, type CheckboxGroupProps as RACCheckboxGroupProps } from 'react-aria-components';
import { cx } from '../../lib/cx';

export interface CheckboxGroupProps extends Omit<RACCheckboxGroupProps, 'children' | 'className' | 'style'> {
  /** Two or more Checkbox elements, each with a `value` (Figma slot `group`). */
  children: ReactNode;
  /** One error for the whole group, shown under it while isInvalid. Leave errorMessage off the items. */
  errorMessage?: ReactNode;
  className?: string;
}

/**
 * A vertical list of related Checkboxes; the user can pick several. There is no visible group label:
 * name the group with aria-label, or aria-labelledby pointing at the field label above it.
 * isDisabled, isReadOnly and isInvalid apply to every Checkbox inside.
 */
export function CheckboxGroup({ children, errorMessage, className, ...props }: CheckboxGroupProps) {
  return (
    <RACCheckboxGroup {...props} className={cx('flex flex-col items-start gap-(--space-md)', className)}>
      {children}
      {errorMessage != null && <FieldError className="font-ui text-body-sm font-normal text-field-helper-invalid">{errorMessage}</FieldError>}
    </RACCheckboxGroup>
  );
}
