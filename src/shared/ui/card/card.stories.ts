import type { StoryObj } from '@storybook/react'

import { Card } from '@/src/shared/ui/card/Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const CardExample: Story = {
  args: {
    children:
      'card example textcard example textcard example textcard example textcard example textcard example textcard example textcard example textcard example textcard example textcard example text',
  },
}
