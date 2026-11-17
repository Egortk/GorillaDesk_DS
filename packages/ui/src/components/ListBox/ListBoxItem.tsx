import type { ReactNode } from 'react';
import { ListBoxItem as RACListBoxItem, Text, type ListBoxItemProps as RACListBoxItemProps, type ListBoxItemRenderProps } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { ICON_SLOT } from '../../lib/styles';
import { CheckboxIndicator } from '../Checkbox/Checkbox';

export interface ListBoxItemProps<T> extends Omit<RACListBoxItemProps<T>, 'children' | 'className' | 'style'> {
  /**
   * Option content (Figma `_list-label`): a string label (content=text), or a non-interactive Tag or UserChip
   * (content=tag | userChip). For anything but a string, pass textValue.
   */
  children: ReactNode;
  /** Muted second line under a string label (Figma hasDescription + description). */
  description?: ReactNode;
  /** 24 px icon or a UserAvatar size="sm" before the content (Figma hasLeading + `_leading`). */
  leading?: ReactNode;
  /** Non-interactive content after the label (Figma hasTrailing + trailing slot). */
  trailing?: ReactNode;
  /** A Badge at the end of the row (Figma hasBadge). */
  badge?: ReactNode;
  className?: string;
}

// Hover and keyboard focus look the same in a list (Figma state=hover): focus is virtual, the row is the control.
const BG_UNSELECTED =
  'data-hovered:not-data-pressed:bg-list-item-bg-default-hover data-focused:not-data-pressed:bg-list-item-bg-default-hover data-pressed:bg-list-item-bg-default-active';
const BG_SELECTED =
  'bg-list-item-bg-selected-default data-hovered:not-data-pressed:bg-list-item-bg-selected-hover data-focused:not-data-pressed:bg-list-item-bg-selected-hover data-pressed:bg-list-item-bg-selected-active';

const CHECK_COLOR =
  'text-interactive-primary-transparent-icon-default group-data-hovered:not-group-data-pressed:text-interactive-primary-transparent-icon-hover group-data-focused:not-group-data-pressed:text-interactive-primary-transparent-icon-hover group-data-pressed:text-interactive-primary-transparent-icon-active';

// Figma `check` icon (24 × 24), the mark of `_item-select-icon`.
const CHECK =
  'M17.0404 9.04039C17.2942 8.78655 17.7065 8.78655 17.9603 9.04039C18.2138 9.29426 18.214 9.7066 17.9603 9.96031L11.4603 16.4603C11.2066 16.714 10.7943 16.7138 10.5404 16.4603L7.04039 12.9603C6.78655 12.7065 6.78655 12.2942 7.04039 12.0404C7.29423 11.7865 7.70647 11.7865 7.96031 12.0404L11.0003 15.0804L17.0404 9.04039Z';

/** Figma `_selection`: the 24 px cell with the selection mark. Visual only; the row is the option. */
function Selection({ rp }: { rp: ListBoxItemRenderProps }) {
  if (rp.selectionMode === 'none') return null;
  return (
    <span aria-hidden className="flex size-control-sm shrink-0 items-center justify-center">
      {rp.selectionMode === 'multiple' ? (
        <CheckboxIndicator context="list" value={rp.isSelected ? 'checked' : 'unchecked'} mode={rp.isDisabled ? 'disabled' : 'normal'} />
      ) : (
        rp.isSelected && (
          <svg viewBox="0 0 24 24" fill="currentColor" className={cx('size-icon-md', rp.isDisabled ? 'text-interactive-primary-transparent-icon-disabled' : CHECK_COLOR)}>
            <path d={CHECK} />
          </svg>
        )
      )}
    </span>
  );
}

/** One option in a ListBox or in the list of a Select. */
export function ListBoxItem<T extends object>({ children, description, leading, trailing, badge, textValue, className, ...props }: ListBoxItemProps<T>) {
  const isText = typeof children === 'string' || typeof children === 'number';
  return (
    <RACListBoxItem
      {...props}
      textValue={textValue ?? (isText ? String(children) : undefined)}
      className={(rp) =>
        cx(
          'group flex cursor-default items-center gap-(--space-list-item-gap) rounded-list-item px-(--space-list-item-padding-x) py-(--space-list-item-padding-y) outline-none',
          rp.isDisabled ? rp.isSelected && 'bg-list-item-bg-selected-disabled' : rp.isSelected ? BG_SELECTED : BG_UNSELECTED,
          className,
        )
      }
    >
      {(rp) => (
        <>
          <Selection rp={rp} />
          {leading != null && (
            <span aria-hidden className={cx(ICON_SLOT, rp.isDisabled ? 'text-interactive-neutral-transparent-icon-disabled' : 'text-content-neutral-icon-default')}>
              {leading}
            </span>
          )}
          {isText ? (
            <span className="flex min-w-0 flex-1 flex-col gap-(--space-2xs) py-(--space-xs)">
              <Text
                slot="label"
                className={cx(
                  'truncate font-ui text-label-md',
                  rp.isDisabled ? 'text-interactive-neutral-transparent-text-disabled' : 'text-interactive-neutral-transparent-text-default',
                )}
              >
                {children}
              </Text>
              {description != null && (
                <Text
                  slot="description"
                  className={cx(
                    'font-ui text-body-sm font-normal',
                    rp.isDisabled ? 'text-interactive-neutral-transparent-text-disabled' : 'text-content-neutral-text-muted',
                  )}
                >
                  {description}
                </Text>
              )}
            </span>
          ) : (
            <span className="flex min-w-0 flex-1 items-center">{children}</span>
          )}
          {trailing != null && <span className="flex shrink-0 items-center">{trailing}</span>}
          {badge != null && <span className="flex h-control-sm shrink-0 items-center pe-(--space-xs)">{badge}</span>}
        </>
      )}
    </RACListBoxItem>
  );
}
