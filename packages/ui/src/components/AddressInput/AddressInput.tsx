import { useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Input } from '../Input/Input';
import { GROUP_ITEM_LAYERS, GROUP_ROW } from '../InputGroup/InputGroup';

export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}

export type AddressField = keyof Address;

export interface AddressInputProps {
  /** Controlled value. Missing fields are empty. */
  value?: Partial<Address>;
  /** Uncontrolled initial value. */
  defaultValue?: Partial<Address>;
  /** Called with the whole address when any field changes. */
  onChange?: (value: Address) => void;
  /** Fields to show as invalid (each field keeps its own error state). */
  invalidFields?: AddressField[];
  isDisabled?: boolean;
  isReadOnly?: boolean;
  /** Names the block for screen readers. Default "Address". */
  'aria-label'?: string;
  className?: string;
}

const EMPTY: Address = { street1: '', street2: '', city: '', state: '', zip: '' };

/** Figma placeholders double as accessible names. */
const LABEL: Record<AddressField, string> = { street1: 'Street 1', street2: 'Street 2', city: 'City', state: 'ST', zip: 'Zip' };
const NAME: Record<AddressField, string> = { street1: 'Street 1', street2: 'Street 2', city: 'City', state: 'State', zip: 'Zip' };

/** Overlap on the inline axis inside a row, on the block axis between rows. */
const ROW = cx('flex', GROUP_ROW, GROUP_ITEM_LAYERS);

/**
 * Postal address in one block: Street 1, Street 2, then City, State and Zip on one row.
 * Built from Input variant="inline" joined like InputGroup; only the outer corners are rounded.
 */
export function AddressInput({
  value,
  defaultValue,
  onChange,
  invalidFields = [],
  isDisabled,
  isReadOnly,
  className,
  'aria-label': ariaLabel = 'Address',
}: AddressInputProps) {
  const [inner, setInner] = useState<Address>(() => ({ ...EMPTY, ...defaultValue }));
  const address: Address = value ? { ...EMPTY, ...value } : inner;

  const field = (key: AddressField, corners: string): ReactNode => (
    <div className={corners}>
      <Input
        variant="inline"
        aria-label={NAME[key]}
        placeholder={LABEL[key]}
        value={address[key]}
        onChange={(v) => {
          const next = { ...address, [key]: v };
          if (!value) setInner(next);
          onChange?.(next);
        }}
        isInvalid={invalidFields.includes(key)}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
      />
    </div>
  );

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cx(
        'isolate flex w-full flex-col rounded-md shadow-interactive-default',
        '[&>*+*]:mt-(--space-overlap-md)',
        GROUP_ITEM_LAYERS,
        className,
      )}
    >
      {field('street1', '[&_[data-field-frame]]:rounded-t-md')}
      {field('street2', '')}
      <div className={ROW}>
        {field('city', '[&_[data-field-frame]]:rounded-es-md')}
        <div className={ROW}>
          {field('state', '')}
          {field('zip', '[&_[data-field-frame]]:rounded-ee-md')}
        </div>
      </div>
    </div>
  );
}
