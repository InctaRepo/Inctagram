import React, { ReactElement } from 'react'

import Image from 'next/image'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SliderSettings } from '@/entities/post/sliderSettings'
import s from '@/features/home/ui/publicPost/postImages/postImages.module.scss'
import { Images } from '@/shared/api/baseResponse'

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
