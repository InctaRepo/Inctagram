import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from '@/ui/recaptcha/Recaptcha'

const meta: Meta<typeof Recaptcha> = {
  component: Recaptcha,
  tags: ['autodocs'],
  title: 'Components/Recaptcha',
}

export default meta
type Story = StoryObj<typeof Recaptcha>

export const Primary: Story = {
  args: {
    primary: true,
  },
}

export const Error: Story = {
  args: {
    error: 'error',
    primary: false,
  },
}

export const Expired: Story = {
  args: {
    expired: true,
    primary: true,
  },
}
