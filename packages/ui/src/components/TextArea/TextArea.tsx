import { Group, TextArea as RACTextArea, TextField, type TextFieldProps } from 'react-aria-components';
import { cx } from '../../lib/cx';
import { FIELD_FOCUS_RING, FIELD_FRAME, FIELD_ROOT_BASE, FIELD_TEXT, fieldShape, type FieldMode } from '../../lib/input';

export type TextAreaVariant = 'box' | 'inline';

export interface TextAreaProps extends Omit<TextFieldProps, 'children' | 'className' | 'style'> {
  /** box = standalone field (resizable vertically); inline = table cell (no radius, no resting shadow, no resize). */
  variant?: TextAreaVariant;
  placeholder?: string;
  /** Minimum number of visible lines. Sets the height; the Figma height is only an example. */
  rows?: number;
  className?: string;
}

/**
 * Multi-line field for longer text: notes, comments, job descriptions. Text wraps and starts at the top.
 * In variant=box the field can be resized vertically while it is editable (Figma `_resize-handle`: the browser draws it).
 */
export function TextArea({ variant = 'box', placeholder, rows = 6, className, ...props }: TextAreaProps) {
  const { isDisabled, isReadOnly, isInvalid } = props;
  const mode: FieldMode = isDisabled ? 'disabled' : isReadOnly ? 'readonly' : isInvalid ? 'invalid' : 'normal';
  const resizable = variant === 'box' && (mode === 'normal' || mode === 'invalid');
  return (
    <TextField {...props} className={cx('flex w-full', className)}>
      <Group
        data-field-frame
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        className={cx(FIELD_ROOT_BASE, FIELD_FRAME[mode], FIELD_FOCUS_RING[mode], fieldShape(variant, mode))}
      >
        <RACTextArea
          rows={rows}
          placeholder={placeholder}
          className={cx(
            // Same text inset as Input (field padding + label inset); vertical padding as in Figma (space/md).
            // Not FIELD_INPUT: that one fills a fixed-height row, this one sets its own height from `rows`.
            'block w-full min-w-0 bg-transparent px-[calc(var(--space-input-padding-x)+var(--space-input-label-inset))] py-(--space-md) font-ui text-body-md font-normal outline-none placeholder:text-input-text-placeholder',
            FIELD_TEXT[mode],
            resizable ? 'resize-y' : 'resize-none',
          )}
        />
      </Group>
    </TextField>
  );
}
