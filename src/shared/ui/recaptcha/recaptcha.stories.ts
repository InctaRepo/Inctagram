import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from '@/ui/recaptcha/Recaptcha'

const meta: Meta<typeof Recaptcha> = {
  title: 'Components/Recaptcha',
  component: Recaptcha,
  tags: ['autodocs'],
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
    primary: false,
    error: 'error',
  },
}

export const Expired: Story = {
  args: {
    expired: true,
    primary: true,
  },
}
