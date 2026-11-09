import type { Meta, StoryObj } from '@storybook/react-vite';
import { SAMPLE, SizeMatrix, srcControl } from '../../docs/avatars';
import { AVATAR_SIZES } from './avatarBase';
import { BranchAvatar } from './BranchAvatar';

const meta = {
  title: 'Components/Avatar/BranchAvatar',
  component: BranchAvatar,
  args: { size: 'md', name: 'Natural Resources', src: 'image' },
  argTypes: { size: { control: 'select', options: AVATAR_SIZES }, src: srcControl(SAMPLE.branchLogo) },
} satisfies Meta<typeof BranchAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const CASES = { logo: SAMPLE.branchLogo, 'no logo': undefined, 'broken logo': SAMPLE.broken };

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <SizeMatrix
      rows={Object.keys(CASES) as (keyof typeof CASES)[]}
      render={(row, size) => <BranchAvatar size={size} name="Natural Resources" src={CASES[row]} />}
    />
  ),
};
