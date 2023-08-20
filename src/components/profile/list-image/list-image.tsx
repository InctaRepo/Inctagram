import React from 'react'

import Image from 'next/image'

import image from '@/src/assets/images/img_avatar.png'
import s from '@/src/components/profile/list-image/list-image.module.scss'
export const ListImage = () => {
  const photos = [image, image, image, image, image, image, image, image, image, image]

  return (
    <div className={s.container}>
      {photos!.map((el, index) => {
        return <Image className={s.image} key={index} src={el!} alt={'ds'} />
      })}
    </div>
  )
}
