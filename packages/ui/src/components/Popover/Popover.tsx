import { Popover as RACPopover, type PopoverProps as RACPopoverProps } from 'react-aria-components';
import { cx } from '../../lib/cx';

export interface PopoverProps extends Omit<RACPopoverProps, 'className' | 'style'> {
  className?: string;
}

/**
 * Floating surface anchored to a trigger (Figma `Popover`): overlay background, radius lg, elevation shadow.
 * No padding of its own; the content sets it (ListBox has space/xs). At least as wide as the trigger;
 * React Aria limits the height to the space in the viewport and the content scrolls.
 * Select builds it in. Use it directly with DialogTrigger or MenuTrigger.
 */
export function Popover({ className, offset = 4, ...props }: PopoverProps) {
  return (
    <RACPopover
      {...props}
      offset={offset}
      className={cx(
        'z-(--z-index-popover) flex min-w-(--trigger-width) flex-col overflow-auto rounded-lg bg-environment-surface-overlay shadow-elevation outline-none',
        className,
      )}
    />
  );
}
