import { ProgressBar } from 'react-aria-components';
import { cx } from '../../lib/cx';

export type SpinnerVariant = 'on-solid' | 'on-subtle' | 'neutral';
export type SpinnerSize = 'sm' | 'xs';

export interface SpinnerProps {
  /** Background the spinner sits on. */
  variant?: SpinnerVariant;
  /** sm = 24 px box (control/sm), xs = 20 px box (control/xs). */
  size?: SpinnerSize;
  /** Accessible name. Default "Loading". */
  'aria-label'?: string;
  className?: string;
}

const COLOR: Record<SpinnerVariant, string> = {
  'on-solid': 'text-interactive-primary-solid-icon-default',
  'on-subtle': 'text-content-primary-icon-strong',
  neutral: 'text-content-neutral-icon-muted',
};

const BOX: Record<SpinnerSize, string> = {
  sm: 'size-control-sm',
  xs: 'size-control-xs',
};

/**
 * The arc alone, coloured by currentColor. Figma `spin`: a 12 px ellipse with a 2 px round-capped stroke,
 * drawn clockwise from 315° to 180° (225°), centred in the box.
 * @internal Used by Spinner, Button and IconButton.
 */
export function SpinnerArc({ size = 'sm', className }: { size?: SpinnerSize; className?: string }) {
  return (
    <span aria-hidden className={cx('inline-flex shrink-0 items-center justify-center', BOX[size], className)}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="motion-safe:animate-spin">
        <path d="M11.243 2.757A6 6 0 1 1 1 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Shows that a process is in progress. */
export function Spinner({ variant = 'neutral', size = 'sm', 'aria-label': ariaLabel = 'Loading', className }: SpinnerProps) {
  return (
    <ProgressBar isIndeterminate aria-label={ariaLabel} className={cx('inline-flex', COLOR[variant], className)}>
      <SpinnerArc size={size} />
    </ProgressBar>
  );
}
