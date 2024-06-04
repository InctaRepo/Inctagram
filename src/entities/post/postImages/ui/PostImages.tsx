import React from 'react'
import Slider from 'react-slick'

import { SliderSettings } from '@/entities/post/sliderSettings'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/features/posts/service'
import Image from 'next/image'

import s from '@/entities/post/postImages/ui/postImages.module.scss'

type Props = { images?: Images[]; isDescription?: boolean }

export const PostImages = ({ images, isDescription }: Props) => {
  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...SliderSettings}>
          {images?.map((el, idx) => (
            <div className={isDescription ? s.carouselDescription : s.carousel} key={el.url}>
              <Image
                alt={'img'}
                height={490}
                priority
                src={el.url}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                width={490}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
