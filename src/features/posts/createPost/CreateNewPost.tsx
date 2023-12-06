import { clsx } from 'clsx'
import React, { ChangeEvent, useRef, useState } from 'react'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import CreateIcon from '@/src/shared/assets/icons/CreateIcon'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useAppDispatch, useAppSelector } from '@/src/shared/hooks'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { sidebarVariantIconSelector } from '@/src/shared/sidebar/model/selectors/sidebarVariantIconSelector'
import { setVariantIcon } from '@/src/shared/sidebar/model/slice/menuSlice'
import { Button } from '@/src/shared/ui/button'
import { Modal } from '@/src/shared/ui/Modal'
import { Typography } from '@/src/shared/ui/typography'
import s from './CreateNewPost.module.scss'
import CroppedImage from './croppedImage/ui/CroppedImage'
import CropModal from './modalForCrop/ui/CropModal'

export type Image = {
  image?: string
  id?: string
  croppedImage?: string
  fileName?: string
}

export const CreatePostModal = () => {
  const { t } = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState<string | undefined>(undefined)
  const [addedImages, setAddedImages] = useState<Image[]>([])
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)
  const handleButtonClick = () => {
    setIsBaseModalOpen(false)
    setImage(undefined)
    setIsModalOpen(false)
    dispatch(setVariantIcon(null))
  }
  const cancelButtonClick = () => {
    setIsBaseModalOpen(false)
    setIsModalOpen(false)
    dispatch(setVariantIcon(null))
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setAddedImages([
        {
          image: URL.createObjectURL(e.target.files[0]),
        },
      ])
      setIsBaseModalOpen(false)
      setIsModalOpen(true)
    }
  }

  const handleClick = () => {
    setIsBaseModalOpen(true)
    dispatch(setVariantIcon(`${RouteNames.CREATE_POST}`.slice(1)))
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const styles = {
    check: clsx(`${RouteNames.CREATE_POST}`.startsWith('/' + variantIcon) && s.active),
  }

  return (
    <div className={s.container}>
      {isBaseModalOpen ? (
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
        <Button variant="link" onClick={handleClick} className={s.btn}>
          <Typography variant="medium14" className={s.text}>
            <div>
              <CreateIcon
                fill={variantIcon === `${RouteNames.CREATE_POST}`.slice(1) ? '#397df6' : 'current'}
                className={s.logo}
              />
            </div>
            <div className={styles.check}>{t.profile.createPost}</div>
          </Typography>
        </Button>
      </div>
    </div>
  )
}
