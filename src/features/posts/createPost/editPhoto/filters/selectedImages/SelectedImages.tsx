import React, { useState } from 'react'

import ImageWithFilter from 'next/image'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SliderSettings } from '@/entities/post/sliderSettings'
import { filtersVariant } from '@/features/posts/createPost/editPhoto/filters/selectedImages/filtersVariant'
import s from '@/features/posts/createPost/editPhoto/filters/selectedImages/selectedImages.module.scss'
import airBalloon from '@/public/images/airBalloonImage.jpg'
import { getFilterType } from '@/shared/helpers'
import { Image, ImageFiltersType } from '@/shared/types'
import { Typography } from '@/ui/typography'

type Props = {
  addedImages: Image[]
  setActiveFilter: (activeFilter: ImageFiltersType) => void
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
              <div key={idx} className={s.carousel}>
                <ImageWithFilter
                  alt={'img'}
                  style={{
                    filter: el.activeFilter,
                    width: '100%',
                    height: 'auto',
                  }}
                  src={el.image ? el.image : ''}
                  width={490}
                  height={503}
                />
              </div>
            )
          })}
        </Slider>
      </div>
      <div className={s.filterContainer}>
        {filtersVariant.map((el, idx) => {
          return (
            <div key={idx} className={s.imgWithFilter} onClick={() => onActiveFilter(el.name)}>
              <div
                className={`${s.imageWrapper} ${
                  el.filter == activeFilter ? s.activeFilterWrapper : ''
                }`}
              >
                <ImageWithFilter
                  src={airBalloon}
                  alt={'image-with-filter'}
                  width={108}
                  height={108}
                  style={{
                    filter: el.filter,
                  }}
                  className={s.image}
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
