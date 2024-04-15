import React, { ChangeEvent, useRef } from 'react'

import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Typography } from '@/ui/typography'

import s from '@/ui/inputTypeFile/inputTypeFile.module.scss'

type InputTypeFileProps = {
  setErrorMessage?: (errorMessage: string) => void
  setSelectedImage: (image: File) => void
}
export const InputTypeFile = ({ setErrorMessage, setSelectedImage }: InputTypeFileProps) => {
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
      <Button className={s.btn} onClick={selectFileHandler} variant={'primary'}>
        <Typography variant={'h3'}>
          {t.profileSetting.generalInformation.selectFromComputer}
        </Typography>
      </Button>
      <input
        accept={'image/png, image/jpeg, image/jpg'}
        onChange={uploadHandler}
        ref={inputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
    </div>
  )
}
