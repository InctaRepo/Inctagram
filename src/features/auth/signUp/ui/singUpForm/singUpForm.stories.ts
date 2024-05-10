import { SingUpForm } from '@/features/auth/signUp/ui/singUpForm'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {
    onSubmitHandler: {
      action: 'submit',
    },
  },
  component: SingUpForm,
  tags: ['autodocs'],
  title: 'Auth/RegisterForm',
} satisfies Meta<typeof SingUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmitHandler: fn(),
  },
}
