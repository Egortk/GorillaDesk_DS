import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { rest, type Emphasis, type Intent } from '../../lib/palette';
import { BORDER } from '../../lib/styles';

export type BadgeVariant = 'count' | 'dot';

export interface BadgeProps {
  /** count shows `children`; dot is a 6 px indicator without text. */
  variant?: BadgeVariant;
  intent?: Intent;
  emphasis?: Emphasis;
  /** The count. Not rendered when variant="dot". */
  children?: ReactNode;
  /** Accessible name. Needed for variant="dot", which has no text. */
  'aria-label'?: string;
  className?: string;
}

/** Solid badges (count and dot) carry shadow/interactive-default; subtle ones have no shadow. */
function palette(intent: Intent, emphasis: Emphasis) {
  return emphasis === 'solid'
    ? cx(
        'bg-environment-surface-default shadow-interactive-default',
        rest('bg-over', intent, 'solid', 'bg'),
        rest('inset-ring', intent, 'solid', 'border'),
        rest('text', intent, 'solid', 'text'),
      )
    : cx(rest('bg', intent, 'transparent', 'bg'), rest('inset-ring', intent, 'transparent', 'border'), rest('text', intent, 'transparent', 'text'));
}

/** Compact count or small status indicator. */
export function Badge({ variant = 'count', intent = 'primary', emphasis = 'solid', children, 'aria-label': ariaLabel, className }: BadgeProps) {
  if (variant === 'dot') {
    return (
      <span
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        // 6 px: no size token this small yet (see docs/known-issues.md).
        className={cx('inline-block size-1.5 shrink-0 rounded-full', BORDER, palette(intent, emphasis), className)}
      />
    );
  }
  return (
    <span
      aria-label={ariaLabel}
      className={cx(
        'inline-flex h-control-2xs shrink-0 items-center justify-center rounded-full px-(--space-xs) font-ui text-body-xs font-medium whitespace-nowrap',
        BORDER,
        palette(intent, emphasis),
        className,
      )}
    >
      {children}
    </span>
  );
}
