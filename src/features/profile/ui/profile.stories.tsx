import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'

import { Profile } from '@/features/profile'
import { store } from '@/store'

const meta = {
  component: Profile,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=306-7100&mode=design&t=OXOzeZ1p9FNf00IN-0',
    },
  },
  tags: ['autodocs'],
  title: 'pages/profile',
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof Profile>

export const Default: Story = {
  args: {},
}
