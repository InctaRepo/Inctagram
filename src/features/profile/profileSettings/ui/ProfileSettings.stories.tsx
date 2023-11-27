import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from '@/src/store'
import { ProfileSettings } from './ProfileSettings'

const meta = {
  title: 'profile/ProfileSettings',
  component: ProfileSettings,
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
} satisfies Meta<typeof ProfileSettings>

export default meta
type Story = StoryObj<typeof ProfileSettings>

export const Default: Story = {
  args: {},
}
