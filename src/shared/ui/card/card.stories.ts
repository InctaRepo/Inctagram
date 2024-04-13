import type { StoryObj } from '@storybook/react'

import { Card } from '@/ui/card/Card'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
}

export default meta
type Story = StoryObj<typeof Card>

export const CardExample: Story = {
  args: {
    children:
      'card example textcard example textcard example textcard example textcard example textcard example textcard example textcard example textcard example textcard example textcard example text',
  },
}
