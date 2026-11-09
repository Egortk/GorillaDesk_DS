import { Children, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { AvatarFrame, AvatarGroupContext, useAvatarLayout, type AvatarBackground, type AvatarSize } from '../Avatar/avatarBase';

export interface AvatarGroupProps {
  /** Size of every avatar in the group (it overrides their own `size`). */
  size?: AvatarSize;
  /** How many avatars show before the counter. Without it all avatars show. */
  max?: number;
  /** What the group sits on: sets the ring colour (color/avatar/ring/default or /canvas). Code-only, not a Figma property. */
  background?: AvatarBackground;
  /** CustomerAvatar, UserAvatar or BranchAvatar elements. */
  children: ReactNode;
  /** Accessible name of the counter. Default "{count} more". */
  counterLabel?: (count: number) => string;
  'aria-label'?: string;
  className?: string;
}

/** Figma: gap space/avatar-group/overlap/*. CSS gap cannot be negative, so it is a start margin on every item but the first. */
const OVERLAP: Record<AvatarSize, string> = {
  xs: '*:not-first:ms-(--space-avatar-group-overlap-xs)',
  sm: '*:not-first:ms-(--space-avatar-group-overlap-sm)',
  md: '*:not-first:ms-(--space-avatar-group-overlap-md)',
  lg: '*:not-first:ms-(--space-avatar-group-overlap-lg)',
  xl: '*:not-first:ms-(--space-avatar-group-overlap-xl)',
};

/** Figma `_avatarCounter`: how many avatars are hidden. Size xs shows the number without "+". */
function AvatarCounter({ count, label }: { count: number; label: string }) {
  const layout = useAvatarLayout(undefined);
  return (
    <AvatarFrame {...layout} label={label} className="bg-interactive-neutral-subtle-bg-selected text-content-neutral-text-default">
      <span aria-hidden>{layout.size === 'xs' ? count : `+${count}`}</span>
    </AvatarFrame>
  );
}

/** Several people in an overlapping stack, with a counter for the ones that do not fit. */
export function AvatarGroup({
  size = 'md',
  max,
  background = 'default',
  children,
  counterLabel = (count) => `${count} more`,
  'aria-label': ariaLabel,
  className,
}: AvatarGroupProps) {
  const items = Children.toArray(children);
  const shown = max !== undefined && items.length > max ? items.slice(0, Math.max(0, max)) : items;
  const hidden = items.length - shown.length;
  return (
    <AvatarGroupContext.Provider value={{ size, background }}>
      <div role="group" aria-label={ariaLabel} className={cx('inline-flex items-center', OVERLAP[size], className)}>
        {shown}
        {hidden > 0 && <AvatarCounter count={hidden} label={counterLabel(hidden)} />}
      </div>
    </AvatarGroupContext.Provider>
  );
}
