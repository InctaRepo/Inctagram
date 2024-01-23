import React from 'react'

import { SwiperArrowIcon } from '@/src/shared/assets/icons/SwiperArrowIcon'

export const SliderSettings = {
  dots: true,
  swipe: false,
  arrows: true,
  dotsClass: 'slick-dots slick-thumb',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SwiperArrowIcon direction="left" />,
  prevArrow: <SwiperArrowIcon direction="right" />,
}
