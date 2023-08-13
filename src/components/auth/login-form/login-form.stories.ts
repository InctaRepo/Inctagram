import type { Meta, StoryObj } from '@storybook/react'

import { LogInForm } from './logIn-form'

const meta = {
  title: 'Auth/LogInForm',
  component: LogInForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
