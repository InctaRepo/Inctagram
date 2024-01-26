import React from 'react'

import { SliderBtn } from '@/src/shared/ui/sliderBtn/SliderBtn'

export const SliderSettings = {
  dots: true,
  swipe: false,
  arrows: true,
  dotsClass: 'slick-dots slick-thumb',
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <SliderBtn direction="left" name="prevBtn" />,
  nextArrow: <SliderBtn direction="right" name="nextBtn" />,
}
