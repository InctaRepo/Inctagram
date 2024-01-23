import React from 'react'

import { SwiperArrowIcon } from '@/src/shared/assets/icons/SwiperArrowIcon'

export const SliderSettings = {
  dots: true,
  swipe: false,
  arrows: true,
  dotsClass: 'slick-dots slick-thumb',
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <SwiperArrowIcon direction="left" />,
  nextArrow: <SwiperArrowIcon direction="right" />,
}
