import type { Meta, StoryObj } from '@storybook/react'

import { RecoveryForm } from '@/features/auth/recovery/ui/recoveryForm/RecoveryForm'

const meta: Meta<typeof RecoveryForm> = {
  title: 'Auth/PasswordRecoveryForm',
  component: RecoveryForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RecoveryForm>

export const Default: Story = {
  args: {
    onSubmitHandler: () => {},
    modalHandler: () => {},
  },
}
