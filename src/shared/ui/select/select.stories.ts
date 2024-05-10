import type { Meta, StoryObj } from '@storybook/react'

import { Select } from 'src/shared/ui/select'

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Select',
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    disabled: false,
  },
}
