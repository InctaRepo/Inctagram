import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/ui/checkbox'
import { action } from '@storybook/addon-actions'

const meta = {
  args: {
    label: 'Check-box',
    onCheckedChange: action('onChecked'),
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
export const Checked: Story = {
  args: { checked: true },
}
export const NotChecked: Story = {
  args: { checked: false },
}
export const DisabledAndChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}
export const DisabledAndNotChecked: Story = {
  args: { checked: false, disabled: true },
}
