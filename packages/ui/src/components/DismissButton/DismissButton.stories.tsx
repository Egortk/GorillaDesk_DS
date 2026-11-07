import type { Meta, StoryObj } from '@storybook/react-vite';
import { Force, Matrix } from '../../docs/helpers';
import { DismissButton } from './DismissButton';

const meta = {
  title: 'Components/DismissButton',
  component: DismissButton,
  args: { shape: 'square', size: 'sm', 'aria-label': 'Close', isDisabled: false },
} satisfies Meta<typeof DismissButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const STATES = ['default', 'hover', 'active', 'focused', 'disabled'] as const;

export const States: Story = {
  render: () => (
    <Matrix
      rows={['square / sm', 'square / xs', 'circle / sm', 'circle / xs'] as const}
      cols={STATES}
      render={(row, state) => {
        const [shape, size] = row.split(' / ') as ['square' | 'circle', 'sm' | 'xs'];
        return (
          <Force state={state === 'disabled' ? 'default' : state}>
            <DismissButton shape={shape} size={size} aria-label="Close" isDisabled={state === 'disabled'} />
          </Force>
        );
      }}
    />
  ),
};
