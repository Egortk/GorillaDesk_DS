import type { Meta, StoryObj } from '@storybook/react-vite';
import { SAMPLE } from '../../docs/avatars';
import { AccountIcon, Force, Matrix } from '../../docs/helpers';
import { UserAvatar } from '../Avatar/UserAvatar';
import { Badge } from '../Badge/Badge';
import { Tag } from '../Tag/Tag';
import { UserChip } from '../UserChip/UserChip';
import { ListBox } from './ListBox';
import { ListBoxItem } from './ListBoxItem';

const meta = {
  title: 'Components/ListBox',
  component: ListBox,
  args: { 'aria-label': 'Frequency', selectionMode: 'single', defaultSelectedKeys: ['bi-weekly'] },
  argTypes: { selectionMode: { control: 'inline-radio', options: ['single', 'multiple', 'none'] } },
  parameters: { controls: { include: ['selectionMode'] } },
  render: (args) => (
    <ListBox {...args} className="w-60">
      <ListBoxItem id="monthly">Monthly</ListBoxItem>
      <ListBoxItem id="bi-weekly">Bi-weekly</ListBoxItem>
      <ListBoxItem id="quarterly">Quarterly</ListBoxItem>
      <ListBoxItem id="once" isDisabled>
        One time
      </ListBoxItem>
    </ListBox>
  ),
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Multiple: Story = { args: { selectionMode: 'multiple', defaultSelectedKeys: ['monthly', 'quarterly'] } };

const STATES = ['default', 'hover', 'active', 'disabled'] as const;
const COLS = ['single', 'single selected', 'multiple', 'multiple selected'] as const;

/** ListBoxItem: every Figma variant (state × selected × selectionMode). hover / active are forced. */
export const ItemStates: Story = {
  render: () => (
    <Matrix
      rows={STATES}
      cols={COLS}
      render={(state, col) => (
        <Force state={state === 'hover' || state === 'active' ? state : 'default'} target="[role=option]">
          <ListBox
            aria-label={`${state} ${col}`}
            className="w-60"
            selectionMode={col.startsWith('single') ? 'single' : 'multiple'}
            defaultSelectedKeys={col.endsWith('selected') ? ['a'] : []}
            disabledKeys={state === 'disabled' ? ['a'] : []}
          >
            <ListBoxItem id="a" leading={<AccountIcon />} badge={<Badge intent="neutral">16</Badge>}>
              Label
            </ListBoxItem>
          </ListBox>
        </Force>
      )}
    />
  ),
};

/** Figma `_list-label` content (text, tag, userChip), leading icon or avatar, description, badge, long label. */
export const Content: Story = {
  render: () => (
    <ListBox aria-label="Content" selectionMode="multiple" className="w-72">
      <ListBoxItem id="text">Label only</ListBoxItem>
      <ListBoxItem id="desc" description="Every second week on the same weekday">
        With description
      </ListBoxItem>
      <ListBoxItem id="icon" leading={<AccountIcon />}>
        Leading icon
      </ListBoxItem>
      <ListBoxItem id="avatar" leading={<UserAvatar size="sm" name="Rebecca Moore" src={SAMPLE.rebecca} />} textValue="Rebecca Moore">
        Rebecca Moore
      </ListBoxItem>
      <ListBoxItem id="tag" textValue="Termite">
        <Tag size="sm">Termite</Tag>
      </ListBoxItem>
      <ListBoxItem id="chip" textValue="Zane Cooper">
        <UserChip avatarSrc={SAMPLE.zane}>Zane Cooper</UserChip>
      </ListBoxItem>
      <ListBoxItem id="badge" badge={<Badge intent="neutral">16</Badge>}>
        With badge
      </ListBoxItem>
      <ListBoxItem id="long">A very long option label that does not fit on one line and truncates</ListBoxItem>
    </ListBox>
  ),
};
