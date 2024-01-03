import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/src/shared/ui/typography/Typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
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
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof Typography>

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'large text example',
  },
}

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'h1 text example',
  },
}
export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'h2 text example',
  },
}
export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'h3 text example',
  },
}

export const Regular16: Story = {
  args: {
    variant: 'regular16',
    children: 'regular16 text example',
  },
}
export const Bold16: Story = {
  args: {
    variant: 'bold16',
    children: 'bold16 text example',
  },
}
export const Regular14: Story = {
  args: {
    variant: 'regular14',
    children: 'regular14 text example',
  },
}
export const Bold14: Story = {
  args: {
    variant: 'bold14',
    children: 'bold14 text example',
  },
}
export const Medium14: Story = {
  args: {
    variant: 'medium14',
    children: 'medium14 text example',
  },
}
export const Small: Story = {
  args: {
    variant: 'small',
    children: 'small text example',
  },
}
export const Sb_small: Story = {
  args: {
    variant: 'sb_small',
    children: 'sb_small text example',
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'link text example',
    color: 'link',
  },
}

export const Sm_link: Story = {
  args: {
    variant: 'sm_link',
    children: 'sm_link text example',
    color: 'link',
  },
}

export const Error_text: Story = {
  args: {
    variant: 'regular14',
    children: 'error text example',
    color: 'error',
  },
}
