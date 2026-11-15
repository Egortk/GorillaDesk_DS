import type { Meta, StoryObj } from '@storybook/react-vite';
import { Force, Matrix } from '../../docs/helpers';
import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  args: { 'aria-label': 'Note', placeholder: 'Placeholder', variant: 'box', rows: 6, isDisabled: false, isReadOnly: false, isInvalid: false },
  argTypes: { variant: { control: 'inline-radio', options: ['box', 'inline'] } },
  parameters: { controls: { include: ['placeholder', 'variant', 'rows', 'isDisabled', 'isReadOnly', 'isInvalid'] } },
  decorators: [(Story) => <div className="w-60">{Story()}</div>],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const STATES = ['default', 'hover', 'focused', 'disabled', 'readonly', 'invalid', 'invalid-hover', 'invalid-focused'] as const;
const COLS = ['box', 'box + value', 'inline', 'inline + value'] as const;

/** Every Figma variant (state × filled × variant). hover / focused are forced on the field. */
export const States: Story = {
  decorators: [(Story) => Story()],
  render: () => (
    <Matrix
      rows={STATES}
      cols={COLS}
      render={(state, col) => (
        <div className="w-60">
          <Force state={state.endsWith('hover') ? 'hover' : state.endsWith('focused') ? 'focused' : 'default'} target=".group">
            <TextArea
              aria-label={`${state} ${col}`}
              placeholder="Placeholder"
              variant={col.startsWith('box') ? 'box' : 'inline'}
              defaultValue={col.endsWith('value') ? 'Value' : undefined}
              isDisabled={state === 'disabled'}
              isReadOnly={state === 'readonly'}
              isInvalid={state.startsWith('invalid')}
            />
          </Force>
        </div>
      )}
    />
  ),
};

/** Long text wraps; the box variant can be resized vertically. */
export const LongText: Story = {
  args: {
    defaultValue:
      'Customer asked to call 30 minutes before arrival. Gate code is 4512. Dog in the back yard: friendly, but keep the gate closed. Treat the garage and the shed as well.',
  },
};
