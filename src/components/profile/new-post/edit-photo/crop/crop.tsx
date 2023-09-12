import React, { FC, useState, useRef, useEffect, MutableRefObject } from 'react'

import Image from 'next/image'

import s from './crop.module.scss'

import expandOutline from '@/src/assets/icons/expand-outline.svg'
import img from '@/src/assets/icons/image-ouline.svg'
import rectangle11 from '@/src/assets/icons/rectangle11.svg'
import rectangle169 from '@/src/assets/icons/rectangle169.svg'
import rectangle45 from '@/src/assets/icons/rectangle45.svg'

type PropsType = {
  setAspectRatio: (aspect: number) => void
  className?: string
}

export const Crop: FC<PropsType> = ({ setAspectRatio }) => {
  const [isOpen, setIsOpen] = useState(false)
  const cropRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cropRef.current && !e.composedPath().includes(cropRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={cropRef}>
      <div onClick={() => setIsOpen(true)} className={s.cropBtn}>
        <Image src={expandOutline} alt={'crop'} width={24} height={24} color={'blue'} />
      </div>
      {isOpen && (
        <div className={s.cropOptions}>
          <div className={s.cropOption1} onClick={() => setAspectRatio(4 / 3)}>
            Original
            <Image src={img} alt={'image'} width={24} height={24} />
          </div>
          <div className={s.cropOption} onClick={() => setAspectRatio(1)}>
            1:1
            <Image src={rectangle11} alt={'rect11'} width={18} height={18} />
          </div>
          <div className={s.cropOption} onClick={() => setAspectRatio(4 / 5)}>
            4:5
            <Image src={rectangle45} alt={'rect45'} width={18} height={26} />
          </div>
          <div className={s.cropOption} onClick={() => setAspectRatio(16 / 9)}>
            16:9
            <Image src={rectangle169} alt={'rect169'} width={26} height={20} />
          </div>
        </div>
      )}
    </div>
  )
}
