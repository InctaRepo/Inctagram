import React from 'react'

import Image from 'next/image'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from '@/entities/post/postImages/ui/postImages.module.scss'
import { SliderSettings } from '@/entities/post/sliderSettings'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/features/posts/service'

type Props = { images?: Images[]; isDescription?: boolean }

export const PostImages = ({ images, isDescription }: Props) => {
  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...SliderSettings}>
          {images?.map((el, idx) => (
            <div key={idx} className={isDescription ? s.carouselDescription : s.carousel}>
              <Image
                alt={'img'}
                src={el.url}
                width={490}
                height={490}
                priority={true}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                placeholder="blur"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
