import React from 'react'

import { SliderBtn } from '@/ui/sliderBtn'

import s from './sliderSettings.module.scss'

export const SliderSettings = {
  appendDots: (dots: any) => {
    return <ul style={{ margin: '0px' }}>{dots}</ul>
  },
  arrows: true,
  customPaging: (i: any) => {
    return <div className={s.dot}></div>
  },
  dots: true,
  dotsClass: `slick-dots ${s.dots}`,
  infinite: true,
  nextArrow: <SliderBtn direction={'right'} />,
  prevArrow: <SliderBtn direction={'left'} />,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipe: false,
}
