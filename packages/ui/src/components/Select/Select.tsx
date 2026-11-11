import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  Button,
  Select as RACSelect,
  SelectValue,
  type Key,
  type SelectProps as RACSelectProps,
} from 'react-aria-components';
import { cx } from '../../lib/cx';
import { ICON_SLOT } from '../../lib/styles';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Popover/Popover';
import { Tag } from '../Tag/Tag';

export type SelectVariant = 'box' | 'inline';
/** Figma `_more` variant: tag for Tag values, pill for UserChip values, text for very narrow cells. */
export type SelectMoreKind = 'tag' | 'pill' | 'text';
type SelectionMode = 'single' | 'multiple';

/** A selected option as the value slot sees it. */
export interface SelectedOption<T> {
  key: Key;
  textValue: string;
  /** The item object when the Select gets `items`; null for static children. */
  value: T | null;
}

export interface SelectProps<T extends object, M extends SelectionMode = 'single'>
  extends Omit<RACSelectProps<T, M>, 'children' | 'className' | 'style'> {
  /** box = standalone field; inline = table cell or filter bar (no radius, no resting shadow, values on one line). */
  variant?: SelectVariant;
  /** ListBoxItem elements, or a function of each item when `items` is passed. */
  children: ReactNode | ((item: T) => ReactNode);
  /** Options for a dynamic list; render each with `children`. */
  items?: Iterable<T>;
  /** 24 px icon before the value (Figma hasIcon + icon). */
  icon?: ReactNode;
  /** Shows the value but does not open or change it (Figma state=readonly). */
  isReadOnly?: boolean;
  /**
   * Multiple selection: how one selected option looks in the field (Figma value slot: Tag or UserChip).
   * Default: a neutral Tag with the option's textValue.
   */
  renderValue?: (option: SelectedOption<T>) => ReactNode;
  /** Look of the "+N" counter when values do not fit (inline only). Use pill with UserChip values. */
  moreKind?: SelectMoreKind;
  className?: string;
}

type Mode = 'normal' | 'invalid' | 'readonly' | 'disabled';

// Class names are written out in full so Tailwind can find them. The trigger Button is the "group".
// Hover applies only while not focused; keyboard focus and the open list both use the focused look.
const FRAME: Record<Mode, string> = {
  normal:
    'bg-input-bg-default inset-ring-input-border-default data-hovered:not-data-focus-visible:bg-input-bg-hover data-hovered:not-data-focus-visible:inset-ring-input-border-hover data-focus-visible:bg-input-bg-focus data-focus-visible:inset-ring-input-border-focus',
  invalid:
    'bg-input-bg-invalid inset-ring-input-border-invalid data-hovered:not-data-focus-visible:bg-input-bg-invalid-hover data-hovered:not-data-focus-visible:inset-ring-input-border-invalid-hover data-focus-visible:bg-input-bg-invalid-focus data-focus-visible:inset-ring-input-border-invalid-focus',
  readonly: 'bg-input-bg-readonly inset-ring-input-border-readonly',
  disabled: 'bg-input-bg-disabled inset-ring-input-border-disabled',
};
const FRAME_OPEN: Record<'normal' | 'invalid', string> = {
  normal: 'bg-input-bg-focus inset-ring-input-border-focus shadow-interactive-focus',
  invalid: 'bg-input-bg-invalid-focus inset-ring-input-border-invalid-focus shadow-interactive-focus-invalid',
};
const FOCUS_RING: Record<Mode, string> = {
  normal: 'data-focus-visible:shadow-interactive-focus',
  invalid: 'data-focus-visible:shadow-interactive-focus-invalid',
  readonly: 'data-focus-visible:shadow-interactive-focus',
  disabled: '',
};
const ICON: Record<Mode, string> = {
  normal:
    'text-input-icon-default group-data-hovered:not-group-data-focus-visible:text-input-icon-hover group-data-focus-visible:text-input-icon-focus',
  invalid:
    'text-input-icon-invalid group-data-hovered:not-group-data-focus-visible:text-input-icon-invalid-hover group-data-focus-visible:text-input-icon-invalid-focus',
  readonly: 'text-input-icon-readonly',
  disabled: 'text-input-icon-disabled',
};
const ICON_OPEN: Record<'normal' | 'invalid', string> = { normal: 'text-input-icon-focus', invalid: 'text-input-icon-invalid-focus' };
const VALUE_TEXT: Record<Mode, string> = {
  normal: 'text-input-text-value',
  invalid: 'text-input-text-value',
  readonly: 'text-input-text-readonly',
  disabled: 'text-input-text-disabled',
};

/** Internal (Figma `_select-arrow`): chevron, down when closed and up when open. The 1.3 px stroke is icon geometry. */
function Arrow({ isOpen }: { isOpen: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className={cx('size-full', isOpen && 'rotate-180')}>
      <path d="M8.5 10.5L12 14L15.5 10.5" />
    </svg>
  );
}

/** Internal (Figma `_more`): "+N" for values that do not fit. Not a Tag in a TagGroup, just a label. */
function More({ count, kind }: { count: number; kind: SelectMoreKind }) {
  const label = `+${count}`;
  return (
    <span className="flex shrink-0">
      <span aria-hidden className="flex">
        {kind === 'text' ? (
          <span className="flex h-control-sm items-center font-ui text-body-sm font-normal text-interactive-neutral-transparent-text-default">{label}</span>
        ) : (
          <Tag size="sm" className={kind === 'pill' ? 'rounded-full' : undefined}>
            {label}
          </Tag>
        )}
      </span>
      <span className="sr-only">{`${count} more`}</span>
    </span>
  );
}

/** Inline value row: shows the values that fit on one line and "+N" for the rest. */
function OverflowRow({ chips, moreKind }: { chips: ReactNode[]; moreKind: SelectMoreKind }) {
  const row = useRef<HTMLSpanElement>(null);
  const measure = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(chips.length);

  useLayoutEffect(() => {
    const rowEl = row.current;
    const m = measure.current;
    if (!rowEl || !m) return;
    const compute = () => {
      const kids = Array.from(m.children) as HTMLElement[];
      const moreW = kids[kids.length - 1]?.offsetWidth ?? 0;
      const gap = parseFloat(getComputedStyle(m).columnGap) || 0;
      const avail = rowEl.clientWidth;
      const widths = kids.slice(0, -1).map((k) => k.offsetWidth);
      let used = 0;
      let n = 0;
      for (let i = 0; i < widths.length; i++) {
        const next = used + (i ? gap : 0) + widths[i]!;
        const rest = widths.length - i - 1;
        if (next + (rest ? gap + moreW : 0) > avail) break;
        used = next;
        n++;
      }
      setVisible(n);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(rowEl);
    return () => ro.disconnect();
  }, [chips, moreKind]);

  const hidden = chips.length - visible;
  return (
    <span ref={row} className="relative flex min-w-0 flex-1 items-center gap-(--space-2xs) overflow-hidden">
      {/* Measuring copy: every value plus the widest counter, laid out but invisible. */}
      <span ref={measure} aria-hidden className="invisible absolute start-0 top-0 flex gap-(--space-2xs) whitespace-nowrap">
        {chips.map((c, i) => (
          <span key={i} className="flex shrink-0">
            {c}
          </span>
        ))}
        <More count={chips.length} kind={moreKind} />
      </span>
      {chips.slice(0, visible).map((c, i) => (
        <span key={i} className="flex min-w-0 shrink-0">
          {c}
        </span>
      ))}
      {hidden > 0 && <More count={hidden} kind={moreKind} />}
    </span>
  );
}

/** Lets the user pick one or several values from a list that opens under the field. */
export function Select<T extends object, M extends SelectionMode = 'single'>({
  variant = 'box',
  children,
  items,
  icon,
  placeholder,
  isReadOnly,
  renderValue,
  moreKind = 'tag',
  className,
  ...props
}: SelectProps<T, M>) {
  const { isDisabled, isInvalid } = props;
  const mode: Mode = isDisabled ? 'disabled' : isReadOnly ? 'readonly' : isInvalid ? 'invalid' : 'normal';
  // Read-only: keep the first value and never open.
  const [frozen] = useState(() => props.value ?? props.defaultValue);
  const readOnlyProps = isReadOnly ? { value: frozen, onChange: () => {}, isOpen: false, onOpenChange: () => {} } : {};

  return (
    <RACSelect {...(props as object)} {...(readOnlyProps as object)} placeholder={placeholder} className={cx('flex w-full flex-col', className)}>
      {({ isOpen }) => {
        const open = isOpen && (mode === 'normal' || mode === 'invalid');
        return (
          <>
            <Button
              className={cx(
                'group relative flex min-h-control-md w-full items-center px-(--space-input-padding-x) text-start outline-none inset-ring-(length:--border-width-md)',
                mode === 'disabled' ? 'cursor-default' : 'cursor-pointer',
                open ? FRAME_OPEN[mode as 'normal' | 'invalid'] : cx(FRAME[mode], FOCUS_RING[mode]),
                variant === 'box' && cx('rounded-md', !open && mode !== 'disabled' && 'shadow-interactive-default'),
              )}
            >
              {icon && <span aria-hidden className={cx(ICON_SLOT, open ? ICON_OPEN[mode as 'normal' | 'invalid'] : ICON[mode])}>{icon}</span>}
              <SelectValue<T>
                className={cx(
                  'flex min-w-0 flex-1 items-center gap-(--space-2xs) py-(--space-xs) pe-(--space-input-label-inset)',
                  variant === 'box' && 'flex-wrap',
                )}
              >
                {({ isPlaceholder, selectedText, state }) => {
                  const text = 'truncate px-(--space-xs) font-ui text-body-md font-normal';
                  if (isPlaceholder) return <span className={cx(text, 'text-input-text-placeholder')}>{placeholder}</span>;
                  if (state.selectionManager.selectionMode !== 'multiple') return <span className={cx(text, VALUE_TEXT[mode])}>{selectedText}</span>;
                  const options: SelectedOption<T>[] = [...state.selectionManager.selectedKeys].map((key) => {
                    const node = state.collection.getItem(key);
                    return { key, textValue: node?.textValue ?? String(key), value: (node?.value as T) ?? null };
                  });
                  const chips = options.map((o) => (renderValue ? renderValue(o) : <Tag size="sm">{o.textValue}</Tag>));
                  if (variant === 'inline') return <OverflowRow chips={chips} moreKind={moreKind} />;
                  return options.map((o, i) => (
                    <span key={String(o.key)} className="flex max-w-full min-w-0">
                      {chips[i]}
                    </span>
                  ));
                }}
              </SelectValue>
              <span aria-hidden className={cx(ICON_SLOT, open ? ICON_OPEN[mode as 'normal' | 'invalid'] : ICON[mode])}>
                <Arrow isOpen={open} />
              </span>
            </Button>
            <Popover placement="bottom start">
              <ListBox<T> items={items}>{children}</ListBox>
            </Popover>
          </>
        );
      }}
    </RACSelect>
  );
}
