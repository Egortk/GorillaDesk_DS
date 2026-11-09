import type { ReactNode } from 'react';
import { Button as RACButton, type ButtonProps as RACButtonProps } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { ICON_SLOT } from '../../lib/styles';
import { SpinnerArc } from '../Spinner/Spinner';
import { BUTTON_BASE, buttonLook, SPINNER_SIZE, type ButtonSize, type ButtonVariant } from './buttonStyles';

export type { ButtonSize, ButtonVariant };

export interface ButtonProps extends Omit<RACButtonProps, 'children' | 'className' | 'style'> {
  variant?: ButtonVariant;
  /** md = 32 px high, sm = 24 px high. */
  size?: ButtonSize;
  /** Label. */
  children?: ReactNode;
  /** Icon before the label (Figma hasStartIcon + startIcon). 24 px, coloured with currentColor. */
  startIcon?: ReactNode;
  /** Icon after the label (Figma hasEndIcon + endIcon). */
  endIcon?: ReactNode;
  className?: string;
}

const SIZE: Record<ButtonSize, { root: string; label: string }> = {
  md: { root: 'h-control-md px-(--space-button-padding-x-md)', label: 'px-(--space-button-label-inset-md) font-ui text-label-md' },
  sm: { root: 'h-control-sm px-(--space-button-padding-x-sm)', label: 'px-(--space-button-label-inset-sm) font-ui text-label-sm' },
};

/** Triggers an action on the current screen or flow. */
export function Button({ variant = 'default', size = 'md', children, startIcon, endIcon, isPending, className, ...props }: ButtonProps) {
  const look = buttonLook(variant);
  const hide = 'group-data-pending:opacity-0';
  return (
    <RACButton {...props} isPending={isPending} className={cx(BUTTON_BASE, SIZE[size].root, look.root, className)}>
      {startIcon && <span aria-hidden className={cx(ICON_SLOT, look.icon, hide)}>{startIcon}</span>}
      <span className={cx('flex items-center', SIZE[size].label, hide)}>{children}</span>
      {endIcon && <span aria-hidden className={cx(ICON_SLOT, look.icon, hide)}>{endIcon}</span>}
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <SpinnerArc size={SPINNER_SIZE[size]} className={look.spinner} />
        </span>
      )}
    </RACButton>
  );
}
