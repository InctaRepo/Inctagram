import React from 'react'

import ImageWithFilter from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import { SliderSettings } from '@/entities/post/sliderSettings'
import s from '@/features/posts/createPost/addDescription/filteredImages/ui/filteredImages.module.scss'
import { Image } from '@/shared/types'

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
              <div key={idx} className={s.carousel}>
                <ImageWithFilter
                  alt={'img'}
                  src={el.image!}
                  width={490}
                  height={503}
                  style={{
                    filter: el.activeFilter,
                    width: '100%',
                    height: 'auto',
                  }}
                  placeholder="blur"
                />
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}
