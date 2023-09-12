import type { Meta, StoryObj } from '@storybook/react'

import { SelectBox } from 'src/components/ui/select-box/select-box'

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