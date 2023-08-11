import type { Meta, StoryObj } from '@storybook/react'

import { Selectbox } from './Selectbox'

const meta: Meta<typeof Selectbox> = {
  title: 'Components/Select',
  component: Selectbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta
type Story = StoryObj<typeof Selectbox>

export const Default: Story = {
  args: {
    def: true,
    active: false,
    hover: false,
    focus: false,
    disabled: false,
  },
}

export const Active: Story = {
  args: {
    active: true,
    hover: false,
    focus: false,
    disabled: false,
  },
}

export const Hover: Story = {
  args: {
    active: false,
    hover: true,
    focus: false,
    disabled: false,
  },
}

export const Focus: Story = {
  args: {
    active: false,
    hover: false,
    focus: true,
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    active: false,
    hover: false,
    focus: false,
    disabled: true,
  },
}
