import type { StoryObj } from '@storybook/react'

import MergerAccounts from '@/src/pages/auth/merger-accounts/index'

const meta = {
  title: 'pages/MergerAccounts',
  component: MergerAccounts,
}

export default meta
type Story = StoryObj<typeof MergerAccounts>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
