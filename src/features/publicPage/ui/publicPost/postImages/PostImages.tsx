import React, { ReactElement } from 'react'
import Slider from 'react-slick'

import { SliderSettings } from '@/entities/post/sliderSettings'
import { Images } from '@/shared/api/baseResponse'
import Image from 'next/image'

import s from '@/features/publicPage/ui/publicPost/postImages/postImages.module.scss'

type Props = { images: Images[]; isDescription?: boolean }

export const PostImages = ({ images }: { images: string[] }): ReactElement => {
  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...SliderSettings}>
          {images.map((url, index) => (
            <div className={s.carouselDescription} key={index}>
              <Image
                alt={'img'}
                height={240}
                key={index}
                src={url}
                style={{
                  height: 'auto',
                  width: '100%',
                }}
                width={234}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
