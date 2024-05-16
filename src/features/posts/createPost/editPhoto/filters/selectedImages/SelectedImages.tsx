import React, { useState } from 'react'
import Slider from 'react-slick'

import { SliderSettings } from '@/entities/post/sliderSettings'
import { filtersVariant } from '@/features/posts/createPost/editPhoto/filters/selectedImages/filtersVariant'
import airBalloon from '@/public/images/airBalloonImage.jpg'
import { getFilterType } from '@/shared/helpers'
import { Image } from '@/shared/types'
import { ImageFilter } from '@/shared/types/posts/postsTypes'
import { Typography } from '@/ui/typography'
import ImageWithFilter from 'next/image'

import s from '@/features/posts/createPost/editPhoto/filters/selectedImages/selectedImages.module.scss'

type Props = {
  addedImages: Image[]
  setActiveFilter: (activeFilter: ImageFilter) => void
  setAddedImages: (addedImages: Image[]) => void
}

export const SelectedImages = ({ addedImages, setActiveFilter, setAddedImages }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const activeFilter = addedImages[currentImageIndex].activeFilter

  const onActiveFilter = (filter: string) => {
    setActiveFilter(getFilterType(filter))

    const updatedImages = addedImages.map((el: Image, index) => {
      if (index === currentImageIndex) {
        return { ...el, activeFilter: getFilterType(filter) }
      }

      return el
    })

    setAddedImages(updatedImages)
  }

  const getCurrentImage = (current: any) => {
    setCurrentImageIndex(current)
  }

  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...SliderSettings} afterChange={getCurrentImage}>
          {addedImages.map((el, idx) => {
            return (
              <div className={s.carousel} key={idx}>
                <ImageWithFilter
                  alt={'img'}
                  height={503}
                  src={el.image ? el.image : ''}
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
      <div className={s.filterContainer}>
        {filtersVariant.map((el, idx) => {
          return (
            <div className={s.imgWithFilter} key={idx} onClick={() => onActiveFilter(el.name)}>
              <div
                className={`${s.imageWrapper} ${
                  el.filter == activeFilter ? s.activeFilterWrapper : ''
                }`}
              >
                <ImageWithFilter
                  alt={'image-with-filter'}
                  className={s.image}
                  height={108}
                  src={airBalloon}
                  style={{
                    filter: el.filter,
                  }}
                  width={108}
                />
              </div>
              <div className={s.filterName}>
                <Typography
                  color={el.filter == activeFilter ? 'primary' : 'secondary'}
                  variant={'h3'}
                >
                  {el.name}
                </Typography>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
