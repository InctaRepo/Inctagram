import { Meta, StoryObj } from '@storybook/react'

import { ProfileSettings } from './Profile-settings'

const meta = {
  title: 'Components/ProfileSetting',
  component: ProfileSettings,
  tags: ['autodocs'],
  argTypes: {
    onSubmitHandler: {
      action: 'submit',
    },
  },
} satisfies Meta<typeof ProfileSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
