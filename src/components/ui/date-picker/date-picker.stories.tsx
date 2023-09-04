import type { StoryObj } from '@storybook/react'

import { DatePick } from './'

const meta = {
  title: 'Components/DatePick',
  component: DatePick,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof DatePick>

export const Primary: Story = {
  args: {},
}
export const WithRangeData: Story = {
  args: {
    range: true,
  },
}
export const WithErrorPrimary: Story = {
  args: {
    errorMessage: 'Error!',
  },
}
