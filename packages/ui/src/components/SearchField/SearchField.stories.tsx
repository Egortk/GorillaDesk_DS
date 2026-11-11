import type { Meta, StoryObj } from '@storybook/react-vite';
import { Force, Matrix } from '../../docs/helpers';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  args: { 'aria-label': 'Search', placeholder: 'Search', variant: 'box', isDisabled: false },
  argTypes: { variant: { control: 'inline-radio', options: ['box', 'inline'] } },
  parameters: { controls: { include: ['placeholder', 'variant', 'isDisabled'] } },
  render: (args) => (
    <div className="w-60">
      <SearchField {...args} />
    </div>
  ),
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const STATES = ['default', 'hover', 'focused', 'disabled'] as const;
const COLS = ['box', 'box + value', 'inline', 'inline + value'] as const;

/** Every Figma variant (variant × state × filled). hover / focused are forced on the field. */
export const States: Story = {
  render: () => (
    <Matrix
      rows={STATES}
      cols={COLS}
      render={(state, col) => (
        <div className="w-60">
          <Force state={state === 'hover' || state === 'focused' ? state : 'default'} target="[role=group]">
            <SearchField
              aria-label={`${state} ${col}`}
              placeholder="Search"
              variant={col.startsWith('box') ? 'box' : 'inline'}
              defaultValue={col.endsWith('value') ? 'Value' : undefined}
              isDisabled={state === 'disabled'}
            />
          </Force>
        </div>
      )}
    />
  ),
};
