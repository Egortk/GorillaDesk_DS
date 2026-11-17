import type { Meta, StoryObj } from '@storybook/react-vite';
import { Matrix } from '../../docs/helpers';
import { Radio } from '../Radio/Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: { 'aria-label': 'Visit frequency', defaultValue: 'monthly', errorMessage: 'Pick a frequency', isInvalid: false, isDisabled: false, isReadOnly: false, children: null },
  parameters: { controls: { include: ['aria-label', 'errorMessage', 'isInvalid', 'isDisabled', 'isReadOnly'] } },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="weekly">Weekly</Radio>
      <Radio value="monthly" description="Most customers pick this">
        Monthly
      </Radio>
      <Radio value="quarterly">Quarterly</Radio>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Group states apply to every item; the group shows one error under the list. */
export const States: Story = {
  render: () => (
    <Matrix
      rows={['default', 'invalid', 'disabled', 'read-only'] as const}
      cols={['group'] as const}
      render={(state) => (
        <RadioGroup
          aria-label={`Visit frequency (${state})`}
          defaultValue="monthly"
          isInvalid={state === 'invalid'}
          isDisabled={state === 'disabled'}
          isReadOnly={state === 'read-only'}
          errorMessage="Pick a frequency"
        >
          <Radio value="weekly">Weekly</Radio>
          <Radio value="monthly">Monthly</Radio>
          <Radio value="quarterly">Quarterly</Radio>
        </RadioGroup>
      )}
    />
  ),
};
