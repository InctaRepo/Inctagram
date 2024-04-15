import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from '@/ui/loader/Loader'

const meta = {
  component: Loader,
  tags: ['autodocs'],
  title: 'Components/ok/Loader',
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof Loader>

export const LoaderStory: Story = {
  args: {},
}
