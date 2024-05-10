import type { StorybookConfig } from '@storybook/nextjs'
import * as path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-designs',
    '@chromatic-com/storybook',
  ],
  //    previewHead: head => `
  //    ${head}
  //    <style>
  //      html, body {
  //        background: #827979;
  //        width: 100vh;
  //      }
  //    </style>
  // `,
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async config => {
    config.resolve!.alias = {
      ...config.resolve?.alias,
      '@/src': path.resolve(__dirname, '../src'),
      // '@/public': path.resolve(__dirname, '../public'),
      // '@/ui': path.resolve(__dirname, '../src/shared/ui'),
    }
    const imageRule = config.module?.rules?.find(rule => {
      const test = (rule as { test: RegExp }).test

      if (!test) {
        return false
      }

      return test.test('.svg')
    }) as { [key: string]: any }

    imageRule.exclude = /\.svg$/

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
