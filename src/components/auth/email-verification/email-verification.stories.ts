import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { EmailVerificationPage } from '@/src/components/auth/email-verification/email-verification-page'

const meta = {
  title: 'pages/EmailVerification',
  component: EmailVerificationPage,
} satisfies Meta<typeof EmailVerificationPage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
