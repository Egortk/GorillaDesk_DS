// Shared internals of CustomerAvatar, UserAvatar, BranchAvatar and the AvatarGroup counter. Not exported from the package.
import { createContext, useContext, useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const satisfies readonly AvatarSize[];

/** Background the avatars sit on; sets the ring colour (color/avatar/ring/*). */
export type AvatarBackground = 'default' | 'canvas';

/** Figma: size spacing/control/*, text body/{xs,xs,sm,md,lg}/medium. */
const SIZE: Record<AvatarSize, string> = {
  xs: 'size-control-xs text-body-xs',
  sm: 'size-control-sm text-body-xs',
  md: 'size-control-md text-body-sm',
  lg: 'size-control-lg text-body-md',
  xl: 'size-control-xl text-body-lg',
};

/** Figma: a drop shadow with spread space/avatar/ring in color/avatar/ring/*, i.e. an outer ring. */
const RING: Record<AvatarBackground, string> = {
  default: 'ring-(length:--space-avatar-ring) ring-avatar-ring-default',
  canvas: 'ring-(length:--space-avatar-ring) ring-avatar-ring-canvas',
};

/** Set by AvatarGroup: every avatar inside takes the group size and gets the ring. */
export const AvatarGroupContext = createContext<{ size: AvatarSize; background: AvatarBackground } | null>(null);

/** Size and ring of an avatar: inside a group the group decides, outside it the avatar's own `size`. */
export function useAvatarLayout(size: AvatarSize | undefined) {
  const group = useContext(AvatarGroupContext);
  return { size: group?.size ?? size ?? 'md', ring: group ? RING[group.background] : undefined };
}

/** Initials of the first and last word; size xs shows one letter (20 px is too small for two). */
export function initialsOf(name: string, size: AvatarSize) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = (w: string | undefined) => (w ? (Array.from(w)[0] ?? '') : '');
  const letters = size === 'xs' || words.length < 2 ? first(words[0]) : first(words[0]) + first(words.at(-1));
  return letters.toLocaleUpperCase();
}

/** Tracks a failed image so the avatar can fall back; resets when `src` changes. */
export function useImage(src: string | undefined) {
  const [failed, setFailed] = useState<string>();
  return { show: Boolean(src) && src !== failed, onError: () => setFailed(src) };
}

export function AvatarImage({ src, onError, className }: { src: string; onError?: () => void; className?: string }) {
  return <img src={src} alt="" draggable={false} onError={onError} className={cx('absolute inset-0 size-full', className)} />;
}

/** The round frame every avatar shares. `label` is the accessible name (role="img"). */
export function AvatarFrame({
  size,
  ring,
  label,
  className,
  children,
}: {
  size: AvatarSize;
  ring?: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cx(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-ui font-medium whitespace-nowrap select-none',
        SIZE[size],
        ring,
        className,
      )}
    >
      {children}
    </span>
  );
}
