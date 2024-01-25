import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

import s from '@/features/posts/createPost/editPhoto/crop/Cropping.module.scss'
import Crop from '@/public/icon/crop.svg'
import Img from '@/public/icon/image.svg'
import Rectangle11 from '@/public/icon/rectangle11.svg'
import Rectangle169 from '@/public/icon/rectangle169.svg'
import Rectangle45 from '@/public/icon/rectangle45.svg'
import { useTranslate } from '@/shared/hooks'
import { Typography } from '@/ui/typography'

type Props = {
  setAspectRatio: (aspect: number) => void
  className?: string
  aspectRatio: number
}

export const Cropping = ({ setAspectRatio, aspectRatio }: Props) => {
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
      <div onClick={() => setIsOpen(current => !current)} className={s.cropBtn}>
        <Crop alt={'crop'} width={24} height={24} className={isOpen ? s.blueActive : s.blue} />
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
              className={aspectRatio === 4 / 3 ? s.white : s.gray}
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
            <Rectangle11
              className={aspectRatio === 1 ? s.white : s.gray}
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
            <Rectangle45
              className={aspectRatio === 4 / 5 ? s.white : s.gray}
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
            <Rectangle169
              className={aspectRatio === 16 / 9 ? s.white : s.gray}
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
