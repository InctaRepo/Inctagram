import type { Meta, StoryObj } from '@storybook/react'

import { Cards } from './Cards'

const meta: Meta<typeof Cards> = {
  title: 'Components/Cards',
  component: Cards,
}

export default meta

type Story = StoryObj<typeof Cards>

export const Primary: Story = {}
