import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { rest, toneOf, type Emphasis, type Intent } from '../../lib/palette';

export type LozengeSize = 'xs' | 'sm';

export interface LozengeProps {
  intent?: Intent;
  emphasis?: Emphasis;
  /** xs = 20 px high, sm = 24 px high. */
  size?: LozengeSize;
  children: ReactNode;
  className?: string;
}

const SIZE: Record<LozengeSize, string> = {
  xs: 'h-control-xs px-(--space-md) font-ui text-body-xs font-medium',
  sm: 'h-control-sm px-(--space-lg) font-ui text-body-sm font-normal',
};

/** Compact read-only label for object status. */
export function Lozenge({ intent = 'neutral', emphasis = 'subtle', size = 'xs', children, className }: LozengeProps) {
  const tone = toneOf(emphasis);
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-full whitespace-nowrap bg-environment-surface-default',
        rest('bg-over', intent, tone, 'bg'),
        rest('text', intent, tone, 'text'),
        SIZE[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
