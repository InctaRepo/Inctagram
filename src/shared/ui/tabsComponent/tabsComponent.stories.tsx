import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { TabsComponent } from '@/ui/tabsComponent'

const meta: Meta<typeof TabsComponent> = {
  component: TabsComponent,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Tabs',
}

export default meta
type Story = StoryObj<typeof TabsComponent>

export const Default: Story = {
  args: {
    disabled: false,
    tabs: [
      { children: <Button>he</Button>, label: 'Button', value: 'Button' },
      { children: <Checkbox checked />, label: 'Checkbox', value: 'Checkbox' },
    ],
  },
}
export const Disabled: Story = {
  args: {
    defaultValue: 'Account',
    disabled: true,
  },
}
