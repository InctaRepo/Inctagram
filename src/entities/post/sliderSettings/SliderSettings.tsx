import React from 'react'

import s from './sliderSettings.module.scss'

import { SliderBtn } from '@/ui/sliderBtn'

export const SliderSettings = {
  dots: true,
  swipe: false,
  arrows: true,
  dotsClass: `slick-dots ${s.dots}`,
  appendDots: (dots: any) => {
    return <ul style={{ margin: '0px' }}>{dots}</ul>
  },
  customPaging: (i: any) => {
    return <div className={s.dot}></div>
  },
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SliderBtn direction="right" />,
  prevArrow: <SliderBtn direction="left" />,
}
