import { Meta, StoryObj } from '@storybook/react'

import { RegisterForm } from './Register'

const meta = {
  title: 'Auth/RegisterForm',
  component: RegisterForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmitHandler: {
      action: 'submit',
    },
  },
} satisfies Meta<typeof RegisterForm>

export default meta
type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {
  args: {},
}
