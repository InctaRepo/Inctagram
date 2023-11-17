import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    type: 'text',
    label: 'User name',
  },
}

export const Error: Story = {
  args: {
    type: 'text',
    label: 'User name',
    errorMessage: 'Error message',
  },
}

export const Disabled: Story = {
  args: {
    type: 'text',
    label: 'User name',
    disabled: true,
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
  },
}

export const PasswordError: Story = {
  args: {
    type: 'password',
    label: 'Password',
    errorMessage: 'Error text',
  },
}

export const PasswordDisabled: Story = {
  args: {
    type: 'password',
    label: 'Password',
    disabled: true,
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
}

export const SearchError: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    errorMessage: 'Text error',
  },
}

export const SearchDisabled: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    disabled: true,
  },
}
