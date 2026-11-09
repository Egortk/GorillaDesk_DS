import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountIcon, Force, iconControl, Matrix } from '../../docs/helpers';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { variant: 'box', placeholder: 'Placeholder', 'aria-label': 'Field', isDisabled: false, isReadOnly: false, isInvalid: false },
  argTypes: { icon: iconControl },
  decorators: [(Story) => <div className="w-60">{Story()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const STATES = ['default', 'hover', 'focused', 'disabled', 'readonly', 'invalid', 'invalid-hover', 'invalid-focused'] as const;

function States({ variant }: { variant: 'box' | 'inline' }) {
  return (
    <Matrix
      rows={STATES}
      cols={['empty', 'filled', 'icon + addons'] as const}
      render={(state, col) => {
        const force = state.endsWith('hover') ? 'hover' : state.endsWith('focused') ? 'focused' : 'default';
        return (
          <div className="w-60">
            <Force state={force} target=".group">
              <Input
                aria-label={`${state} ${col}`}
                variant={variant}
                placeholder="Placeholder"
                defaultValue={col === 'empty' ? undefined : 'Value'}
                icon={col === 'icon + addons' ? <AccountIcon /> : undefined}
                startAddon={col === 'icon + addons' ? '$' : undefined}
                endAddon={col === 'icon + addons' ? 'USD' : undefined}
                isDisabled={state === 'disabled'}
                isReadOnly={state === 'readonly'}
                isInvalid={state.startsWith('invalid')}
              />
            </Force>
          </div>
        );
      }}
    />
  );
}

export const StatesBox: Story = { name: 'States / box', decorators: [(Story) => Story()], render: () => <States variant="box" /> };
export const StatesInline: Story = { name: 'States / inline', decorators: [(Story) => Story()], render: () => <States variant="inline" /> };
