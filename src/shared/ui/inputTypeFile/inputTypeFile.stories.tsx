import type { StoryObj } from '@storybook/react'

import { InputTypeFile } from '@/ui/inputTypeFile'

const meta = {
  argTypes: {},
  component: InputTypeFile,
  tags: ['autodocs'],
  title: 'Components/InputTypeFile',
}

export default meta
type Story = StoryObj<typeof InputTypeFile>

export const Primary: Story = {
  args: {},
}
