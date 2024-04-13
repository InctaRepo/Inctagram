import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

import Crop from '@/public/icon/crop.svg'
import Img from '@/public/icon/image.svg'
import Rectangle11 from '@/public/icon/rectangle11.svg'
import Rectangle45 from '@/public/icon/rectangle45.svg'
import Rectangle169 from '@/public/icon/rectangle169.svg'
import { useTranslate } from '@/shared/hooks'
import { Typography } from '@/ui/typography'

import s from '@/features/posts/createPost/editPhoto/crop/Cropping.module.scss'

type Props = {
  aspectRatio: number
  className?: string
  setAspectRatio: (aspect: number) => void
}

export const Cropping = ({ aspectRatio, setAspectRatio }: Props) => {
  const [, setIsActive] = useState(false)
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
      <div className={s.cropBtn} onClick={() => setIsOpen(current => !current)}>
        <Crop alt={'crop'} className={isOpen ? s.blueActive : s.blue} height={24} width={24} />
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
              {t.profileSetting.generalInformation.original}{' '}
            </Typography>
            <Img
              alt={'image'}
              className={aspectRatio === 4 / 3 ? s.white : s.gray}
              height={24}
              width={24}
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
            <Rectangle11
              alt={'rect11'}
              className={aspectRatio === 1 ? s.white : s.gray}
              height={18}
              width={18}
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
            <Rectangle45
              alt={'rect45'}
              className={aspectRatio === 4 / 5 ? s.white : s.gray}
              height={26}
              width={18}
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
            <Rectangle169
              alt={'rect169'}
              className={aspectRatio === 16 / 9 ? s.white : s.gray}
              height={20}
              width={26}
            />
          </div>
        </div>
      )}
    </div>
  )
}
