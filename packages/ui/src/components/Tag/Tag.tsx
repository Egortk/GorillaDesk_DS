import { useState, type ReactNode } from 'react';
import { useFocusVisible, useHover } from 'react-aria';
import { Button as RACButton, type PressEvent } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { stateful, toneOf, type Emphasis, type Intent } from '../../lib/palette';
import { BORDER, ICON_SLOT, SHADOW_INTERACTIVE } from '../../lib/styles';
import { DismissButtonBase } from '../DismissButton/DismissButton';

export type TagSize = 'xs' | 'sm';

export interface TagProps {
  intent?: Intent;
  emphasis?: Emphasis;
  /** xs = 20 px high, sm = 24 px high. */
  size?: TagSize;
  /** Label. */
  children: ReactNode;
  /** Icon before the label (Figma hasIcon + icon). Figma defines it for size="sm" only, so xs ignores it. */
  icon?: ReactNode;
  /**
   * Makes the tag interactive (Figma interactive=true): border, shadow, hover / pressed / focus states.
   * Without it the tag is a static label (interactive=false).
   */
  onPress?: (e: PressEvent) => void;
  /** Shows a DismissButton (Figma removable=true) that calls this. */
  onRemove?: () => void;
  /** Accessible name of the remove button. Default: "Remove {children}" for text labels, else "Remove". */
  removeLabel?: string;
  isDisabled?: boolean;
  className?: string;
}

const HEIGHT: Record<TagSize, string> = { xs: 'h-control-xs', sm: 'h-control-sm' };
const LABEL: Record<TagSize, string> = {
  xs: 'px-(--space-sm) font-ui text-body-xs font-medium',
  sm: 'px-(--space-md) font-ui text-body-sm font-normal',
};
const DISMISS_SLOT: Record<TagSize, string> = { xs: 'w-control-xs', sm: 'w-control-sm' };

/** Label that can be added, selected or removed. */
export function Tag({
  intent = 'neutral',
  emphasis = 'subtle',
  size = 'sm',
  children,
  icon,
  onPress,
  onRemove,
  removeLabel,
  isDisabled,
  className,
}: TagProps) {
  const interactive = Boolean(onPress);
  const tone = toneOf(emphasis);
  const { hoverProps, isHovered } = useHover({ isDisabled: !interactive || isDisabled });
  const { isFocusVisible: keyboardModality } = useFocusVisible();
  const [isFocused, setFocused] = useState(false);
  const isFocusVisible = isFocused && keyboardModality;
  const [isPressed, setPressed] = useState(false);
  const iconColor = stateful('text', intent, tone, 'icon', 'group');

  const content = (
    <>
      {icon && size === 'sm' && <span aria-hidden className={cx(ICON_SLOT, iconColor)}>{icon}</span>}
      <span className={cx('flex items-center', LABEL[size])}>{children}</span>
    </>
  );

  return (
    <span
      {...hoverProps}
      // Root mirrors the React Aria state of the inner button, so the whole tag is styled like one control.
      data-hovered={isHovered || undefined}
      data-pressed={(interactive && isPressed) || undefined}
      data-focus-visible={(interactive && isFocusVisible) || undefined}
      data-disabled={isDisabled || undefined}
      className={cx(
        'group inline-flex shrink-0 items-center rounded-md align-middle whitespace-nowrap bg-environment-surface-default',
        HEIGHT[size],
        stateful('bg-over', intent, tone, 'bg'),
        stateful('text', intent, tone, 'text'),
        interactive && cx(BORDER, stateful('inset-ring', intent, tone, 'border'), SHADOW_INTERACTIVE),
        className,
      )}
    >
      {interactive ? (
        <RACButton
          onPress={onPress}
          onPressChange={setPressed}
          onFocusChange={setFocused}
          isDisabled={isDisabled}
          className="flex cursor-default items-center self-stretch outline-none"
        >
          {content}
        </RACButton>
      ) : (
        content
      )}
      {onRemove && (
        <span className={cx('flex shrink-0 justify-end', DISMISS_SLOT[size])}>
          <DismissButtonBase
            shape="square"
            size={size}
            onPress={onRemove}
            isDisabled={isDisabled}
            aria-label={removeLabel ?? (typeof children === 'string' ? `Remove ${children}` : 'Remove')}
            colorClassName={iconColor}
            // Figma: while the tag is hovered or pressed, the dismiss button shows its hover fill.
            className="group-data-hovered:not-data-pressed:bg-interactive-neutral-transparent-bg-hover group-data-pressed:not-data-pressed:bg-interactive-neutral-transparent-bg-hover"
          />
        </span>
      )}
    </span>
  );
}
