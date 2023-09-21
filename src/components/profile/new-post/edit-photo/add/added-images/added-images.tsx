import React from 'react'
import s from './added-images.module.scss'
import Image from 'next/image'

export const AddedImages = ({ addedImages, setAddedImages, className }) => {
  const imagesToShow = addedImages.slice(-2)
  console.log(imagesToShow)
  return (
    <div className={s.wrapper}>
      {addedImages.length <= 2
        ? addedImages.map((el, idx) => {
            return (
              <>
                <div
                  key={idx}
                  className={s.addedPhoto} /*onClick={() => setCurrentImage(el.image)}*/
                >
                  <Image src={el.image} alt={'photos'} height={82} width={80} />
                </div>
              </>
            )
          })
        : imagesToShow.map((el, idx) => {
            return (
              <>
                <div key={idx} className={s.addedPhoto} /*onClick={() => setPostImage(el.image)}*/>
                  <Image src={el.image} alt={'photos'} height={82} width={80} />
                </div>
              </>
            )
          })}
    </div>
  )
}
