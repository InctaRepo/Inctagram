import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/shared/header/ui/Header'

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Components/Header',
}

export default meta

type Story = StoryObj<typeof Header>

export const Primary: Story = {
  render: () => <Header variant={'public'} />,
  // args: {},
}
