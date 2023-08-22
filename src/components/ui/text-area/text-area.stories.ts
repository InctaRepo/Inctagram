import type { Meta, StoryObj } from '@storybook/react'

import { TextAreaField } from './text-area'

const meta = {
  title: 'Components/TextAreaField',
  component: TextAreaField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Text-area',
    placeholder: 'Text-area',
    fullWidth: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Text-area with error',
    placeholder: 'Text-area',
    errorMessage: 'Error text',
    fullWidth: true,
  },
}
