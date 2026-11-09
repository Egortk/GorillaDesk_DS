import { cx } from '../../lib/cx';
import { AvatarFrame, AvatarImage, useAvatarLayout, useImage, type AvatarSize } from './avatarBase';
// SystemAvatar variant=default, exported from Figma Components (96 px for xl at 2x). Inlined so consumers need no asset setup.
import systemAvatar from './system-avatar-default.png?inline';

export interface UserAvatarProps {
  /** Inside AvatarGroup the group size wins. */
  size?: AvatarSize;
  /** Team member name: the accessible name. */
  name: string;
  /** Photo URL. Without it, or when it fails to load, the default system avatar shows. */
  src?: string;
  className?: string;
}

/** A team member: their photo, or the default system avatar. */
export function UserAvatar({ size, name, src, className }: UserAvatarProps) {
  const layout = useAvatarLayout(size);
  const photo = useImage(src);
  return (
    <AvatarFrame {...layout} label={name} className={cx('bg-interactive-secondary-solid-bg-default', className)}>
      {photo.show ? (
        <AvatarImage src={src!} onError={photo.onError} className="object-cover" />
      ) : (
        <AvatarImage src={systemAvatar} className="object-cover" />
      )}
    </AvatarFrame>
  );
}
