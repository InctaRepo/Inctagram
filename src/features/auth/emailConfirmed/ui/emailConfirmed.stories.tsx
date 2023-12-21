import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import { EmailConfirmed } from '../ui/EmailConfirmed'

import { store } from '@/src/store'

const meta = {
  title: 'pages/emailConfirmed',
  component: EmailConfirmed,
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
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=303-3695&mode=design&t=tETCZWr8PNXPQquC-4',
    },
  },
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
