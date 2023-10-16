import React, { FC } from 'react'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from './post-photos.module.scss'

type PropsType = {
  //postImages: ImageType[]
}

export const PostImages: FC<PropsType> = () => {
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
          {/*{postImages.map((el: any, idx: any) => {
            return (
              <div key={idx} className={s.carousel}>
                <Image alt={'img'} src={el.image} width={490} height={562} />
              </div>
            )
          })}*/}
        </Slider>
      </div>
    </>
  )
}

export default PostImages
