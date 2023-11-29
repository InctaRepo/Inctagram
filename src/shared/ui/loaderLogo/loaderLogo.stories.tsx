import type { Meta, StoryObj } from '@storybook/react'
import { LoaderLogo } from './LoaderLogo'

const meta = {
  title: 'Components/ok/LoaderLogo',
  component: LoaderLogo,
  tags: ['autodocs'],
} satisfies Meta<typeof LoaderLogo>

export default meta
type Story = StoryObj<typeof LoaderLogo>

export const LoaderLogoStory: Story = {}
