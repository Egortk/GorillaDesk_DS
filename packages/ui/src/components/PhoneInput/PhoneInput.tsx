import { useState } from 'react';
import type { Key } from 'react-aria-components';
import { Input } from '../Input/Input';
import { InputGroup } from '../InputGroup/InputGroup';
import { ListBoxItem } from '../ListBox/ListBoxItem';
import { Select } from '../Select/Select';

export interface PhoneInputProps {
  /** Controlled number: digits only, up to 10 (US). Shown as (000) 000 - 0000. */
  value?: string;
  defaultValue?: string;
  /** Called with the digits only. */
  onChange?: (digits: string) => void;
  /** Controlled number type, one of `types`. */
  type?: string;
  defaultType?: string;
  onTypeChange?: (type: string) => void;
  /** Number types for the Select. */
  types?: string[];
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  /** Names the group for screen readers. Default "Phone number". */
  'aria-label'?: string;
  className?: string;
}

const DEFAULT_TYPES = ['Mobile', 'Home', 'Work', 'Other'];

/** Digits → "(000) 000 - 0000" as far as they go. */
export function formatPhone(digits: string) {
  const d = digits.replace(/\D/g, '').slice(0, 10);
  if (d.length === 0) return '';
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)} - ${d.slice(6)}`;
}

/** Phone number with its type (Mobile, Home, Work…): Input and Select joined as an InputGroup. */
export function PhoneInput({
  value,
  defaultValue = '',
  onChange,
  type,
  defaultType,
  onTypeChange,
  types = DEFAULT_TYPES,
  isDisabled,
  isReadOnly,
  isInvalid,
  className,
  'aria-label': ariaLabel = 'Phone number',
}: PhoneInputProps) {
  const [innerDigits, setInnerDigits] = useState(() => defaultValue.replace(/\D/g, '').slice(0, 10));
  const [innerType, setInnerType] = useState(() => defaultType ?? types[0]);
  const digits = value ?? innerDigits;
  const currentType = type ?? innerType;

  return (
    <InputGroup aria-label={ariaLabel} className={className}>
      <Input
        variant="inline"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        aria-label="Number"
        placeholder="(000) 000 - 0000"
        value={formatPhone(digits)}
        onChange={(text) => {
          const next = text.replace(/\D/g, '').slice(0, 10);
          if (value === undefined) setInnerDigits(next);
          onChange?.(next);
        }}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isInvalid={isInvalid}
      />
      <Select
        variant="inline"
        aria-label="Number type"
        value={currentType}
        onChange={(key: Key | null) => {
          if (key == null) return;
          const next = String(key);
          if (type === undefined) setInnerType(next);
          onTypeChange?.(next);
        }}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
      >
        {types.map((t) => (
          <ListBoxItem key={t} id={t}>
            {t}
          </ListBoxItem>
        ))}
      </Select>
    </InputGroup>
  );
}
