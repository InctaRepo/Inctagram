import ImageWithFilter from 'next/image'
import React, { FC } from 'react'
import Slider from 'react-slick'
import airBalloon from 'public/images/airBalloonImage.jpg'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Typography } from '@/src/shared/ui/typography'
import { Image } from '../../../CreateNewPost'
import { filters } from '../Filters'
import s from '../selected-images/SelectedImages.module.scss'

type Props = {
  addedImages: Image[]
  activeFilter: string
  setActiveFilter: (activeFilter: string) => void
  image?: string
  setAddedImages: (addedImages: Image[]) => void
}

const SelectedImages: FC<Props> = ({
  image,
  addedImages,
  activeFilter,
  setActiveFilter,
  setAddedImages,
}) => {
  const settings = {
    dots: true,
    swipe: false,
    arrows: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

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
      case 'Happy':
        setActiveFilter('contrast(110%) brightness(110%) saturate(130%)')
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

  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...settings}>
          {addedImages.map((el, idx) => {
            return (
              <div key={idx} className={s.carousel}>
                <ImageWithFilter
                  alt={'img'}
                  style={{ filter: activeFilter }}
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
        {filters.map((el, idx) => {
          return (
            <div key={idx} className={s.imgWithFilter} onClick={() => onActiveFilter(el.name)}>
              <ImageWithFilter
                src={airBalloon}
                alt={'image-with-filter'}
                width={108}
                height={108}
                style={{ filter: el.filter }}
                className={s.image}
              />
              <div className={s.filterName}>
                <Typography variant={'h3'}>{el.name}</Typography>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SelectedImages
