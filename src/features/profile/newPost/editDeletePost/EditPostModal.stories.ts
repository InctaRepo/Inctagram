import type { Meta, StoryObj } from '@storybook/react'
import { EditPostModal } from './EditPostModal'

const meta = {
  title: 'pages/edit-post',
  component: EditPostModal,
} satisfies Meta<typeof EditPostModal>

export default meta
type Story = StoryObj<typeof EditPostModal>

export const Default: Story = {
  args: {
    open: true,
  },
}
