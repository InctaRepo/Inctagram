import { Meta, Story, StoryObj } from '@storybook/react'

import { SwiperBtn } from './SwiperBtn'

import SwiperArrowIcon from '@/src/assets/icons/swiper-arrow-icon'

export default {
  title: 'Components/SwiperBtn',
  component: SwiperBtn,
} as Meta

export const Default: StoryObj<React.ComponentProps<typeof SwiperBtn>> = {
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
