import React, { useRef, useState } from 'react'
import CreateIcon from '@/src/assets/icons/create-icon'
import { ImgOutline } from '@/src/assets/icons/image-outline'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { LinkMenu } from '@/src/features/profile/linkMenu'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { Button } from '@/src/shared/ui/button'
import { Modal } from '@/src/shared/ui/Modal'
import { Typography } from '@/src/shared/ui/typography'
import CroppedImage from '../createPost/croppedImage/CroppedImage'
import CropModal from '../createPost/modalForCrop/CropModal'
import s from './CreateNewPost.module.scss'

export type SettingPhotoModalProps = {
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

export type Image = {
  image?: string
  id?: string
  croppedImage?: string
}

export const CreatePostModal = ({ variantIcon }: SettingPhotoModalProps) => {
  const { t } = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState<string | undefined>(undefined)
  const [addedImages, setAddedImages] = useState<Image[]>([])

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
        <Modal
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
        </Modal>
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
      <div className={s.linkMenu}>
        <LinkMenu
          nameLink={t.profile.createPost}
          link={''}
          handleClick={handleClick}
          variantIcon={variantIcon}
        >
          <CreateIcon fill={variantIcon === 'create' ? '#397df6' : 'current'} className={s.logo} />
        </LinkMenu>
      </div>
    </div>
  )
}
