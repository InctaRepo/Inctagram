import type { StoryObj } from '@storybook/react'

import { MergerAccountsPage } from '@/src/components/auth/merger-accounts/merger-accounts-page'

const meta = {
  title: 'pages/MergerAccounts',
  component: MergerAccountsPage,
}

export default meta
type Story = StoryObj<typeof MergerAccountsPage>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
