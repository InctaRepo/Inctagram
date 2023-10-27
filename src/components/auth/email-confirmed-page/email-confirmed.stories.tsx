import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import { EmailConfirmedPage } from '@/src/components/auth/email-confirmed-page/email-confirmed-page'
import { store } from '@/src/services'

const meta = {
  title: 'pages/emailConfirmed',
  component: EmailConfirmedPage,
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
} satisfies Meta<typeof EmailConfirmedPage>

export default meta
type Story = StoryObj<typeof EmailConfirmedPage>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const LoginFormStory: Story = {
  render: () => {
    return <EmailConfirmedPage />
  },
}
