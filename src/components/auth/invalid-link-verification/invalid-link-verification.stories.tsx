import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import { InvalidLinkVerificationPage } from '@/src/components/auth/invalid-link-verification/invalid-link-verification-page'
import { store } from '@/src/services'

const meta = {
  title: 'pages/InvalidLinkVerification',
  component: InvalidLinkVerificationPage,
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
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=335-6767&mode=design&t=YRhdR3HjVBVklJmy-0',
    },
  },
} satisfies Meta<typeof InvalidLinkVerificationPage>

export default meta
type Story = StoryObj<typeof InvalidLinkVerificationPage>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
