import type { Meta, StoryObj } from '@storybook/react'

import { RadioButton } from '@/ui/radioButton'

const meta = {
  component: RadioButton,
  tags: ['autodocs'],
  title: 'Components/RadioButton',
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option-one' },
      { label: 'Option Two', value: 'option-two' },
    ],
  },
}
export const DefaultOneValue: Story = {
  args: {
    defaultValue: 'option-one',
    options: [
      { label: 'Option One', value: 'option-one' },
      { label: 'Option Two', value: 'option-two' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'option-two',
    disabled: true,
    options: [
      { label: 'Option One', value: 'option-one' },
      { label: 'Option Two', value: 'option-two' },
    ],
  },
}
