import React, { FC, useEffect, useState } from 'react'

import Image from 'next/image'

import s from './added-images.module.scss'

import { CloseIcon } from '@/src/assets/icons/close-icon'
import { ImageType } from '@/src/components/profile/new-post/create-new-post'

type PropsType = {
  addedImages: ImageType[]
  setAddedImages: (addedImages: ImageType[]) => void
  image: string | null
  croppedImage: string | null
}

export const AddedImages: FC<PropsType> = ({
  addedImages,
  setAddedImages,
  croppedImage,
  image,
}) => {
  const imagesToShow = addedImages.slice(-2)

  console.log(imagesToShow)

  useEffect(() => {
    setAddedImages(addedImages)
  }, [addedImages])

  const onDeleteImage = (i: number) => {
    const image = i === 0 ? imagesToShow.slice(1) : imagesToShow.slice(0, -1)

    setAddedImages(addedImages.slice(0, -2).concat(image))
  }

  return (
    <div className={addedImages.length === 10 ? s.wrapperForImg : s.wrapper}>
      {addedImages.length <= 1
        ? addedImages.map((el, idx) => {
            return (
              <>
                <div key={idx} className={s.addedPhoto}>
                  <Image
                    className={s.oneImage}
                    src={el.image}
                    alt={'photos'}
                    height={82}
                    width={80}
                  />
                </div>
              </>
            )
          })
        : imagesToShow.map((el, i) => {
            return (
              <>
                <div key={i} className={s.addedPhoto}>
                  <div className={s.closeIcon} onClick={() => onDeleteImage(i)}>
                    <CloseIcon className={s.close} />
                  </div>
                  <Image className={s.image} src={el.image} alt={'photos'} height={82} width={80} />
                </div>
              </>
            )
          })}
    </div>
  )
}
