import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'

import { PasswordRecovery } from '@/features/auth/passwordRecovery/ui/PasswordRecovery'
import { store } from '@/store'

const meta = {
  component: PasswordRecovery,
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
  title: 'pages/PasswordRecovery',
} satisfies Meta<typeof PasswordRecovery>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {},
}
