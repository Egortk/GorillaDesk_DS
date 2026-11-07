import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
  ],
  typescript: {
    // react-docgen (Babel). react-docgen-typescript needs the TypeScript JS API, which TypeScript 7 does not ship.
    reactDocgen: 'react-docgen',
  },
  viteFinal: (viteConfig) => {
    // vite.config.ts is a library build; Storybook builds an app.
    if (viteConfig.build) delete viteConfig.build.lib;
    return viteConfig;
  },
};

export default config;
