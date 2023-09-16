import React, { useEffect, useState, useRef, MutableRefObject } from 'react'

import Image from 'next/image'

import s from './add.module.scss'

import img from '@/src/assets/icons/image-ouline.svg'
import { PlusCircleOutline } from '@/src/assets/icons/plus-circle-outline'

export const Add = ({ image }) => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const addRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addRef.current && !e.composedPath().includes(addRef.current)) {
        setIsAddOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={addRef} className={s.wrapper}>
      <div className={s.addBtn}>
        <Image
          src={img}
          alt={'add photo'}
          onClick={() => setIsAddOpen(true)}
          width={24}
          height={24}
          className={s.blue}
        />
      </div>
      {isAddOpen && (
        <div className={s.addContainer}>
          <div className={s.addedPhoto}>
            <Image src={image} width={80} height={82} className={s.photo} alt={'added photo'} />
          </div>
          <div className={s.addPhotoBtn}>
            <PlusCircleOutline />
          </div>
        </div>
      )}
    </div>
  )
}
