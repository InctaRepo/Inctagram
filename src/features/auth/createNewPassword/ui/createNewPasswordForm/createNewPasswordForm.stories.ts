import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from '@/features/auth/createNewPassword/ui/createNewPasswordForm'

const meta = {
  title: 'pages/CreateNewPassword',
  component: CreateNewPasswordForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmitHandler: {
      action: 'submit',
    },
  },
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
