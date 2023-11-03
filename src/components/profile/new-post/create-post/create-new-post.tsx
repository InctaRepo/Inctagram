import React, { useRef, useState } from 'react'

import s from './create-new-post.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import CreateIcon from '@/src/assets/icons/create-icon'
import { ImgOutline } from '@/src/assets/icons/image-outline'
// eslint-disable-next-line import/namespace,import/default
import { LinkMenu } from '@/src/components/profile/links'
import CroppedImage from '@/src/components/profile/new-post/create-post/cropped-image/cropped-image'
import CropModal from '@/src/components/profile/new-post/create-post/modal-for-crop/crop-modal'
import { Button } from '@/src/components/ui/button'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'

export type SettingPhotoModalType = {
  variantIcon?:
    | 'search'
    | 'home'
    | 'my-profile'
    | 'create'
    | 'message'
    | 'logout'
    | 'favorites'
    | undefined
}

export type ImageType = {
  image?: string
  id?: string
  croppedImage?: string
}

export const CreatePostModal = ({ variantIcon }: SettingPhotoModalType) => {
  const { t } = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState<string | undefined>(undefined)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectRatio, setAspectRatio] = useState(4 / 3)
  const [addedImages, setAddedImages] = useState<ImageType[]>([])

  const handleButtonClick = () => {
    setIsBaseModalOpen(false)
    setImage(undefined)
    setIsModalOpen(false)
  }
  const cancelButtonClick = () => {
    setIsBaseModalOpen(false)
    setIsModalOpen(false)
  }

  const handleImageUpload = async (e: any) => {
    // setImage(URL.createObjectURL(e.target.files[0]))
    setAddedImages([
      {
        id: (addedImages.length + 1).toString(),
        image: URL.createObjectURL(e.target.files[0]),
      },
    ])
    setIsBaseModalOpen(false)
    setIsModalOpen(true)
  }

  const handleClick = () => {
    setIsBaseModalOpen(true)
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <div className={s.container}>
      {!addedImages.length && isBaseModalOpen ? (
        <BaseModal
          className={s.baseModal}
          modalWidth={'md'}
          open={isBaseModalOpen}
          onClose={handleButtonClick}
          title={t.profile.addPostPhoto}
        >
          <div className={`${s.photoContainer} ${image === null ? s.emptyPhotoContainer : ''}`}>
            <ImgOutline />
          </div>
          <div className={s.selectPhoto}>
            <Button variant={'primary'} onClick={selectFileHandler} className={s.btn}>
              <Typography variant={'h3'}>{t.profile.selectFromComputer}</Typography>
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
          image={image}
          open={isModalOpen}
          onClose={handleButtonClick}
          onCancel={cancelButtonClick}
          title={t.profile.addNewPost.cropping}
          addedImages={addedImages}
          setAddedImages={setAddedImages}
          isBaseModalOpen={isBaseModalOpen}
          setIsBaseModalOpen={setIsBaseModalOpen}
          setImage={setImage}
        >
          <CroppedImage
            image={image}
            setImage={setImage}
            addedImages={addedImages}
            setAddedImages={setAddedImages}
          />
        </CropModal>
      )}
      <LinkMenu
        nameLink={t.profile.createPost}
        link={'my-profile'}
        handleClick={handleClick}
        variantIcon={variantIcon}
      >
        <CreateIcon color={variantIcon === 'create' ? '#397df6' : 'white'} />
      </LinkMenu>
    </div>
  )
}
