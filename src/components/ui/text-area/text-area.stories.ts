import type { StoryObj } from '@storybook/react'

import { TextAreaField } from './text-area'

const meta = {
  title: 'Components/TextAreaField',
  component: TextAreaField,
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

export const Disabled: Story = {
  args: {
    label: 'Text-area disabled',
    placeholder: 'Text-area',
    disabled: true,
    fullWidth: true,
  },
}
