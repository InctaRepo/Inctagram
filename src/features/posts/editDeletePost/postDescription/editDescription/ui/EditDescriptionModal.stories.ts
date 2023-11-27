import type { Meta, StoryObj } from '@storybook/react'
import { EditDescriptionModal } from './EditDescriptionModal'

const meta = {
  title: 'pages/edit-post-description',
  component: EditDescriptionModal,
} satisfies Meta<typeof EditDescriptionModal>

export default meta
type Story = StoryObj<typeof EditDescriptionModal>

export const Default: Story = {
  args: {},
}
