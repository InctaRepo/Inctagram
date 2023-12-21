import { Meta, StoryObj } from '@storybook/react'

import { SingUpForm } from './SingUpForm'

const meta = {
  title: 'Auth/RegisterForm',
  component: SingUpForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmitHandler: {
      action: 'submit',
    },
  },
} satisfies Meta<typeof SingUpForm>

export default meta
type Story = StoryObj<typeof SingUpForm>

export const Default: Story = {
  args: {},
}
