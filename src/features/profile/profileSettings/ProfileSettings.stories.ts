import type { Meta, StoryObj } from '@storybook/react'
import { ProfileSettings } from './ProfileSettings'

const meta = {
  title: 'pages/profile-settings',
  component: ProfileSettings,
} satisfies Meta<typeof ProfileSettings>

export default meta
type Story = StoryObj<typeof ProfileSettings>

export const Default: Story = {
  // @ts-ignore
  args: {},
}
