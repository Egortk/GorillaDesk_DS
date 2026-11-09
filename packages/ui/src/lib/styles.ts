// Shared class fragments.

/** 1 px border drawn inside the box (Figma stroke align INSIDE), so it does not change layout. */
export const BORDER = 'inset-ring-(length:--border-width-md)';

/** Icon slot: icon/md (24 px), the passed SVG fills it and draws with currentColor. */
export const ICON_SLOT = 'flex size-icon-md shrink-0 items-center justify-center [&>svg]:size-full';

/**
 * Shadows of interactive controls (Button, IconButton, Tag): rest → interactive-default, hover → interactive-hover,
 * pressed / disabled / pending → none, keyboard focus → interactive-focus. Focus wins over hover and press.
 */
export const SHADOW_INTERACTIVE =
  'shadow-interactive-default data-hovered:not-data-focus-visible:shadow-interactive-hover data-pressed:not-data-focus-visible:shadow-none data-pending:not-data-focus-visible:shadow-none data-disabled:shadow-none data-focus-visible:shadow-interactive-focus';

/** Only the keyboard focus ring. */
export const SHADOW_FOCUS = 'data-focus-visible:shadow-interactive-focus';
