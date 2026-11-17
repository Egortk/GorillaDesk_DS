import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, DialogTrigger } from 'react-aria-components';
import { Button } from '../Button/Button';
import { ListBox } from '../ListBox/ListBox';
import { ListBoxItem } from '../ListBox/ListBoxItem';
import { Popover } from './Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The surface with a ListBox, as Select uses it. Popover has no padding of its own. */
export const WithListBox: Story = {
  render: () => (
    <DialogTrigger defaultOpen>
      <Button>Frequency</Button>
      <Popover placement="bottom start">
        <Dialog aria-label="Frequency" className="outline-none">
          <ListBox aria-label="Frequency" selectionMode="single" defaultSelectedKeys={['bi-weekly']} className="w-60">
            <ListBoxItem id="monthly">Monthly</ListBoxItem>
            <ListBoxItem id="bi-weekly">Bi-weekly</ListBoxItem>
            <ListBoxItem id="quarterly">Quarterly</ListBoxItem>
            <ListBoxItem id="once">One time</ListBoxItem>
          </ListBox>
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};
