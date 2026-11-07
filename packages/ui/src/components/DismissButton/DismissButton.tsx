import { Button, type ButtonProps } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { stateful } from '../../lib/palette';
import { SHADOW_FOCUS } from '../../lib/styles';

export type DismissButtonShape = 'square' | 'circle';
export type DismissButtonSize = 'sm' | 'xs';

export interface DismissButtonProps extends Omit<ButtonProps, 'children' | 'className' | 'style'> {
  shape?: DismissButtonShape;
  /** sm = 24 px, xs = 20 px. */
  size?: DismissButtonSize;
  /** Required: the button has no visible text. */
  'aria-label': string;
  className?: string;
}

const SIZE: Record<DismissButtonSize, string> = { sm: 'size-control-sm', xs: 'size-control-xs' };
const SHAPE: Record<DismissButtonShape, string> = { square: 'rounded-none', circle: 'rounded-full' };

/** Figma `dissmiss` icon, 16 px. */
function DismissIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="currentColor" className="size-icon-xs shrink-0">
      <path d="M10.5401 4.54027C10.794 4.28643 11.2062 4.28643 11.4601 4.54027C11.7137 4.79412 11.7138 5.20641 11.4601 5.46019L8.92001 8.00023L11.4601 10.5403C11.7137 10.7941 11.7138 11.2064 11.4601 11.4602C11.2063 11.7139 10.794 11.7138 10.5401 11.4602L8.00009 8.92015L5.46005 11.4602C5.20627 11.7139 4.79396 11.7138 4.54013 11.4602C4.28633 11.2064 4.28637 10.7941 4.54013 10.5403L7.08017 8.00023L4.54013 5.46019C4.28631 5.20637 4.28635 4.79411 4.54013 4.54027C4.79397 4.28643 5.20621 4.28643 5.46005 4.54027L8.00009 7.08031L10.5401 4.54027Z" />
    </svg>
  );
}

/**
 * @internal `colorClassName` replaces the icon colour (Tag uses its own intent colour).
 */
export function DismissButtonBase({
  shape = 'square',
  size = 'sm',
  className,
  colorClassName,
  ...props
}: DismissButtonProps & { colorClassName?: string }) {
  return (
    <Button
      {...props}
      className={cx(
        'inline-flex shrink-0 cursor-default items-center justify-center outline-none',
        SIZE[size],
        SHAPE[shape],
        stateful('bg', 'neutral', 'transparent', 'bg'),
        colorClassName ?? stateful('text', 'neutral', 'transparent', 'icon'),
        SHADOW_FOCUS,
        className,
      )}
    >
      <DismissIcon />
    </Button>
  );
}

/** Removes or closes the element it belongs to. */
export function DismissButton(props: DismissButtonProps) {
  return <DismissButtonBase {...props} />;
}
