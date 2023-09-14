import type { StoryObj } from '@storybook/react'

import { InvalidLinkVerificationPage } from '@/src/components/auth/invalid-link-verification/invalid-link-verification-page'

const meta = {
  title: 'pages/InvalidLinkVerification',
  component: InvalidLinkVerificationPage,
}

export default meta
type Story = StoryObj<typeof InvalidLinkVerificationPage>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
