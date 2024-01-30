import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { TabsComponent } from '@/ui/tabsComponent'

const meta: Meta<typeof TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof TabsComponent>

export const Default: Story = {
  args: {
    tabs: [
      { label: 'Button', children: <Button>he</Button>, value: 'Button' },
      { label: 'Checkbox', children: <Checkbox checked={true} />, value: 'Checkbox' },
    ],
    disabled: false,
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Account',
  },
}
