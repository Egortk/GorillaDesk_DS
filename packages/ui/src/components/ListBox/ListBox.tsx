import { ListBox as RACListBox, type ListBoxProps as RACListBoxProps } from 'react-aria-components';
import { cx } from '../../lib/cx';

export interface ListBoxProps<T> extends Omit<RACListBoxProps<T>, 'className' | 'style'> {
  className?: string;
}

/**
 * A list of options (Figma `ListBox`): ListBoxItem children, padding space/xs, items space/3xs apart.
 * Inside Select it comes built in. On its own, give it aria-label and a selectionMode.
 */
export function ListBox<T extends object>({ className, ...props }: ListBoxProps<T>) {
  return <RACListBox {...props} className={cx('flex flex-col gap-(--space-3xs) p-(--space-xs) outline-none', className)} />;
}
