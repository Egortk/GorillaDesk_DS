import type { Meta, StoryObj } from '@storybook/react-vite';
import { Force, iconControl, Matrix, MoreVerticalIcon, PlusIcon } from '../../docs/helpers';
import { Button, type ButtonSize } from './Button';
import { BUTTON_STATES as STATES, BUTTON_VARIANTS as VARIANTS } from './buttonStyles';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { variant: 'default', size: 'md', children: 'Button', isDisabled: false, isPending: false },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    startIcon: iconControl,
    endIcon: iconControl,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function StateMatrix({ size }: { size: ButtonSize }) {
  return (
    <Matrix
      rows={VARIANTS}
      cols={STATES}
      render={(variant, state) => (
        <Force state={state === 'disabled' || state === 'loading' ? 'default' : state}>
          <Button
            variant={variant}
            size={size}
            startIcon={<PlusIcon />}
            endIcon={<MoreVerticalIcon />}
            isDisabled={state === 'disabled'}
            isPending={state === 'loading'}
          >
            Button
          </Button>
        </Force>
      )}
    />
  );
}

export const StatesMd: Story = { name: 'States / md', render: () => <StateMatrix size="md" /> };
export const StatesSm: Story = { name: 'States / sm', render: () => <StateMatrix size="sm" /> };
