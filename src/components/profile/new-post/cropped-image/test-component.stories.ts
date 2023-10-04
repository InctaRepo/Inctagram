import type { Meta, StoryObj } from '@storybook/react'

// eslint-disable-next-line import/namespace
import { Demo } from '@/src/components/profile/new-post/cropped-image/test-component'

const meta = {
  title: 'pages/test',
  component: Demo,
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
