import React, { FC, useState, useRef, useEffect, MutableRefObject } from 'react'

import Image from 'next/image'

import { useTranslate } from '@/src/assets/hooks'
import expandOutline from '@/src/assets/icons/expand-outline.svg'
import img from '@/src/assets/icons/image-ouline.svg'
import rectangle11 from '@/src/assets/icons/rectangle11.svg'
import rectangle169 from '@/src/assets/icons/rectangle169.svg'
import rectangle45 from '@/src/assets/icons/rectangle45.svg'
import s from '@/src/components/profile/new-post/create-post/edit-photo/crop/Cropping.module.scss'
import { Typography } from '@/src/components/ui/typography'

type Props = {
  setAspectRatio: (aspect: number) => void
  className?: string
  aspectRatio: number
}

export const Cropping = ({ setAspectRatio, aspectRatio }: Props) => {
  const [isActive, setIsActive] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const cropRef = useRef() as MutableRefObject<HTMLDivElement>
  const { t } = useTranslate()

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
      <div onClick={() => setIsOpen(current => !current)} className={s.cropBtn}>
        <Image
          src={expandOutline}
          alt={'crop'}
          width={24}
          height={24}
          className={isOpen ? s.blueActive : s.blue}
        />
      </div>
      {isOpen && (
        <div className={s.cropOptions}>
          <div
            className={aspectRatio === 4 / 3 ? s.cropOption1Active : s.cropOption1}
            onClick={() => {
              setAspectRatio(4 / 3)
              setIsActive(current => !current)
            }}
          >
            <Typography className={aspectRatio === 4 / 3 ? s.text1Active : s.text1} variant={'h3'}>
              {' '}
              {t.profile.profileSetting.original}{' '}
            </Typography>
            <Image
              className={aspectRatio === 4 / 3 ? s.white : s.gray}
              src={img}
              alt={'image'}
              width={24}
              height={24}
            />
          </div>
          <div
            className={aspectRatio === 1 ? s.cropOptionActive : s.cropOption}
            onClick={() => {
              setAspectRatio(1)
              setIsActive(current => !current)
            }}
          >
            <Typography className={aspectRatio === 1 ? s.text1Active : s.text1} variant={'h3'}>
              {' '}
              1:1
            </Typography>
            <Image
              className={aspectRatio === 1 ? s.white : s.gray}
              src={rectangle11}
              alt={'rect11'}
              width={18}
              height={18}
            />
          </div>
          <div
            className={aspectRatio === 4 / 5 ? s.cropOptionActive : s.cropOption}
            onClick={() => {
              setAspectRatio(4 / 5)
              setIsActive(current => !current)
            }}
          >
            <Typography className={aspectRatio === 4 / 5 ? s.text1Active : s.text1} variant={'h3'}>
              {' '}
              4:5{' '}
            </Typography>
            <Image
              className={aspectRatio === 4 / 5 ? s.white : s.gray}
              src={rectangle45}
              alt={'rect45'}
              width={18}
              height={26}
            />
          </div>
          <div
            className={aspectRatio === 16 / 9 ? s.cropOptionActive : s.cropOption}
            onClick={() => {
              setAspectRatio(16 / 9)
              setIsActive(current => !current)
            }}
          >
            <Typography className={aspectRatio === 16 / 9 ? s.text1Active : s.text1} variant={'h3'}>
              {' '}
              16:9{' '}
            </Typography>
            <Image
              className={aspectRatio === 16 / 9 ? s.white : s.gray}
              src={rectangle169}
              alt={'rect169'}
              width={26}
              height={20}
            />
          </div>
        </div>
      )}
    </div>
  )
}
