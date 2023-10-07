import type { Meta, StoryObj } from '@storybook/react'

import { CreatePostModal } from '@/src/components/profile/new-post/create-new-post'

const meta = {
  title: 'pages/create-post',
  component: CreatePostModal,
} satisfies Meta<typeof CreatePostModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
