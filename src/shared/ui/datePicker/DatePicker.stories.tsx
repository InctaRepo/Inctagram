import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { DatePicker } from '@/src/shared/ui/datePicker'

const meta = {
  title: 'Components/DataPicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    return <DatePicker setStartDate={setStartDate} startDate={startDate} />
  },

  args: {
    setStartDate: () => {},
    startDate: null,
  },
}

export const Range: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    const [endDate, setEndDate] = useState<Date | null>(
      startDate ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) : null
    )

    return (
      <DatePicker
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    )
  },

  args: {
    setStartDate: () => {},
    startDate: null,
  },
}
