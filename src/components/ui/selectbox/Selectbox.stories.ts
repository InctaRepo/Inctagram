import type { Meta, StoryObj } from '@storybook/react'

import { Selectbox } from './Selectbox'

const meta: Meta<typeof Selectbox> = {
  title: 'Components/Select',
  component: Selectbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Selectbox>

export const Default: Story = {
  args: {
   disabled: false,
  },
}

