import type { Meta, StoryObj } from '@storybook/react'

import { SelectBox } from '@/ui/selectBox'

const meta: Meta<typeof SelectBox> = {
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Select',
}

export default meta
type Story = StoryObj<typeof SelectBox>

export const Default: Story = {
  args: {
    disabled: false,
  },
}
