import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { DatePicker } from '@/ui/datePicker'

const meta = {
  component: DatePicker,
  tags: ['autodocs'],
  title: 'Components/DataPicker',
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    setStartDate: () => {},
    startDate: null,
  },

  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    return <DatePicker setStartDate={setStartDate} startDate={startDate} />
  },
}

export const Range: Story = {
  args: {
    setStartDate: () => {},
    startDate: null,
  },

  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    const [endDate, setEndDate] = useState<Date | null>(
      startDate ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) : null
    )

    return (
      <DatePicker
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
      />
    )
  },
}
