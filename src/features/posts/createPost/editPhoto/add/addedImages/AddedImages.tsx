import React from 'react'

import CloseIcon from '@/public/icon/closeIcon.svg'
import { Image } from '@/shared/types'
import ImageToAdd from 'next/image'

import s from '@/features/posts/createPost/editPhoto/add/addedImages/AddedImages.module.scss'

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
              <div className={s.addedPhoto} key={idx}>
                <ImageToAdd
                  alt={'photos'}
                  className={s.oneImage}
                  height={82}
                  src={String(el.image)}
                  width={80}
                />
              </div>
            )
          })
        : imagesToShow.map((el, i) => {
            return (
              <div className={s.addedPhoto} key={i}>
                <div className={s.closeIcon} onClick={() => onDeleteImage(i)}>
                  <CloseIcon className={s.close} />
                </div>
                <ImageToAdd
                  alt={'photos'}
                  className={s.image}
                  height={82}
                  src={String(el.image)}
                  width={80}
                />
              </div>
            )
          })}
    </div>
  )
}
