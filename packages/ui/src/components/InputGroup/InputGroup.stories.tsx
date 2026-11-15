import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddressInput } from '../AddressInput/AddressInput';
import { Input } from '../Input/Input';
import { ListBoxItem } from '../ListBox/ListBoxItem';
import { PhoneInput } from '../PhoneInput/PhoneInput';
import { Select } from '../Select/Select';
import { InputGroup } from './InputGroup';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  parameters: { layout: 'padded' },
  args: { children: null },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma Group Input: three inline fields with shared borders, outer corners only. */
export const Playground: Story = {
  render: () => (
    <div className="w-80">
      <InputGroup aria-label="Name">
        <Input variant="inline" aria-label="First name" placeholder="Placeholder" />
        <Input variant="inline" aria-label="Middle name" placeholder="Placeholder" />
        <Input variant="inline" aria-label="Last name" placeholder="Placeholder" />
      </InputGroup>
    </div>
  ),
};

/** An invalid item and an item with a Select: the invalid one sits above its neighbours. */
export const Mixed: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-(--space-xl)">
      <InputGroup aria-label="Amount">
        <Input variant="inline" aria-label="Amount" defaultValue="12,5" isInvalid />
        <Select variant="inline" aria-label="Currency" defaultValue="usd">
          <ListBoxItem id="usd">USD</ListBoxItem>
          <ListBoxItem id="eur">EUR</ListBoxItem>
        </Select>
      </InputGroup>
      <InputGroup aria-label="Price">
        <Select variant="inline" aria-label="Currency" defaultValue="usd">
          <ListBoxItem id="usd">USD</ListBoxItem>
          <ListBoxItem id="eur">EUR</ListBoxItem>
        </Select>
        <Input variant="inline" aria-label="Price" defaultValue="120" />
      </InputGroup>
    </div>
  ),
};

/** Figma Address. */
export const Address: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-(--space-xl)">
      <AddressInput />
      <AddressInput defaultValue={{ street1: '1200 Main St', city: 'Austin', state: 'TX', zip: '7870' }} invalidFields={['zip']} />
    </div>
  ),
};

/** Figma Phone Number. */
export const Phone: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-(--space-xl)">
      <PhoneInput />
      <PhoneInput defaultValue="5125550147" defaultType="Work" />
    </div>
  ),
};
