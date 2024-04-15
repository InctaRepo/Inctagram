import type { Preview } from '@storybook/react'
import '@/src/styles/_globals.scss'

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'ru', right: 'ru', title: 'Russian' },
        ],
      },
    },
  },
  parameters: {
    docs: {
      inlineStories: false,
    },
    // actions: { argTypesRegex: '^on.*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'black',
      values: [
        { name: 'black', value: 'black' },
        { name: 'facebook', value: '#3b5998' },
      ],
    },
  },
}

export default preview
