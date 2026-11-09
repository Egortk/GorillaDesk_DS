import type { Meta, StoryObj } from '@storybook/react-vite';
import { Force, iconControl, Matrix, PlusIcon } from '../../docs/helpers';
import { BUTTON_STATES as STATES, BUTTON_VARIANTS as VARIANTS } from '../Button/buttonStyles';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  // `icon` is a key of iconControl.mapping (not JSX): JSX in args turns into {} when Controls change it.
  args: { icon: 'plus', variant: 'default', size: 'md', 'aria-label': 'Add', isDisabled: false, isPending: false },
  argTypes: { variant: { control: 'select', options: VARIANTS }, icon: iconControl },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <Matrix
      rows={VARIANTS}
      cols={STATES.flatMap((s) => [`${s} / md`, `${s} / sm`])}
      render={(variant, col) => {
        const [state, size] = col.split(' / ') as [(typeof STATES)[number], 'md' | 'sm'];
        return (
          <Force state={state === 'disabled' || state === 'loading' ? 'default' : state}>
            <IconButton
              icon={<PlusIcon />}
              aria-label="Add"
              variant={variant}
              size={size}
              isDisabled={state === 'disabled'}
              isPending={state === 'loading'}
            />
          </Force>
        );
      }}
    />
  ),
};
