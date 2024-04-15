import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '@/ui/textField/TextField'

const meta = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'User name',
    type: 'text',
  },
}

export const Error: Story = {
  args: {
    errorMessage: 'Error message',
    label: 'User name',
    type: 'text',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'User name',
    type: 'text',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },
}

export const PasswordError: Story = {
  args: {
    errorMessage: 'Error text',
    label: 'Password',
    type: 'password',
  },
}

export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    label: 'Password',
    type: 'password',
  },
}

export const Search: Story = {
  args: {
    placeholder: 'Search...',
    type: 'search',
  },
}

export const SearchError: Story = {
  args: {
    errorMessage: 'Text error',
    placeholder: 'Search...',
    type: 'search',
  },
}

export const SearchDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search...',
    type: 'search',
  },
}
