import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm } from 'src/components/auth/login-form/login-form'

const meta = {
  title: 'Auth/LogInForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
