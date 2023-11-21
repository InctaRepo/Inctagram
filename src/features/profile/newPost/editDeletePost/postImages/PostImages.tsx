import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts'
// eslint-disable-next-line import/order
import Image from 'next/image'
import s from './PostImages.module.scss'

type Props = { images: Images[]; id: string }

export const PostImages = ({ images, id }: Props) => {
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

  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...settings}>
          {images.map((el, idx) => (
            <div key={idx} className={s.carousel}>
              <Image alt={'img'} src={el.url} width={490} height={562} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
