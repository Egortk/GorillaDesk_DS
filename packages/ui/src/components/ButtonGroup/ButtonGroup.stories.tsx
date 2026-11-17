import type { Meta, StoryObj } from '@storybook/react-vite';
import { Force, Matrix, MoreVerticalIcon, PlusIcon } from '../../docs/helpers';
import { Button } from '../Button/Button';
import { BUTTON_VARIANTS, type ButtonSize, type ButtonVariant } from '../Button/buttonStyles';
import { IconButton } from '../IconButton/IconButton';
import { ButtonGroup } from './ButtonGroup';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  args: { 'aria-label': 'Calendar view', children: null },
  parameters: { controls: { include: ['aria-label'] } },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma default: three `kind=button` items with both icons. */
export const Playground: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      {['Day', 'Week', 'Month'].map((label) => (
        <Button key={label} startIcon={<PlusIcon />} endIcon={<MoreVerticalIcon />}>
          {label}
        </Button>
      ))}
    </ButtonGroup>
  ),
};

function Group({ variant = 'default', size = 'md' }: { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <ButtonGroup aria-label="Actions">
      <Button variant={variant} size={size}>
        Day
      </Button>
      <Button variant={variant} size={size}>
        Week
      </Button>
      <IconButton variant={variant} size={size} icon={<MoreVerticalIcon />} aria-label="More" />
    </ButtonGroup>
  );
}

/** `kind=button` and `kind=icon` items in one group, both sizes. */
export const Kinds: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-(--space-xl)">
      <Group size="md" />
      <Group size="sm" />
      <ButtonGroup aria-label="Text alignment">
        <IconButton icon={<PlusIcon />} aria-label="Add" />
        <IconButton icon={<MoreVerticalIcon />} aria-label="More" />
      </ButtonGroup>
    </div>
  ),
};

const STATES = ['default', 'hover', 'active', 'focused', 'disabled'] as const;

/** The middle item in each state: it rises above its neighbours so its whole border and focus ring show. */
export const States: Story = {
  render: () => (
    <Matrix
      rows={['md', 'sm'] as const}
      cols={STATES}
      render={(size, state) => (
        <Force state={state === 'disabled' ? 'default' : state} target="[role=group] > :nth-child(2)">
          <ButtonGroup aria-label="Calendar view">
            <Button size={size}>Day</Button>
            <Button size={size} isDisabled={state === 'disabled'}>
              Week
            </Button>
            <Button size={size}>Month</Button>
          </ButtonGroup>
        </Force>
      )}
    />
  ),
};

/** Every Button variant inside a group. */
export const Variants: Story = {
  render: () => <Matrix rows={BUTTON_VARIANTS} cols={['md'] as const} render={(variant) => <Group variant={variant} />} />,
};
