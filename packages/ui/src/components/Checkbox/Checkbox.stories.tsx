import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Force, Matrix } from '../../docs/helpers';
import { CheckboxGroup } from '../CheckboxGroup/CheckboxGroup';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    children: 'Label',
    description: 'Description',
    errorMessage: 'Error message',
    isIndeterminate: false,
    isDisabled: false,
    isReadOnly: false,
    isInvalid: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const STATES = ['default', 'hover', 'active', 'focused', 'disabled', 'read-only', 'invalid', 'invalid-hover', 'invalid-focused'] as const;
const VALUES = ['unchecked', 'checked', 'indeterminate'] as const;

/** Every Figma variant: state × value. hover / active / focused are forced with data attributes. */
export const States: Story = {
  render: () => (
    <Matrix
      rows={STATES}
      cols={VALUES}
      render={(state, value) => {
        const invalid = state.startsWith('invalid');
        const forced = state === 'hover' || state === 'invalid-hover' ? 'hover' : state === 'active' ? 'active' : state.endsWith('focused') ? 'focused' : 'default';
        return (
          <Force state={forced}>
            <Checkbox
              isSelected={value === 'checked'}
              isIndeterminate={value === 'indeterminate'}
              isDisabled={state === 'disabled'}
              isReadOnly={state === 'read-only'}
              isInvalid={invalid}
              errorMessage={invalid ? 'Error message' : undefined}
              description="Description"
            >
              Label
            </Checkbox>
          </Force>
        );
      }}
    />
  ),
};

/** Figma hasLabel / hasDescription / hasError. Without a label the checkbox needs aria-label. */
export const Content: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-(--space-xl)">
      <Checkbox aria-label="Select row" />
      <Checkbox>Label only</Checkbox>
      <Checkbox description="Text messages to the customer's phone">Label and description</Checkbox>
      <Checkbox isInvalid description="Description" errorMessage="Accept the terms to continue">
        With error
      </Checkbox>
    </div>
  ),
};

/** Select all: indeterminate while some rows are checked; clicking it checks all. */
export const SelectAll: Story = {
  render: function Render() {
    const all = ['Monday', 'Wednesday', 'Friday'];
    const [days, setDays] = useState<string[]>(['Monday']);
    return (
      <div className="flex flex-col items-start gap-(--space-md)">
        <Checkbox
          isSelected={days.length === all.length}
          isIndeterminate={days.length > 0 && days.length < all.length}
          onChange={(on) => setDays(on ? all : [])}
        >
          All days
        </Checkbox>
        <CheckboxGroup aria-label="Service days" value={days} onChange={setDays} className="ps-(--space-xl)">
          {all.map((d) => (
            <Checkbox key={d} value={d}>
              {d}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    );
  },
};
