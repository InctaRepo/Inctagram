import { SingUpForm } from '@/features/auth/signUp/ui/singUpForm'
import { Meta, StoryObj } from '@storybook/react'

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
type Story = StoryObj<typeof SingUpForm>

export const Default: Story = {
  args: {},
}
