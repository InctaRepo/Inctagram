import { Meta, StoryObj } from '@storybook/react'

import { SwiperArrowIcon } from '@/src/assets/icons/swiper-arrow-icon'
import { SwiperBtn } from '@/src/shared/ui/swiperBtn'

export default {
  title: 'Components/SwiperBtn',
  component: SwiperBtn,
} as Meta

type Story = StoryObj

export const Primary: Story = {
  args: {
    onClick: () => alert('Button clicked'),
    icon: SwiperArrowIcon,
    direction: 'left',
  },
  parameters: {
    backgrounds: {
      values: [{ name: 'white', value: '#ffffff' }],
      default: 'white',
    },
  },
}
