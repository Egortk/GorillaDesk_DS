// Story-only sample data for avatars. Images come from the Figma Components file.
import { Matrix } from './helpers';
import branchLogo from './assets/branch-logo.png';
import rebecca from './assets/user-rebecca.jpg';
import zane from './assets/user-zane.jpg';
import { AVATAR_SIZES, type AvatarSize } from '../components/Avatar/avatarBase';
import type { ReactNode } from 'react';

export const SAMPLE = { rebecca, zane, branchLogo, broken: '/does-not-exist.png' };

/** `src` control: keys in args (not URLs) so Controls stay readable. */
export const srcControl = (photo: string) => ({
  control: 'select' as const,
  options: ['none', 'image', 'broken'],
  mapping: { none: undefined, image: photo, broken: SAMPLE.broken },
});

/** One column per size, one row per case. */
export function SizeMatrix<R extends string>({ rows, render }: { rows: readonly R[]; render: (row: R, size: AvatarSize) => ReactNode }) {
  return <Matrix rows={rows} cols={AVATAR_SIZES} render={render} />;
}
