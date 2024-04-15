import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm } from '@/features/auth/signIn/ui/loginForm/LoginForm'

const meta = {
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Auth/LogInForm',
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  args: {},
}
