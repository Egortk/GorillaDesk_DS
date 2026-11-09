import { cx } from '../../lib/cx';
import { AvatarFrame, AvatarImage, initialsOf, useAvatarLayout, useImage, type AvatarSize } from './avatarBase';

export interface BranchAvatarProps {
  /** Inside AvatarGroup the group size wins. */
  size?: AvatarSize;
  /** Branch name. Initials come from it when there is no logo (one letter in size xs); it is also the accessible name. */
  name: string;
  /** Logo URL. Without it, or when it fails to load, the initials show. */
  src?: string;
  className?: string;
}

/** A company branch: its logo on the surface colour, or initials on the primary colour. */
export function BranchAvatar({ size, name, src, className }: BranchAvatarProps) {
  const layout = useAvatarLayout(size);
  const logo = useImage(src);
  return (
    <AvatarFrame
      {...layout}
      label={name}
      className={cx(
        logo.show ? 'bg-environment-surface-default' : 'bg-interactive-primary-solid-bg-default text-content-inverse-text-strong',
        className,
      )}
    >
      {logo.show ? <AvatarImage src={src!} onError={logo.onError} className="object-contain" /> : <span aria-hidden>{initialsOf(name, layout.size)}</span>}
    </AvatarFrame>
  );
}
