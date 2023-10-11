import type { Meta, StoryObj } from '@storybook/react'

import { ProfileSettings } from '@/src/components/profile/profile-settings/Profile-settings'

const meta = {
  title: 'pages/profile-settings',
  component: ProfileSettings,
} satisfies Meta<typeof ProfileSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // @ts-ignore
  args: {},
}
