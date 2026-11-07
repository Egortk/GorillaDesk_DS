import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import './preview.css';

const preview: Preview = {
  decorators: [
    // Theming is data-theme only, never prefers-color-scheme (CLAUDE.md rule 6).
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    controls: { expanded: true },
    a11y: { test: 'error' },
  },
};

export default preview;
