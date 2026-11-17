import type { Meta, StoryObj } from '@storybook/react-vite';
import { Matrix } from '../../docs/helpers';
import { Checkbox } from '../Checkbox/Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  args: { 'aria-label': 'Notify by', defaultValue: ['email'], errorMessage: 'Pick at least one channel', isInvalid: false, isDisabled: false, isReadOnly: false, children: null },
  parameters: { controls: { include: ['aria-label', 'errorMessage', 'isInvalid', 'isDisabled', 'isReadOnly'] } },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox value="sms" description="Text messages to the customer's phone">
        SMS
      </Checkbox>
      <Checkbox value="email">Email</Checkbox>
      <Checkbox value="push">Push notification</Checkbox>
    </CheckboxGroup>
  ),
} satisfies Meta<typeof CheckboxGroup>;

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
        <CheckboxGroup
          aria-label={`Notify by (${state})`}
          defaultValue={['email']}
          isInvalid={state === 'invalid'}
          isDisabled={state === 'disabled'}
          isReadOnly={state === 'read-only'}
          errorMessage="Pick at least one channel"
        >
          <Checkbox value="sms">SMS</Checkbox>
          <Checkbox value="email">Email</Checkbox>
          <Checkbox value="push">Push notification</Checkbox>
        </CheckboxGroup>
      )}
    />
  ),
};
