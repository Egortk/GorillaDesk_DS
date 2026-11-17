import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SAMPLE, srcControl } from '../../docs/avatars';
import { Force, Matrix } from '../../docs/helpers';
import { Lozenge } from '../Lozenge/Lozenge';
import { UserChip, type UserChipKind, type UserChipSize } from './UserChip';

// `lozenge` is a key of this mapping (not JSX): JSX in args turns into {} when Controls change it.
const lozengeControl = {
  control: 'select' as const,
  options: ['none', 'warning', 'success'],
  mapping: {
    none: undefined,
    warning: (
      <Lozenge intent="warning" emphasis="solid">
        Lozenge
      </Lozenge>
    ),
    success: <Lozenge intent="success">Active</Lozenge>,
  },
};

const meta = {
  title: 'Components/UserChip',
  component: UserChip,
  args: { kind: 'pill', size: 'sm', children: 'User Name', onRemove: fn() },
  argTypes: { avatarSrc: srcControl(SAMPLE.rebecca), lozenge: lozengeControl },
} satisfies Meta<typeof UserChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma default: pill, sm, removable, with lozenge. */
export const Playground: Story = { args: { avatarSrc: 'image', lozenge: 'warning' } };

const KINDS = ['pill', 'plain'] as const satisfies readonly UserChipKind[];
const SIZES = ['sm', 'xs'] as const satisfies readonly UserChipSize[];
const CASES = ['name only', 'removable', 'lozenge', 'lozenge + removable', 'no photo'] as const;

/** Every Figma variant (kind × size) with each slot combination. xs ignores the lozenge. */
export const Variants: Story = {
  render: () => (
    <Matrix
      rows={KINDS.flatMap((k) => SIZES.map((s) => `${k} / ${s}` as const))}
      cols={CASES}
      render={(row, c) => {
        const [kind, size] = row.split(' / ') as [UserChipKind, UserChipSize];
        return (
          <UserChip
            kind={kind}
            size={size}
            avatarSrc={c === 'no photo' ? undefined : SAMPLE.rebecca}
            lozenge={c.includes('lozenge') ? <Lozenge intent="warning" emphasis="solid">Lozenge</Lozenge> : undefined}
            onRemove={c.includes('removable') || c === 'no photo' ? () => {} : undefined}
          >
            Rebecca Moore
          </UserChip>
        );
      }}
    />
  ),
};

/** The chip has no states of its own; only the dismiss button reacts. */
export const DismissStates: Story = {
  render: () => (
    <Matrix
      rows={SIZES}
      cols={['default', 'hover', 'active', 'focused'] as const}
      render={(size, state) => (
        <Force state={state} target="button">
          <UserChip size={size} avatarSrc={SAMPLE.zane} onRemove={() => {}}>
            Zane Cooper
          </UserChip>
        </Force>
      )}
    />
  ),
};

/** A long name truncates with an ellipsis in a narrow container; the full name is in the tooltip. */
export const Truncation: Story = {
  render: () => (
    <div className="flex w-56 flex-col items-start gap-(--space-md) border border-dashed border-environment-border-default p-(--space-md)">
      {SIZES.map((size) =>
        KINDS.map((kind) => (
          <UserChip key={kind + size} kind={kind} size={size} avatarSrc={SAMPLE.rebecca} lozenge={<Lozenge>Lead</Lozenge>} onRemove={() => {}}>
            Rebecca Alexandra Montgomery-Whitfield
          </UserChip>
        )),
      )}
    </div>
  ),
};
