import type { StoryObj } from '@storybook/react'

import { RadioButton } from '@/ui/radioButton'

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioButton>

export const Default: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option-one' },
      { label: 'Option Two', value: 'option-two' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { label: 'Option One', value: 'option-one' },
      { label: 'Option Two', value: 'option-two' },
    ],
  },
}
