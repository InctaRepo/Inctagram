import React from 'react'

import Image from 'next/image'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from '@/src/entities/post/postImages/ui/postImages.module.scss'
import { SliderSettings } from '@/src/entities/post/sliderSettings'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts/service'

type Props = { images?: Images[]; id: string | string[] | undefined; isDescription?: boolean }

export const PostImages = ({ images, id, isDescription }: Props) => {
  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...SliderSettings}>
          {images?.map((el, idx) => (
            <div key={idx} className={isDescription ? s.carouselDescription : s.carousel}>
              <Image alt={'img'} src={el.url} width={490} height={562} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
