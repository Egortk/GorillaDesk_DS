import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface InputGroupProps {
  /** Two or more fields with variant="inline": Input, Select, SearchField (Figma slot `items`). */
  children: ReactNode;
  /** Names the group for screen readers, e.g. "Name". */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
}

/**
 * Item rules, shared with AddressInput:
 * - neighbours overlap by space/overlap/md so their borders merge (CSS gap cannot be negative: a margin);
 * - the item with keyboard focus is raised above its neighbours, an invalid item too (focus wins);
 * - only the outer corners of the group are rounded (`data-field-frame` is the visible box of each field).
 * React Aria puts a <template> next to collection components (Select), so the item selectors skip it.
 */
export const GROUP_ITEM_LAYERS =
  '[&>*]:relative [&>*:has([data-invalid]):not(:focus-within)]:z-(--z-index-raised) [&>*:focus-within]:z-[calc(var(--z-index-raised)+1)]';

/** Overlap between neighbouring items on the inline axis. */
export const GROUP_ROW =
  '[&>*]:min-w-0 [&>*]:flex-1 [&>:not(template)~:not(template)]:ms-(--space-overlap-md)';

/**
 * Joins several fields into one control with shared borders: first and last name, amount and currency.
 * The group draws the resting shadow once; items share the width.
 */
export function InputGroup({ children, className, ...aria }: InputGroupProps) {
  return (
    <div
      role="group"
      {...aria}
      className={cx(
        'isolate flex w-full rounded-md shadow-interactive-default',
        GROUP_ROW,
        GROUP_ITEM_LAYERS,
        '[&>:nth-child(1_of_:not(template))_[data-field-frame]]:rounded-s-md [&>:nth-last-child(1_of_:not(template))_[data-field-frame]]:rounded-e-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
