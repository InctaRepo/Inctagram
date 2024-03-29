import React, { ChangeEvent, useRef } from 'react'

import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import s from '@/ui/inputTypeFile/inputTypeFile.module.scss'
import { Typography } from '@/ui/typography'

type InputTypeFileProps = {
  setSelectedImage: (image: File) => void
  setErrorMessage?: (errorMessage: string) => void
}
export const InputTypeFile = ({ setSelectedImage, setErrorMessage }: InputTypeFileProps) => {
  const { t } = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (
        (file.size < 10000000 && file.type === 'image/jpg') ||
        (file.size < 10000000 && file.type === 'image/png') ||
        (file.size < 10000000 && file.type === 'image/jpeg')
      ) {
        if (setErrorMessage) {
          setErrorMessage('')
          setSelectedImage(file)
        }
      } else if (file.size >= 10000000) {
        if (setErrorMessage) {
          setErrorMessage(
            t.profileSetting.generalInformation.generalInformationErrors.avatarError.size
          )
        }
      } else {
        if (setErrorMessage) {
          setErrorMessage(
            t.profileSetting.generalInformation.generalInformationErrors.avatarError.format
          )
        }
      }
    }
  }

  return (
    <div>
      <Button variant={'primary'} onClick={selectFileHandler} className={s.btn}>
        <Typography variant={'h3'}>
          {t.profileSetting.generalInformation.selectFromComputer}
        </Typography>
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
