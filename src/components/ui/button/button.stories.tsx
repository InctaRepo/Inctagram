import type {Meta, StoryObj} from '@storybook/react'

import {Button} from './'
import FlagRussiaIcon from '../../../assets/icons/flag-russia-icon';


const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outlined', 'link'],
      control: {type: 'radio'},
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
}


export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Tertiary Button',
    disabled: false,
  },
}
export const ButtonAsLink: Story = {
  args: {
    variant: 'link',
    children: 'button as link',
    as: 'a',
  },
}
export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'full width button',
    fullWidth: true,
  },
}

export const WithIcon: Story = {
  render: args => {
    return (
      <>
        <Button {...args}>
          <FlagRussiaIcon/>
          {'WithIcon'}
        </Button>
      </>
    )
  },
}
