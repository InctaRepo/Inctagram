import React, { useState } from 'react'

import ImageWithFilter from 'next/image'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SliderSettings } from '@/entities/post/sliderSettings'
import { ActiveFilter, Image } from '@/features/posts/createPost/CreateNewPost'
import { filtersVariant } from '@/features/posts/createPost/editPhoto/filters/selectedImages/filtersVariant'
import s from '@/features/posts/createPost/editPhoto/filters/selectedImages/selectedImages.module.scss'
import airBalloon from '@/public/images/airBalloonImage.jpg'
import { Typography } from '@/ui/typography'

type Props = {
  addedImages: Image[]
  activeFilter: ActiveFilter
  setActiveFilter: (activeFilter: ActiveFilter) => void
  image?: string
  setAddedImages: (addedImages: Image[]) => void
}

export const SelectedImages = ({
  image,
  addedImages,
  activeFilter,
  setActiveFilter,
  setAddedImages,
}: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  console.log(addedImages)

  const onActiveFilter = (filter: string) => {
    if (filter === 'No filter') return
    switch (filter) {
      case 'Kyoto':
        setActiveFilter('saturate(2)')
        break
      case 'Lark':
        setActiveFilter('grayscale(100%)')
        break
      case 'Gingham':
        setActiveFilter('contrast(160%)')
        break
      case 'Happy':
        setActiveFilter('contrast(110%) brightness(110%) saturate(130%)')
        break
      case 'Clarendon':
        setActiveFilter('invert(80%)')
        break
      case 'Shabby':
        setActiveFilter('sepia(80%)')
        break
      case 'Old school': {
        setActiveFilter('opacity(70%)')
        break
      }
      case 'Silent Hill': {
        setActiveFilter('hue-rotate(150deg)')
        break
      }
      default: {
        setActiveFilter('none')
        break
      }
    }

    // const currentImage = addedImages[currentImageIndex]
    // const newAddedImages = addedImages.filter((el, i) => i != currentImageIndex)
    // const newImages = [{ ...currentImage, activeFilter }, ...newAddedImages]

    // setAddedImages(newImages)
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
                    filter: activeFilter,
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
