import { Provider } from 'react-redux'

import { Recovery } from '@/features/auth/recovery'
import { store } from '@/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Recovery,
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
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=335-6767&mode=design&t=YRhdR3HjVBVklJmy-0',
    },
  },
  tags: ['autodocs'],
  title: 'pages/Recovery',
} satisfies Meta<typeof Recovery>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    recoveryMutation: () => {},
    type: 'email',
  },
}
