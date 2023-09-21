import React, { useRef, useState } from 'react'

import { Typography } from '@mui/material'

import s from './upload-new-post.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import CroppedImage from '@/src/components/profile/new-post/CpoppedImage/CroppedImage'
import CropModal from '@/src/components/profile/new-post/modal-for-crop/CropModal'
import { Button } from '@/src/components/ui/button'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'

export type SettingPhotoModalType = {
  // isModalOpen: boolean
  // setIsModalOpen: () => void
}

export type ImageType = {
  id: string
  image: string
}

export const UploadPostPhotoModal = (props: SettingPhotoModalType) => {
  const { t } = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [image, setImage] = useState<string | null>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  const [addedImages, setAddedImages] = useState<ImageType[]>([])

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }
  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }
  const handleButtonClick = () => {
    setIsModalOpen(false)
    setImage(null)
  }
  const cancelButtonClick = () => {
    setImage(null)
  }

  const handleImageUpload = async (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    setAddedImages([
      { id: (addedImages.length + 1).toString(), image: URL.createObjectURL(e.target.files[0]) },
    ])
  }
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <div className={s.container}>
      {!image ? (
        <BaseModal
          modalWidth={'md'}
          open={isModalOpen}
          onClose={handleButtonClick}
          title={t.profile.addPostPhoto}
        >
          <div className={`${s.photoContainer} ${image === null ? s.emptyPhotoContainer : ''}`}>
            <ImgOutline />
          </div>
          <div>
            <Button variant={'primary'} onClick={selectFileHandler} className={s.btn}>
              <Typography>{t.profile.selectFromComputer}</Typography>
            </Button>
            <input
              type="file"
              ref={inputRef}
              name="cover"
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: 'none' }}
            />
          </div>
        </BaseModal>
      ) : (
        <CropModal
          open={isModalOpen}
          onClose={handleButtonClick}
          onCancel={cancelButtonClick}
          title="Cropping"
        >
          <CroppedImage image={image} addedImages={addedImages} setAddedImages={setAddedImages} />
        </CropModal>
      )}
    </div>
  )
}
