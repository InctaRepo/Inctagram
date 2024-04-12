import React from 'react'
import Slider from 'react-slick'

import { SliderSettings } from '@/entities/post/sliderSettings'
import { Image } from '@/shared/types'
import ImageWithFilter from 'next/image'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from '@/features/posts/createPost/addDescription/filteredImages/ui/filteredImages.module.scss'

type Props = {
  addedImages: Image[]
}

export const FilteredImages = ({ addedImages }: Props) => {
  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...SliderSettings}>
          {addedImages.map((el, idx) => {
            return (
              <div className={s.carousel} key={idx}>
                <ImageWithFilter
                  alt={'img'}
                  height={503}
                  src={el.image!}
                  style={{
                    filter: el.activeFilter,
                    height: 'auto',
                    width: '100%',
                  }}
                  width={490}
                />
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}
