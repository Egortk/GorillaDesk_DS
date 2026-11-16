import type { Meta, StoryObj } from '@storybook/react-vite';
import { Force, Matrix } from '../../docs/helpers';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: { value: 'option', children: 'Label', description: 'Description', errorMessage: 'Error message', isDisabled: false },
  parameters: { controls: { include: ['children', 'description', 'errorMessage', 'isDisabled'] } },
  // A Radio only works inside a RadioGroup.
  render: (args) => (
    <RadioGroup aria-label="Playground">
      <Radio {...args} />
    </RadioGroup>
  ),
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const STATES = ['default', 'hover', 'active', 'focused', 'disabled', 'read-only', 'invalid', 'invalid-hover', 'invalid-focused'] as const;
const VALUES = ['unchecked', 'checked'] as const;

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
          <RadioGroup
            aria-label={`${state} ${value}`}
            value={value === 'checked' ? 'a' : null}
            isDisabled={state === 'disabled'}
            isReadOnly={state === 'read-only'}
            isInvalid={invalid}
          >
            <Force state={forced}>
              <Radio value="a" description="Description" errorMessage={invalid ? 'Error message' : undefined}>
                Label
              </Radio>
            </Force>
          </RadioGroup>
        );
      }}
    />
  ),
};

/** Figma hasLabel / hasDescription / hasError. Without a label the radio needs aria-label. */
export const Content: Story = {
  render: () => (
    <RadioGroup aria-label="Content" defaultValue="b" isInvalid>
      <Radio value="a" aria-label="No label" />
      <Radio value="b">Label only</Radio>
      <Radio value="c" description="Billed once a year">
        Label and description
      </Radio>
      <Radio value="d" description="Description" errorMessage="Pick another plan">
        With error
      </Radio>
    </RadioGroup>
  ),
};
