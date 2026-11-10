import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { ButtonGroupContext } from '../Button/buttonStyles';

export interface ButtonGroupProps {
  /** Two or more Button / IconButton elements (Figma slot `items`). Each keeps its own variant and size. */
  children: ReactNode;
  /** Names the group for screen readers, e.g. "Calendar view". */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
}

/**
 * Joins related actions into one control. Buttons share their borders (−1 px overlap), only the outer corners are
 * rounded, and the resting shadow is drawn once for the whole group. For choosing one option use a segmented control.
 */
export function ButtonGroup({ children, className, ...aria }: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value>
      <div role="group" {...aria} className={cx('isolate inline-flex items-center rounded-md shadow-interactive-default', className)}>
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}
