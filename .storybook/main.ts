import type {StorybookConfig} from '@storybook/nextjs';

const path = require('path');


const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config, {configType}) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/src': path.resolve(__dirname, '../src'),
    };
    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;

