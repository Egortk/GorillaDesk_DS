import type { ReactNode } from 'react';
import { Button as RACButton, type ButtonProps as RACButtonProps } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { ICON_SLOT } from '../../lib/styles';
import { BUTTON_BASE, buttonLook, SPINNER_SIZE, useButtonFrame, type ButtonSize, type ButtonVariant } from '../Button/buttonStyles';
import { SpinnerArc } from '../Spinner/Spinner';

export interface IconButtonProps extends Omit<RACButtonProps, 'children' | 'className' | 'style'> {
  /** 24 px icon, coloured with currentColor. */
  icon: ReactNode;
  variant?: ButtonVariant;
  /** md = 32 × 32 px, sm = 24 × 24 px. */
  size?: ButtonSize;
  /** Required: the button has no visible text. */
  'aria-label': string;
  className?: string;
}

const SIZE: Record<ButtonSize, string> = {
  md: 'size-control-md justify-center',
  sm: 'size-control-sm justify-center',
};

/** Triggers an action using an icon without a visible label. */
export function IconButton({ icon, variant = 'default', size = 'md', isPending, className, ...props }: IconButtonProps) {
  const look = buttonLook(variant);
  const frame = useButtonFrame(look);
  return (
    <RACButton {...props} isPending={isPending} className={cx(BUTTON_BASE, SIZE[size], look.root, frame, className)}>
      <span aria-hidden className={cx(ICON_SLOT, look.icon, 'group-data-pending:opacity-0')}>
        {icon}
      </span>
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
          <SpinnerArc size={SPINNER_SIZE[size]} className={look.spinner} />
        </span>
      )}
    </RACButton>
  );
}
