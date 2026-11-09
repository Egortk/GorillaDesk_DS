import type { Meta, StoryObj } from '@storybook/react-vite';
import { Matrix } from '../../docs/helpers';
import { SAMPLE } from '../../docs/avatars';
import { BranchAvatar } from '../Avatar/BranchAvatar';
import { CustomerAvatar } from '../Avatar/CustomerAvatar';
import { UserAvatar } from '../Avatar/UserAvatar';
import { AVATAR_SIZES } from '../Avatar/avatarBase';
import { AvatarGroup } from './AvatarGroup';

const TEAM = [
  <UserAvatar key="1" name="Rebecca Moreschi" src={SAMPLE.rebecca} />,
  <UserAvatar key="2" name="Zane Cooper" src={SAMPLE.zane} />,
  <UserAvatar key="3" name="Chris Moreschi" />,
  <UserAvatar key="4" name="Ann Lee" src={SAMPLE.rebecca} />,
  <UserAvatar key="5" name="Tom Fox" src={SAMPLE.zane} />,
  <UserAvatar key="6" name="Ivan Petrenko" />,
  ...Array.from({ length: 16 }, (_, i) => <UserAvatar key={`more-${i}`} name={`Technician ${i + 1}`} />),
];

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  args: { size: 'md', max: 6, background: 'default', 'aria-label': 'Assignees', children: TEAM },
  argTypes: {
    size: { control: 'select', options: AVATAR_SIZES },
    background: { control: 'inline-radio', options: ['default', 'canvas'] },
    children: { control: false },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** As in Figma: six avatars and a "+16" counter (size xs shows "16"). */
export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <Matrix
      rows={AVATAR_SIZES}
      cols={['group'] as const}
      render={(size) => (
        <AvatarGroup size={size} max={6} aria-label="Assignees">
          {TEAM}
        </AvatarGroup>
      )}
    />
  ),
};

/** `background="canvas"` matches the ring to environment/surface/canvas. */
export const OnCanvas: Story = {
  name: 'On canvas background',
  render: () => (
    <div className="bg-environment-surface-canvas p-(--space-section-sm)">
      <AvatarGroup max={3} background="canvas" aria-label="Assignees">
        {TEAM.slice(0, 6)}
      </AvatarGroup>
    </div>
  ),
};

/** Avatars of one kind per group in practice; mixed here to show every kind takes the group size and ring. */
export const Kinds: Story = {
  render: () => (
    <AvatarGroup size="lg" aria-label="People">
      <CustomerAvatar name="Olena Koval" />
      <UserAvatar name="Rebecca Moreschi" src={SAMPLE.rebecca} />
      <BranchAvatar name="Natural Resources" src={SAMPLE.branchLogo} />
      <BranchAvatar name="Lviv Branch" />
    </AvatarGroup>
  ),
};
