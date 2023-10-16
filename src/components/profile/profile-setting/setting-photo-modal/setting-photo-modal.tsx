import React, { FC, useRef, useState } from 'react'

import AvatarEditor from 'react-avatar-editor'

import s from './setting-photo.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import { Button } from '@/src/components/ui/button'
import { InputTypeFile } from '@/src/components/ui/input-type-file'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'

type SettingPhotoModalType = {
  avatar: string | null
  setAvatar: (avatar: string | null) => void
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  selectedImage: File | null
  setSelectedImage: (selectedImage: File | null) => void
  editorRef: React.RefObject<AvatarEditor>
  handleSavePhoto: () => void
}

export const SettingPhotoModal: FC<SettingPhotoModalType> = ({
  avatar,
  setAvatar,
  isModalOpen,
  setIsModalOpen,
  selectedImage,
  setSelectedImage,
  editorRef,
  handleSavePhoto,
}) => {
  const { t } = useTranslate()

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })

  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }
  const handleButtonClick = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  // if (!isModalOpen) return null
  return (
    <div className={s.container}>
      {avatar && (
        <img
          src={avatar}
          alt="ava"
          style={{
            borderRadius: '50%',
            width: 196,
            height: 196,
            marginTop: -210,
            marginBottom: 24,
          }}
        />
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
        <div
          className={`${s.photoContainer} ${selectedImage === null ? s.emptyPhotoContainer : ''}`}
        >
          {selectedImage ? (
            <AvatarEditor
              ref={editorRef}
              image={selectedImage}
              width={316}
              height={316}
              color={[23, 23, 23, 0.6]}
              backgroundColor={'black'}
              scale={1}
              borderRadius={155}
              position={position}
              onPositionChange={handlePositionChange}
              crossOrigin="anonymous"
              disableBoundaryChecks={false}
            />
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
            <InputTypeFile setSelectedImage={setSelectedImage} />
          )}
        </div>
      </BaseModal>
    </div>
  )
}
