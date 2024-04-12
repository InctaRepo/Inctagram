import type { StoryObj } from '@storybook/react'

import { Button } from '@/ui/button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outlined', 'link', 'internation'],
      control: { type: 'radio' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
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
    <Button variant={'primary'} disabled={true}>
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
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}
export const DisabledSecondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: true,
  },
}
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
    disabled: false,
  },
}
export const ButtonAsText: Story = {
  args: {
    variant: 'text',
    children: 'button as text',
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
