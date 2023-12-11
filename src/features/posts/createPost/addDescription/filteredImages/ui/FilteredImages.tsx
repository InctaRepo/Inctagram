import React from 'react'

import ImageWithFilter from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import { Image } from '../../../CreateNewPost'

import s from './filteredImages.module.scss'

import { SliderSettings } from 'src/entities/post/sliderSettings'

type Props = {
  addedImages: Image[]
  activeFilter: string
}

export const FilteredImages = ({ addedImages, activeFilter }: Props) => {
  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...SliderSettings}>
          {addedImages.map((el, idx) => {
            return (
              <div key={idx} className={s.carousel}>
                <ImageWithFilter
                  alt={'img'}
                  src={el.image!}
                  width={490}
                  height={503}
                  style={{ filter: activeFilter }}
                />
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}
