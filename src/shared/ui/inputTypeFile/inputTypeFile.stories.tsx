import type { StoryObj } from '@storybook/react'

import { InputTypeFile } from '@/src/shared/ui/inputTypeFile'

const meta = {
  title: 'Components/InputTypeFile',
  component: InputTypeFile,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof InputTypeFile>

export const Primary: Story = {
  args: {},
}
