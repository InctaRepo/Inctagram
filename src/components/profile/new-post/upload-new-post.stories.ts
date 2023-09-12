import type { Meta, StoryObj } from '@storybook/react'

import { UploadPostPhotoModal } from '@/src/components/profile/new-post/upload-new-post'

const meta = {
    title: 'pages/upload-post',
    component: UploadPostPhotoModal,
} satisfies Meta<typeof UploadPostPhotoModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}