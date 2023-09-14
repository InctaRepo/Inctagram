import type { StoryObj } from '@storybook/react'

import { EmailConfirmedPage } from '@/src/components/auth/email-confirmed-page/email-confirmed-page'

const meta = {
  title: 'pages/emailConfirmed',
  component: EmailConfirmedPage,
}

export default meta
type Story = StoryObj<typeof EmailConfirmedPage>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
