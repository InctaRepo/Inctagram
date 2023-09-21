import React, { ReactNode } from 'react'
import { Swiper } from 'swiper/react'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { ImageType } from '@/src/components/profile/new-post/CpoppedImage/CroppedImage'

interface SlidesStyles {
  width: number
  height: number
  className: string
}

export const Carousel = ({
  children,
  addedImages,
  slidesStyles,
  ref,
}: {
  children?: ReactNode
  addedImages?: ImageType[]
  slidesStyles?: SlidesStyles
  ref?: any
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={swiper => console.log(swiper)}
    >
      {addedImages
        ? addedImages.map(i => {
            return (
              <SwiperSlide key={i.id} className={'w-full'}>
                <Image
                  src={i.image}
                  alt={'image'}
                  width={slidesStyles?.width ?? 490}
                  height={slidesStyles?.height ?? 503}
                  className={slidesStyles?.className}
                  ref={ref}
                />
              </SwiperSlide>
            )
          })
        : children}
    </Swiper>
  )
}
