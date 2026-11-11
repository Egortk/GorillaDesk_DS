import type { Meta, StoryObj } from '@storybook/react-vite';
import { SAMPLE } from '../../docs/avatars';
import { AccountIcon, Force, Matrix } from '../../docs/helpers';
import { ListBoxItem } from '../ListBox/ListBoxItem';
import { UserChip } from '../UserChip/UserChip';
import { Select } from './Select';

const FREQUENCY = (
  <>
    <ListBoxItem id="monthly">Monthly</ListBoxItem>
    <ListBoxItem id="bi-weekly">Bi-weekly</ListBoxItem>
    <ListBoxItem id="quarterly">Quarterly</ListBoxItem>
    <ListBoxItem id="once">One time</ListBoxItem>
  </>
);

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { 'aria-label': 'Frequency', placeholder: 'Choose frequency', variant: 'box', isDisabled: false, isReadOnly: false, isInvalid: false, children: FREQUENCY },
  argTypes: { variant: { control: 'inline-radio', options: ['box', 'inline'] } },
  parameters: { controls: { include: ['placeholder', 'variant', 'isDisabled', 'isReadOnly', 'isInvalid'] } },
  render: (args) => (
    <div className="w-60">
      <Select {...args} />
    </div>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const STATES = ['default', 'hover', 'focused', 'disabled', 'readonly', 'invalid', 'invalid-hover', 'invalid-focused'] as const;
const COLS = ['box', 'box + value', 'inline', 'inline + value'] as const;

/** Every Figma state except open (see Open). hover / focused are forced on the trigger. */
export const States: Story = {
  render: () => (
    <Matrix
      rows={STATES}
      cols={COLS}
      render={(state, col) => {
        const forced = state.endsWith('hover') ? 'hover' : state.endsWith('focused') ? 'focused' : 'default';
        return (
          <div className="w-60">
            <Force state={forced} target="button">
              <Select
                aria-label={`${state} ${col}`}
                variant={col.startsWith('box') ? 'box' : 'inline'}
                placeholder="Choose frequency"
                defaultValue={col.endsWith('value') ? 'bi-weekly' : undefined}
                isDisabled={state === 'disabled'}
                isReadOnly={state === 'readonly'}
                isInvalid={state.startsWith('invalid')}
                icon={<AccountIcon />}
              >
                {FREQUENCY}
              </Select>
            </Force>
          </div>
        );
      }}
    />
  ),
};

/** Figma state=open: the field takes the focused look, the arrow points up, the list opens under it. */
export const Open: Story = {
  args: { defaultOpen: true, defaultValue: 'bi-weekly' },
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="h-64 w-60">
      <Select {...args} />
    </div>
  ),
};

const SERVICES = ['Termite', 'Rodents', 'Mosquito', 'Bed bugs', 'Ants', 'Wasps'].map((name) => ({ id: name.toLowerCase(), name }));

/** Several values in a box field: Tags wrap and the field grows. */
export const Multiple: Story = {
  render: () => (
    <div className="w-60">
      <Select aria-label="Services" selectionMode="multiple" placeholder="Choose services" items={SERVICES} defaultValue={['termite', 'rodents', 'mosquito', 'ants']}>
        {(s) => <ListBoxItem id={s.id}>{s.name}</ListBoxItem>}
      </Select>
    </div>
  ),
};

/** Several values in an inline field: one line, "+N" for the values that do not fit. */
export const MultipleInline: Story = {
  render: () => (
    <div className="flex flex-col gap-(--space-xl)">
      {(['tag', 'text'] as const).map((more) => (
        <div key={more} className="w-60">
          <Select
            aria-label={`Services (${more})`}
            variant="inline"
            moreKind={more}
            selectionMode="multiple"
            items={SERVICES}
            defaultValue={['termite', 'rodents', 'mosquito', 'ants']}
          >
            {(s) => <ListBoxItem id={s.id}>{s.name}</ListBoxItem>}
          </Select>
        </div>
      ))}
    </div>
  ),
};

const PEOPLE = [
  { id: 'rebecca', name: 'Rebecca Moore', photo: SAMPLE.rebecca },
  { id: 'zane', name: 'Zane Cooper', photo: SAMPLE.zane },
  { id: 'alex', name: 'Alex Kim', photo: undefined },
];

/** UserChip values (renderValue) with the pill counter. */
export const Users: Story = {
  render: () => (
    <div className="flex flex-col gap-(--space-xl)">
      {(['box', 'inline'] as const).map((variant) => (
        <div key={variant} className={variant === 'box' ? 'w-72' : 'w-56'}>
          <Select
            aria-label={`Technicians (${variant})`}
            variant={variant}
            selectionMode="multiple"
            moreKind="pill"
            items={PEOPLE}
            defaultValue={['rebecca', 'zane', 'alex']}
            renderValue={(o) => <UserChip avatarSrc={o.value?.photo}>{o.textValue}</UserChip>}
          >
            {(p) => (
              <ListBoxItem id={p.id} textValue={p.name}>
                <UserChip kind="plain" avatarSrc={p.photo}>
                  {p.name}
                </UserChip>
              </ListBoxItem>
            )}
          </Select>
        </div>
      ))}
    </div>
  ),
};
