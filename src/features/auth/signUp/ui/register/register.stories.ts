import { Meta, StoryObj } from '@storybook/react'
import { Register } from './Register'

const meta = {
  title: 'Auth/RegisterForm',
  component: Register,
  tags: ['autodocs'],
  argTypes: {
    onSubmitHandler: {
      action: 'submit',
    },
  },
} satisfies Meta<typeof Register>

export default meta
type Story = StoryObj<typeof Register>

export const Default: Story = {
  args: {},
}
