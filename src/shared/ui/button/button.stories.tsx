import type { StoryObj } from '@storybook/react'

import { Button } from '@/ui/button'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outlined', 'link', 'internation'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'button primary',
      },
    },
  },
}

export const DisabledPrimary: Story = {
  render: () => (
    <Button disabled variant={'primary'}>
      Disabled Button
    </Button>
  ),
  // args: {
  //   variant: 'primary',
  //   children: 'Disabled Button',
  //   disabled: true,
  // },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}
export const DisabledSecondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: true,
    variant: 'secondary',
  },
}
export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    disabled: false,
    variant: 'outlined',
  },
}
export const ButtonAsText: Story = {
  args: {
    children: 'button as text',
    variant: 'text',
  },
}

// export const Internation: Story = {
//   render: args => {
//     return (
//       <>
//         <Button {...args} variant={'internation'}>
//           <FlagRussiaIcon />
//           {'English'}
//         </Button>
//       </>
//     )
//   },
// }
