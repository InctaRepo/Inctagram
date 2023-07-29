import {useState} from 'react'

import type {StoryObj} from '@storybook/react'
import {Checkbox} from './Checkbox';


const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      options: [true, false],
      control: {type: 'boolean'},
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false)

    return (
        <>
            <Checkbox
                {...args}
    label={'Check-box'}
    disabled={false}
    checked={checked}
    onChange={() => setChecked(!checked)}
    />
    </>
  )
  },
}
export const Checked: Story = {
  args: { disabled: false, checked: true, label: 'Check-box' },
}
export const NotChecked: Story = {
  args: { disabled: false, checked: false, label: 'Check-box' },
}
export const DisabledAndChecked: Story = {
  args: { disabled: true, checked: true, label: 'Check-box' },
}

export const DisabledAndNotChecked: Story = {
  args: { disabled: true, checked: false, label: 'Check-box' },
}
