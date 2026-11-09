import type { Meta, StoryObj } from '@storybook/react-vite';
import { SAMPLE, SizeMatrix, srcControl } from '../../docs/avatars';
import { AVATAR_SIZES } from './avatarBase';
import { UserAvatar } from './UserAvatar';

const meta = {
  title: 'Components/Avatar/UserAvatar',
  component: UserAvatar,
  args: { size: 'md', name: 'Rebecca Moreschi', src: 'image' },
  argTypes: { size: { control: 'select', options: AVATAR_SIZES }, src: srcControl(SAMPLE.rebecca) },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const CASES = { photo: SAMPLE.rebecca, 'no photo': undefined, 'broken photo': SAMPLE.broken };

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <SizeMatrix
      rows={Object.keys(CASES) as (keyof typeof CASES)[]}
      render={(row, size) => <UserAvatar size={size} name="Rebecca Moreschi" src={CASES[row]} />}
    />
  ),
};
