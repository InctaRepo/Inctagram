import React from 'react'

import ImageToAdd from 'next/image'

import s from '@/features/posts/createPost/editPhoto/add/addedImages/AddedImages.module.scss'
import CloseIcon from '@/public/icon/closeIcon.svg'
import { Image } from '@/shared/types'

type Props = {
  addedImages: Image[]
  setAddedImages: (addedImages: Image[]) => void
}

export const AddedImages = ({ addedImages, setAddedImages }: Props) => {
  const imagesToShow = addedImages.slice(-2)

  const onDeleteImage = (i: number) => {
    const image = i === 0 ? imagesToShow.slice(1) : imagesToShow.slice(0, -1)

    setAddedImages(addedImages.slice(0, -2).concat(image))
  }

  return (
    <div className={addedImages.length === 10 ? s.wrapperForImg : s.wrapper}>
      {addedImages.length <= 1
        ? addedImages.map((el, idx) => {
            return (
              <div key={idx} className={s.addedPhoto}>
                <ImageToAdd
                  className={s.oneImage}
                  src={String(el.image)}
                  alt={'photos'}
                  height={82}
                  width={80}
                />
              </div>
            )
          })
        : imagesToShow.map((el, i) => {
            return (
              <div key={i} className={s.addedPhoto}>
                <div className={s.closeIcon} onClick={() => onDeleteImage(i)}>
                  <CloseIcon className={s.close} />
                </div>
                <ImageToAdd
                  className={s.image}
                  src={String(el.image)}
                  alt={'photos'}
                  height={82}
                  width={80}
                />
              </div>
            )
          })}
    </div>
  )
}
