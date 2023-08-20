import type { Meta, StoryObj } from '@storybook/react'

import { Profile } from '@/src/components/profile/profile'

const meta = {
  title: 'pages/profile',
  component: Profile,
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
