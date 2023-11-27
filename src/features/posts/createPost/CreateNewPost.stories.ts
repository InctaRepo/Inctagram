import type { Meta, StoryObj } from '@storybook/react'
import { CreatePostModal } from './CreateNewPost'

const meta = {
  title: 'pages/create-post',
  component: CreatePostModal,
} satisfies Meta<typeof CreatePostModal>

export default meta
type Story = StoryObj<typeof CreatePostModal>

export const Default: Story = {
  args: {},
}
