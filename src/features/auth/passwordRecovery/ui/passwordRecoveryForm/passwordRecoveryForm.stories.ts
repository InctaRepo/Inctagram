import type { Meta, StoryObj } from '@storybook/react'

import { PasswordRecoveryForm } from '@/src/features/auth/passwordRecovery/ui/passwordRecoveryForm/PasswordRecoveryForm'

const meta: Meta<typeof PasswordRecoveryForm> = {
  title: 'Auth/PasswordRecoveryForm',
  component: PasswordRecoveryForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PasswordRecoveryForm>

export const Default: Story = {
  args: {
    onSubmitHandler: () => {},
    modalHandler: () => {},
  },
}
