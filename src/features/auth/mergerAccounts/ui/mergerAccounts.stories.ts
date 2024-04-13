import type { StoryObj } from '@storybook/react'

import { MergerAccounts } from '@/features/auth/mergerAccounts/ui/MergerAccounts'

const meta = {
  component: MergerAccounts,
  title: 'pages/MergerAccounts',
}

export default meta
type Story = StoryObj<typeof MergerAccounts>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
