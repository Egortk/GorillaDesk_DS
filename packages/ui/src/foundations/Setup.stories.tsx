import type { Meta, StoryObj } from '@storybook/react-vite';

// Smoke test for the toolchain: Tailwind v4 + token classes + data-theme switching.
// Not a component. Delete once real components have stories.
function SetupCheck() {
  return (
    <div className="flex flex-col gap-(--space-md) rounded-md bg-environment-surface-raised p-(--space-xl) shadow-container">
      <p className="text-body-lg text-content-neutral-text-strong">Storybook is wired up</p>
      <p className="text-body-md text-content-neutral-text-default">
        React + TypeScript + Vite, Tailwind v4, GorillaDesk tokens. Switch the theme in the toolbar.
      </p>
    </div>
  );
}

const meta = {
  title: 'Foundations/Setup check',
  component: SetupCheck,
} satisfies Meta<typeof SetupCheck>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
