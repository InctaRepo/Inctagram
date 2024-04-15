import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPost } from '@/features/posts/createPost/CreateNewPost'

const meta = {
  component: CreateNewPost,
  title: 'pages/create-post',
} satisfies Meta<typeof CreateNewPost>

export default meta
type Story = StoryObj<typeof CreateNewPost>

export const Default: Story = {
  args: {},
}
