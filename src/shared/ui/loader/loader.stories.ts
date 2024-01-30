import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from '@/ui/loader/Loader'

const meta = {
  title: 'Components/ok/Loader',
  component: Loader,
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof Loader>

export const LoaderStory: Story = {
  args: {},
}
