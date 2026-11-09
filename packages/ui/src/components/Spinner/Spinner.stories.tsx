import type { Meta, StoryObj } from '@storybook/react-vite';
import { Matrix } from '../../docs/helpers';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: { variant: 'neutral', size: 'sm' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <Matrix
      rows={['on-solid', 'on-subtle', 'neutral'] as const}
      cols={['sm', 'xs'] as const}
      render={(variant, size) => (
        <span className={variant === 'on-solid' ? 'inline-flex rounded-md bg-interactive-primary-solid-bg-default' : 'inline-flex'}>
          <Spinner variant={variant} size={size} />
        </span>
      )}
    />
  ),
};
