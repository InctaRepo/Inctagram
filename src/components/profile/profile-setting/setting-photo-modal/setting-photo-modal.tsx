import React, { useRef, useState } from 'react'

import AvatarEditor from 'react-avatar-editor'

import s from './setting-photo.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { Photo } from '@/src/components/profile/profile-setting/setting-photo-modal/photo'
import { Button } from '@/src/components/ui/button'
import { InputTypeFile } from '@/src/components/ui/input-type-file'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'

export type SettingPhotoModalType = {
  // isModalOpen: boolean
  // setIsModalOpen: () => void
}

export const SettingPhotoModal = (props: SettingPhotoModalType) => {
  const { t } = useTranslate()
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const editorRef = useRef<AvatarEditor>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  // const [sendAvatar, { isLoading: isAvatarLoading }] = useSendAvatarMutation()
  const handleSaveAvatar = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()

      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], 'avatar', { type: blob.type })

          convertFileToBase64(file, (file64: string) => {
            setAvatar(file64)
          })
          const formData = new FormData()

          formData.append('file', file)
          setIsModalOpen(false)
          setSelectedImage(null)
          // sendAvatar(formData)
          //     .unwrap()
          //     .then(() => {
          //         setIsModalOpen(false)
          //         setSelectedImage(null)
          //     })
        }
      })
    }
  }
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
        modalWidth={'md'}
        open={isModalOpen}
        onClose={handleButtonClick}
        title={'Add a Profile Photo'}
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
            <Photo />
          )}
        </div>

        <div className={`${s.btnContainer} ${selectedImage === null ? s.selectPhoto : s.save}`}>
          {selectedImage ? (
            <Button className={s.saveBtn} onClick={handleSaveAvatar}>
              Save
            </Button>
          ) : (
            <InputTypeFile setSelectedImage={setSelectedImage} />
          )}
        </div>
      </BaseModal>
    </div>
  )
}
