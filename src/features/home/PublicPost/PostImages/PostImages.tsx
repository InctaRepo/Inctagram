import React, { ReactElement } from 'react'

import Image from 'next/image'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from './PostImages.module.scss'

import { SliderSettings } from '@/src/entities/post/sliderSettings'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts/service'

type Props = { images: Images[]; isDescription?: boolean }

export const PostImages = ({ images }: { images: string[] }): ReactElement => {
  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...SliderSettings}>
          {images.map((url, index) => (
            <div key={index} className={s.carouselDescription}>
              <Image
                key={index}
                alt={'img'}
                src={url}
                width={234}
                height={240}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
