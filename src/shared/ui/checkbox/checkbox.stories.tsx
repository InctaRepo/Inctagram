import type { StoryObj } from '@storybook/react'

import { Checkbox } from '@/ui/checkbox'

const meta = {
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      options: [true, false],
    },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { label: 'Check-box' },
}
export const Checked: Story = {
  args: { checked: true, disabled: false, label: 'Check-box' },
}
export const NotChecked: Story = {
  args: { checked: false, disabled: false, label: 'Check-box' },
}
export const DisabledAndChecked: Story = {
  args: { checked: true, disabled: true, label: 'Check-box' },
}

export const DisabledAndNotChecked: Story = {
  args: { checked: false, disabled: true, label: 'Check-box' },
}
