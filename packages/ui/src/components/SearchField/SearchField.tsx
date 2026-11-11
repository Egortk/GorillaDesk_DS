import { Group, Input as RACInput, SearchField as RACSearchField, type SearchFieldProps as RACSearchFieldProps } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { FIELD_FOCUS_RING, FIELD_FRAME, FIELD_ICON, FIELD_INPUT, FIELD_ROOT, FIELD_TEXT, fieldShape, type FieldMode } from '../../lib/input';
import { ICON_SLOT } from '../../lib/styles';
import { DismissButton } from '../DismissButton/DismissButton';

export type SearchFieldVariant = 'box' | 'inline';

export interface SearchFieldProps
  extends Omit<RACSearchFieldProps, 'children' | 'className' | 'style' | 'isInvalid' | 'isReadOnly' | 'validate' | 'validationBehavior'> {
  /** box = standalone field; inline = table cell or filter bar (no radius, no resting shadow). */
  variant?: SearchFieldVariant;
  placeholder?: string;
  className?: string;
}

/** Figma `margnifire-search` icon (Assets), 24 px. */
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.0004 3.84998C14.949 3.85019 18.1507 7.05166 18.1507 11.0004C18.1506 12.7678 17.5074 14.3843 16.4447 15.6322C16.5414 15.6626 16.6337 15.7138 16.7103 15.7904L18.9603 18.0404C19.2138 18.2943 19.214 18.7066 18.9603 18.9603C18.7066 19.214 18.2943 19.2138 18.0404 18.9603L15.7904 16.7103C15.7138 16.6337 15.6626 16.5415 15.6322 16.4447C14.3843 17.5074 12.7678 18.1507 11.0004 18.1508C7.05165 18.1508 3.85018 14.949 3.84996 11.0004C3.84996 7.05153 7.05152 3.84998 11.0004 3.84998ZM11.0004 5.15076C7.76949 5.15076 5.15074 7.7695 5.15074 11.0004C5.15096 14.231 7.76962 16.85 11.0004 16.85C14.2309 16.8498 16.8497 14.2309 16.85 11.0004C16.85 7.76963 14.231 5.15097 11.0004 5.15076ZM11.0004 7.84998C11.3592 7.85019 11.6507 8.14151 11.6507 8.50037C11.6505 8.85904 11.359 9.15055 11.0004 9.15076C9.97862 9.15076 9.15074 9.97864 9.15074 11.0004C9.15053 11.359 8.85903 11.6505 8.50035 11.6508C8.1415 11.6508 7.85017 11.3592 7.84996 11.0004C7.84996 9.26067 9.26065 7.84998 11.0004 7.84998Z" />
    </svg>
  );
}

/**
 * Field that searches or filters as the user types. The clear button shows while there is a value;
 * it and Escape empty the field and keep focus. No invalid or readonly state: a query is never wrong.
 */
export function SearchField({ variant = 'box', placeholder, className, ...props }: SearchFieldProps) {
  const mode: FieldMode = props.isDisabled ? 'disabled' : 'normal';
  return (
    <RACSearchField {...props} className={cx('flex w-full', className)}>
      {({ isEmpty }) => (
        <Group isDisabled={props.isDisabled} className={cx(FIELD_ROOT, FIELD_FRAME[mode], FIELD_FOCUS_RING[mode], fieldShape(variant, mode))}>
          <span className="flex min-w-0 flex-1 items-center px-(--space-input-padding-x)">
            <span aria-hidden className={cx(ICON_SLOT, FIELD_ICON[mode])}>
              <SearchIcon />
            </span>
            <RACInput placeholder={placeholder} className={cx(FIELD_INPUT, FIELD_TEXT[mode], '[&::-webkit-search-cancel-button]:hidden')} />
            {/* SearchField wires this Button to clear the value (ButtonContext); hidden when empty or disabled, as in Figma. */}
            {!isEmpty && !props.isDisabled && <DismissButton shape="circle" size="xs" aria-label="Clear search" />}
          </span>
        </Group>
      )}
    </RACSearchField>
  );
}
