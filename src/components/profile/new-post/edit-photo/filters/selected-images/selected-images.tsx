import React, { FC, useEffect, useRef } from 'react'

import Slider from 'react-slick'

import settings from '@/src/components/profile/new-post/CpoppedImage/CroppedImage'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// eslint-disable-next-line import/order
import s from './selected-images.module.scss'

// eslint-disable-next-line import/order
import Image from 'next/image'
import { filters } from '@/src/components/profile/new-post/edit-photo/filters/filters'
import { ImageType } from '@/src/components/profile/new-post/upload-new-post'

type PropsType = {
  addedImages: ImageType[]
  activeFilter: string
  setActiveFilter: (activeFilter: string) => void
  changedPostImage: React.MutableRefObject<any>
  image: string
}

const SelectedImages: FC<PropsType> = ({
  image,
  addedImages,
  activeFilter,
  setActiveFilter,
  changedPostImage,
}) => {
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props

    return (
      <div
        className={className}
        style={{ ...style, display: 'block', right: 15 }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props

    return (
      <div
        className={className}
        style={{ ...style, display: 'block', left: 15, zIndex: 1 }}
        onClick={onClick}
      />
    )
  }

  const onActiveFilter = (filter: string) => {
    switch (filter) {
      case 'No filter':
        setActiveFilter('none')
        break
      case 'Kyoto':
        setActiveFilter('saturate(2)')
        break
      case 'Lark':
        setActiveFilter('grayscale(100%)')
        break
      case 'Gingham':
        setActiveFilter('contrast(160%)')
        break
      case 'Moon':
        setActiveFilter('brightness(0.25)')
        break
      case 'Clarendon':
        setActiveFilter('invert(100%)')
        break
      case 'Shabby':
        setActiveFilter('sepia(100%)')
        break
      case 'Old school': {
        setActiveFilter('opacity(50%)')
        break
      }
      case 'Silent Hill': {
        setActiveFilter('hue-rotate(180deg)')
        break
      }
      default: {
        setActiveFilter('')
        break
      }
    }
  }

  useEffect(() => {
    console.log(activeFilter)
  }, [activeFilter])

  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...settings}>
          {addedImages.map((el: any, idx: any) => {
            return (
              <div key={idx} className={s.carousel}>
                <Image alt={'img'} src={el.image} width={490} height={503} ref={changedPostImage} />
              </div>
            )
          })}
        </Slider>
      </div>
      <div className={s.filterContainer}>
        {filters.map((el, idx) => {
          return (
            <div key={idx} className={s.imgWithFilter} onClick={() => onActiveFilter(el.name)}>
              <Image
                src={image}
                alt={'image-with-filter'}
                width={108}
                height={108}
                style={{ filter: el.filter }}
                //className={}
                ref={changedPostImage}
              />
              <p>{el.name}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SelectedImages
