import React, { FC, useState, useRef, useEffect, MutableRefObject } from 'react'

import Image from 'next/image'

import s from './buttons.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import dots from '@/src/assets/icons/dots.svg'
import edit from '@/src/assets/icons/edit.svg'
import trash from '@/src/assets/icons/trash.svg'
import { Typography } from '@/src/components/ui/typography'

type PropsType = {}

export const Buttons: FC<PropsType> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const editRef = useRef() as MutableRefObject<HTMLDivElement>
  const { t } = useTranslate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !e.composedPath().includes(editRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={editRef}>
      <div onClick={() => setIsOpen(true)} className={s.editBtn}>
        <Image src={dots} alt={'edit'} width={24} height={24} className={s.blue} />
      </div>
      {isOpen && (
        <div className={s.editOptions}>
          <div className={s.editOption1}>
            <Image src={edit} alt={'edit'} width={24} height={24} />
            <Typography variant={'regular14'}>{t.profile.profileSetting.edit}</Typography>
          </div>
          <div className={s.editOption}>
            <Image src={trash} alt={'trash'} width={24} height={24} />
            <Typography variant={'regular14'}> {t.profile.profileSetting.delete}</Typography>
          </div>
        </div>
      )}
    </div>
  )
}
