import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { UserAvatar } from '../Avatar/UserAvatar';
import { DismissButton } from '../DismissButton/DismissButton';

export type UserChipSize = 'xs' | 'sm';
export type UserChipKind = 'pill' | 'plain';

export interface UserChipProps {
  /** pill = filled rounded background; plain = no background (dense lists, tables). */
  kind?: UserChipKind;
  /** xs = 20 px high, sm = 24 px high. */
  size?: UserChipSize;
  /** The person's name (Figma `label`). One line; truncates with an ellipsis when it does not fit. */
  children: string;
  /** Photo URL for the UserAvatar. Without it the default system avatar shows. */
  avatarSrc?: string;
  /** Status Lozenge after the name (Figma hasLozenge). Figma defines it for size="sm" only, so xs ignores it. */
  lozenge?: ReactNode;
  /** Shows a DismissButton (Figma removable=true) that calls this. */
  onRemove?: () => void;
  /** Accessible name of the remove button. Default: "Remove {children}". */
  removeLabel?: string;
  className?: string;
}

const ROOT: Record<UserChipSize, string> = { xs: 'h-control-xs', sm: 'h-control-sm' };
const LABEL: Record<UserChipSize, string> = {
  xs: 'font-ui text-body-xs font-normal',
  sm: 'font-ui text-body-sm font-normal',
};
// sm: the 20 px dismiss circle sits 2 px from the 24 px pill edge, so it stays concentric with the rounded end.
const DISMISS_SLOT: Record<UserChipSize, string> = { xs: '', sm: 'pe-(--space-2xs)' };

/** A person (avatar + name) as a compact chip. Not interactive; the only control is the optional dismiss button. */
export function UserChip({ kind = 'pill', size = 'sm', children, avatarSrc, lozenge, onRemove, removeLabel, className }: UserChipProps) {
  return (
    <span
      className={cx(
        'inline-flex max-w-full min-w-control-2xs items-center rounded-full align-middle whitespace-nowrap',
        ROOT[size],
        kind === 'pill' && 'bg-interactive-neutral-transparent-bg-default',
        className,
      )}
    >
      {/* The name is already in the text; the avatar is decorative here. */}
      <span aria-hidden className="flex shrink-0">
        <UserAvatar size={size} name={children} src={avatarSrc} />
      </span>
      <span className={cx('min-w-0 truncate px-(--space-sm) text-interactive-neutral-transparent-text-default', LABEL[size])} title={children}>
        {children}
      </span>
      {lozenge && size === 'sm' && <span className="flex shrink-0 pe-(--space-2xs)">{lozenge}</span>}
      {onRemove && (
        <span className={cx('flex shrink-0', DISMISS_SLOT[size])}>
          <DismissButton shape="circle" size="xs" onPress={onRemove} aria-label={removeLabel ?? `Remove ${children}`} />
        </span>
      )}
    </span>
  );
}
