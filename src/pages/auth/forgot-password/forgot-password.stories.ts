import type { Meta, StoryObj } from '@storybook/react'

import PasswordRecovery from '@/src/pages/auth/forgot-password/index'

const meta: Meta<typeof PasswordRecovery> = {
  title: 'pages/PasswordRecovery',
  component: PasswordRecovery,
}

export default meta

type Story = StoryObj<typeof PasswordRecovery>

export const Primary: Story = {
  args: {
    primary: true,
  },
}

export const Secondary: Story = {
  args: {
    primary: false,
  },
}
