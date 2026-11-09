import { cx } from '../../lib/cx';
import { AvatarFrame, initialsOf, useAvatarLayout, type AvatarSize } from './avatarBase';

export interface CustomerAvatarProps {
  /** Inside AvatarGroup the group size wins. */
  size?: AvatarSize;
  /** Customer name. Initials come from it (one letter in size xs); it is also the accessible name. */
  name: string;
  className?: string;
}

/** A customer, shown by initials on the secondary colour. */
export function CustomerAvatar({ size, name, className }: CustomerAvatarProps) {
  const layout = useAvatarLayout(size);
  return (
    <AvatarFrame
      {...layout}
      label={name}
      className={cx('bg-interactive-secondary-solid-bg-default text-content-inverse-text-strong', className)}
    >
      <span aria-hidden>{initialsOf(name, layout.size)}</span>
    </AvatarFrame>
  );
}
