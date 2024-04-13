import type { Meta, StoryObj } from '@storybook/react'

import { LoaderLogo } from '@/ui/loaderLogo'

const meta = {
  component: LoaderLogo,
  tags: ['autodocs'],
  title: 'Components/ok/LoaderLogo',
} satisfies Meta<typeof LoaderLogo>

export default meta
type Story = StoryObj<typeof LoaderLogo>

export const LoaderLogoStory: Story = {}
