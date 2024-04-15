import type { StoryObj } from '@storybook/react'

import { TextAreaField } from '@/ui/textAreaField/TextAreaField'

const meta = {
  component: TextAreaField,
  tags: ['autodocs'],
  title: 'Components/TextAreaField',
}

export default meta
type Story = StoryObj<typeof TextAreaField>

export const Default: Story = {
  args: {
    fullWidth: true,
    label: 'Text-area',
    placeholder: 'Text-area',
  },
}

export const Error: Story = {
  args: {
    errorMessage: 'Error text',
    fullWidth: true,
    label: 'Text-area with error',
    placeholder: 'Text-area',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    fullWidth: true,
    label: 'Text-area disabled',
    placeholder: 'Text-area',
  },
}
