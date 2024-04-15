import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from '@/features/auth/createNewPassword/ui/createNewPasswordForm'

const meta = {
  argTypes: {
    onSubmitHandler: {
      action: 'submit',
    },
  },
  component: CreateNewPasswordForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'pages/CreateNewPassword',
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmitHandler: () => {},
  },
}
