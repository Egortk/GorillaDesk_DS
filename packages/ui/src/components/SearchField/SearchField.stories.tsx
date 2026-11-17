import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete, Dialog, DialogTrigger, useFilter } from 'react-aria-components';
import { Force, Matrix } from '../../docs/helpers';
import { Button } from '../Button/Button';
import { ListBox } from '../ListBox/ListBox';
import { ListBoxItem } from '../ListBox/ListBoxItem';
import { Popover } from '../Popover/Popover';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  args: { 'aria-label': 'Search', placeholder: 'Search', variant: 'box', isDisabled: false },
  argTypes: { variant: { control: 'inline-radio', options: ['box', 'inline', 'embedded'] } },
  parameters: { controls: { include: ['placeholder', 'variant', 'isDisabled'] } },
  render: (args) => (
    <div className="w-60">
      <SearchField {...args} />
    </div>
  ),
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const STATES = ['default', 'hover', 'focused', 'disabled'] as const;
const COLS = ['box', 'box + value', 'inline', 'inline + value', 'embedded', 'embedded + value'] as const;

/** Every Figma variant (variant × state × filled). hover / focused are forced on the field. */
export const States: Story = {
  render: () => (
    <Matrix
      rows={STATES}
      cols={COLS}
      render={(state, col) => (
        <div className="w-60">
          <Force state={state === 'hover' || state === 'focused' ? state : 'default'} target="[role=group]">
            <SearchField
              aria-label={`${state} ${col}`}
              placeholder="Search"
              variant={col.split(' ')[0] as 'box' | 'inline' | 'embedded'}
              defaultValue={col.endsWith('value') ? 'Value' : undefined}
              isDisabled={state === 'disabled'}
            />
          </Force>
        </div>
      )}
    />
  ),
};

const FREQUENCY = ['Monthly', 'Bi-weekly', 'Quarterly', 'One time'].map((name) => ({ id: name.toLowerCase(), name }));

function MenuWithSearch() {
  const { contains } = useFilter({ sensitivity: 'base' });
  return (
    <DialogTrigger defaultOpen>
      <Button>Frequency</Button>
      <Popover placement="bottom start">
        <Dialog aria-label="Frequency" className="w-60 outline-none">
          <Autocomplete filter={contains}>
            <SearchField aria-label="Search frequency" placeholder="Search" variant="embedded" autoFocus />
            <ListBox aria-label="Frequency" items={FREQUENCY} selectionMode="single" defaultSelectedKeys={['bi-weekly']}>
              {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
            </ListBox>
          </Autocomplete>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

/** variant=embedded at the top of a Popover, filtering the list below (React Aria Autocomplete). Figma: Popover example "menu with search". */
export const InMenu: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="h-72">
      <MenuWithSearch />
    </div>
  ),
};
