import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/src/components/ui/header/header'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
}

export default meta

type Story = StoryObj<typeof Header>

export const Primary: Story = {
  args: {
    primary: true,
  },
}
