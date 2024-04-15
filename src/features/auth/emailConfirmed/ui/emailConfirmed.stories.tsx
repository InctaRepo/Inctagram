import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'

import { EmailConfirmed } from '@/features/auth/emailConfirmed/ui/EmailConfirmed'
import { store } from '@/store'

const meta = {
  component: EmailConfirmed,
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
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=303-3695&mode=design&t=tETCZWr8PNXPQquC-4',
    },
  },
  tags: ['autodocs'],
  title: 'pages/emailConfirmed',
} satisfies Meta<typeof EmailConfirmed>

export default meta
type Story = StoryObj<typeof EmailConfirmed>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const LoginFormStory: Story = {
  render: () => {
    return <EmailConfirmed />
  },
}
