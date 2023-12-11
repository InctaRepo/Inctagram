import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { Settings } from '@/src/features/profileSettings/settings/ui/Settings'
import { store } from '@/src/store'

const meta = {
  title: 'profile/ProfileSettings',
  component: Settings,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=306-7100&mode=design&t=OXOzeZ1p9FNf00IN-0',
    },
  },
} satisfies Meta<typeof Settings>

export default meta
type Story = StoryObj<typeof Settings>

export const Default: Story = {
  args: {},
}
