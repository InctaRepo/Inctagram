import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPost } from '@/src/features/posts/createPost/CreateNewPost'

const meta = {
  title: 'pages/create-post',
  component: CreateNewPost,
} satisfies Meta<typeof CreateNewPost>

export default meta
type Story = StoryObj<typeof CreateNewPost>

export const Default: Story = {
  args: {},
}
