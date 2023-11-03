import type { Meta, StoryObj } from '@storybook/react'

import { CreatePostModal } from '@/src/components/profile/new-post/create-post/create-new-post'

const meta = {
  title: 'pages/create-post',
  component: CreatePostModal,
} satisfies Meta<typeof CreatePostModal>

export default meta
type Story = StoryObj<typeof CreatePostModal>

export const Default: Story = {
  args: {},
}
