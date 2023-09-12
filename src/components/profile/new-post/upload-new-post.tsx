import React, { useState } from 'react'

import { Typography } from '@mui/material'

import s from './upload-new-post.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import CroppedImage from '@/src/components/profile/new-post/CpoppedImage/CroppedImage'
import CropModal from '@/src/components/profile/new-post/modal-for-crop/CropModal'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'

export type SettingPhotoModalType = {
  // isModalOpen: boolean
  // setIsModalOpen: () => void
}

export const UploadPostPhotoModal = (props: SettingPhotoModalType) => {
  const { t } = useTranslate()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [image, setImage] = useState<string | null>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  const [imgAfterCrop, setImgAfterCrop] = useState('')
  const [croppedImage, setCroppedImage] = useState(null)

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

  const handleImageUpload = async (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]))
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

          <label className="_coverImage-holder">
            <Typography>{t.profile.selectFromComputer}</Typography>
            <input
              type="file"
              name="cover"
              onChange={handleImageUpload}
              accept="img/*"
              style={{ display: 'none' }}
            />
          </label>
        </BaseModal>
      ) : (
        <CropModal open={isModalOpen} onClose={handleButtonClick} title="Cropping">
          {!croppedImage ? (
            <CroppedImage
              image={image}
              onComplete={imagePromisse => {
                imagePromisse.then(image => {
                  setCroppedImage(image)
                })
              }}
            />
          ) : (
            <CroppedImage
              image={croppedImage}
              onComplete={imagePromisse => {
                imagePromisse.then(image => {
                  setCroppedImage(image)
                })
              }}
            />
          )}
        </CropModal>
      )}
    </div>
  )
}
