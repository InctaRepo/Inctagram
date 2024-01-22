import type { Meta, StoryObj } from '@storybook/react'

import { SelectBox } from '@/src/shared/ui/selectBox'

const meta: Meta<typeof SelectBox> = {
  title: 'Components/Select',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SelectBox>

export const Default: Story = {
  args: {
    disabled: false,
  },
}
