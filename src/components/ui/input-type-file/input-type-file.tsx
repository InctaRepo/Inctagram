import React, { ChangeEvent, useRef } from 'react'

import s from './input-type-file.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'

type InputTypeFileProps = {
  setSelectedImage: (image: File) => void
}
export const InputTypeFile = ({ setSelectedImage }: InputTypeFileProps) => {
  const { t } = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 10000000) {
        setSelectedImage(file)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  return (
    <div>
      <Button variant={'primary'} onClick={selectFileHandler} className={s.btn}>
        <Typography>{t.profile.selectFromComputer}</Typography>
      </Button>
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={uploadHandler}
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
  )
}
