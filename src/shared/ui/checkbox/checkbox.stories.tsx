import type { StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Checkbox } from '@/ui/checkbox'

const meta = {
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      options: [true, false],
    },
  },
  component: Checkbox,
  title: 'Components/Checkbox',
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: args => {
    const [checked, setChecked] = useState(false)

    return (
      <>
        <Checkbox
          {...args}
          checked={checked}
          disabled={false}
          label={'Check-box'}
          onChange={() => setChecked(!checked)}
        />
      </>
    )
  },
}
export const Checked: Story = {
  args: { checked: true, disabled: false, label: 'Check-box' },
}
export const NotChecked: Story = {
  args: { checked: false, disabled: false, label: 'Check-box' },
}
export const DisabledAndChecked: Story = {
  args: { checked: true, disabled: true, label: 'Check-box' },
}

export const DisabledAndNotChecked: Story = {
  args: { checked: false, disabled: true, label: 'Check-box' },
}
