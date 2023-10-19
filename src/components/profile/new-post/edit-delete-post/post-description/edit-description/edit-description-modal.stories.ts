import type { Meta, StoryObj } from '@storybook/react'

import EditDescriptionModal from '@/src/components/profile/new-post/edit-delete-post/post-description/edit-description/edit-description-modal'

const meta = {
  title: 'pages/edit-post-description',
  component: EditDescriptionModal,
} satisfies Meta<typeof EditDescriptionModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
