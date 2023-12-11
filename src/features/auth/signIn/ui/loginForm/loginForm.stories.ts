import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm } from './LoginForm'

const meta = {
  title: 'Auth/LogInForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  args: {},
}
