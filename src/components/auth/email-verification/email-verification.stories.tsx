import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { EmailVerificationPage } from '@/src/components/auth/email-verification/email-verification-page'

const meta = {
  title: 'pages/EmailVerification',
  component: EmailVerificationPage,

  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=335-6767&mode=design&t=YRhdR3HjVBVklJmy-0',
    },
  },
} satisfies Meta<typeof EmailVerificationPage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
