import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import s from './added-images.module.scss'

import { CloseIcon } from '@/src/assets/icons/close-icon'

export const AddedImages = ({ addedImages, setAddedImages, className }) => {
  const imagesToShow = addedImages.slice(-2)

  console.log(imagesToShow)

  useEffect(() => {
    setAddedImages(addedImages)
  }, [addedImages])

  const onDeleteImageToShow = i => {
    const image = i === 0 ? imagesToShow.slice(1) : imagesToShow.slice(0, -1)

    setAddedImages(addedImages.slice(0, -2).concat(image))
  }

  return (
    <div className={addedImages.length === 10 ? s.wrapperForImg : s.wrapper}>
      {addedImages.length <= 1
        ? addedImages.map((el, idx) => {
            return (
              <>
                <div
                  key={idx}
                  className={s.addedPhoto} /*onClick={() => setCurrentImage(el.image)}*/
                >
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
                <div key={i} className={s.addedPhoto} /*onClick={() => setPostImage(el.image)}*/>
                  <div className={s.closeIcon} onClick={() => onDeleteImageToShow(i)}>
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
