import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/ui/typography/Typography'

const meta = {
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'regular16',
        'bold16',
        'regular14',
        'bold14',
        'medium14',
        'small',
        'sb_small',
        'link',
        'sm_link',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof Typography>

export const Large: Story = {
  args: {
    children: 'large text example',
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    children: 'h1 text example',
    variant: 'h1',
  },
}
export const H2: Story = {
  args: {
    children: 'h2 text example',
    variant: 'h2',
  },
}
export const H3: Story = {
  args: {
    children: 'h3 text example',
    variant: 'h3',
  },
}

export const Regular16: Story = {
  args: {
    children: 'regular16 text example',
    variant: 'regular16',
  },
}
export const Bold16: Story = {
  args: {
    children: 'bold16 text example',
    variant: 'bold16',
  },
}
export const Regular14: Story = {
  args: {
    children: 'regular14 text example',
    variant: 'regular14',
  },
}
export const Bold14: Story = {
  args: {
    children: 'bold14 text example',
    variant: 'bold14',
  },
}
export const Medium14: Story = {
  args: {
    children: 'medium14 text example',
    variant: 'medium14',
  },
}
export const Small: Story = {
  args: {
    children: 'small text example',
    variant: 'small',
  },
}
export const Sb_small: Story = {
  args: {
    children: 'sb_small text example',
    variant: 'sb_small',
  },
}
export const Link: Story = {
  args: {
    children: 'link text example',
    color: 'link',
    variant: 'link',
  },
}

export const Sm_link: Story = {
  args: {
    children: 'sm_link text example',
    color: 'link',
    variant: 'sm_link',
  },
}

export const Error_text: Story = {
  args: {
    children: 'error text example',
    color: 'error',
    variant: 'regular14',
  },
}
