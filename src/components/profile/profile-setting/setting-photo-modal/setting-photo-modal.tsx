import React, { ChangeEvent, FC, useState } from 'react'

import Slider from '@mui/material/Slider'
import AvatarEditor from 'react-avatar-editor'

import s from './setting-photo.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { CloseIcon } from '@/src/assets/icons/close-icon'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import { Button } from '@/src/components/ui/button'
import { InputTypeFile } from '@/src/components/ui/input-type-file'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'

type SettingPhotoModalType = {
  avatar?: string | null
  setAvatar?: (avatar: string | null) => void
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  selectedImage: File | null
  setSelectedImage: (selectedImage: File | null) => void
  editorRef: React.RefObject<AvatarEditor>
  handleSavePhoto: () => void
  croppedAvatar: string | null | Blob
  setCroppedAvatar: (croppedAvatar: string | null) => void
}

export const SettingPhotoModal: FC<SettingPhotoModalType> = ({
  avatar,
  setAvatar,
  croppedAvatar,
  setCroppedAvatar,
  isModalOpen,
  setIsModalOpen,
  selectedImage,
  setSelectedImage,
  editorRef,
  handleSavePhoto,
}) => {
  const { t } = useTranslate()
  const [slideValue, setSlideValue] = useState(10)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  const [errorMessage, setErrorMessage] = useState('')
  const showError = !!errorMessage && errorMessage.length > 0

  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }
  const handleButtonClick = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setErrorMessage('')
  }

  const isError =
    errorMessage?.includes('Error! Photo size must be less than 10 MB') ||
    errorMessage?.includes('Ошибка! Размер фото не должен превышать 10 MB') ||
    errorMessage?.includes('Error! The format of the uploaded photo must be PNG or JPEG') ||
    errorMessage?.includes('Ошибка! Формат загружаемой фотографии должен быть PNG или JPEG')

  const handleSliderChange = (e: Event, value: number | number[]) => {
    setSlideValue(value as number)
  }

  // if (!isModalOpen) return null
  const deleteAvatarHandler = () => {
    setCroppedAvatar(null)
  }

  return (
    <div className={s.container}>
      {croppedAvatar && (
        <>
          <img
            src={String(croppedAvatar)}
            alt="ava"
            style={{
              borderRadius: '50%',
              width: 196,
              height: 196,
              marginBottom: 20,
            }}
          />
          <CloseIcon className={s.deleteAvatarIcon} onClick={deleteAvatarHandler} />
        </>
      )}
      <Button variant="outlined" className={s.photoBtn} onClick={() => setIsModalOpen(true)}>
        <Typography variant={'h3'} className={s.addBtn}>
          {t.profile.profileSetting.addAProfilePhoto}
        </Typography>
      </Button>
      {/*actionButtonName={'SAVE'} onAction={handleSaveAvatar}*/}
      <BaseModal
        className={s.baseModal}
        modalWidth={'md'}
        open={isModalOpen}
        onClose={handleButtonClick}
        title={t.profile.profileSetting.addAProfilePhoto}
      >
        <div className={s.errorContainer}>
          {showError && (
            <div className={s.error}>
              <Typography color="primary" variant="small">
                {errorMessage}
              </Typography>
            </div>
          )}
        </div>
        <div
          className={`${s.photoContainer} ${selectedImage === null ? s.emptyPhotoContainer : ''} ${
            showError ? s.errorPhotoContainer : ''
          }`}
        >
          {selectedImage ? (
            <>
              <AvatarEditor
                ref={editorRef}
                image={selectedImage}
                width={282}
                height={290}
                color={[23, 23, 23, 0.6]}
                backgroundColor={'black'}
                scale={slideValue / 10}
                borderRadius={155}
                position={position}
                onPositionChange={handlePositionChange}
                crossOrigin="anonymous"
                disableBoundaryChecks={false}
              />
              <Slider
                min={10}
                max={50}
                sx={{
                  margin: '0 auto',
                  width: '50%',
                  color: 'white',
                }}
                size="small"
                defaultValue={slideValue}
                value={slideValue}
                onChange={handleSliderChange}
              />
            </>
          ) : (
            <ImgOutline />
          )}
        </div>

        <div className={`${s.btnContainer} ${selectedImage === null ? s.selectPhoto : s.save}`}>
          {selectedImage ? (
            <Button className={s.saveBtn} onClick={handleSavePhoto}>
              {t.profile.profileSetting.save}
            </Button>
          ) : (
            <InputTypeFile setSelectedImage={setSelectedImage} setErrorMessage={setErrorMessage} />
          )}
        </div>
      </BaseModal>
    </div>
  )
}
