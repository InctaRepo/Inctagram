import React, { ChangeEvent, useRef, useState } from 'react'

import { clsx } from 'clsx'

import s from '@/src/features/posts/createPost/createNewPost.module.scss'
import { CropModal } from '@/src/features/posts/createPost/cropModal'
import CroppedImage from '@/src/features/posts/createPost/croppedImage/ui/CroppedImage'
import { CreateIcon } from '@/src/shared/assets/icons/CreateIcon'
import { RouteNames, variantIconLink } from '@/src/shared/const'
import { useAppDispatch, useAppSelector, useTranslate } from '@/src/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/src/shared/sidebar'
import { Button } from '@/src/shared/ui/button'
import { Modal } from '@/src/shared/ui/modal'
import { Typography } from '@/src/shared/ui/typography'
import ImgOutline from 'public/icon/imgOutlineIcon.svg'

export type Image = {
  image?: string
  id?: string
  croppedImage?: string
  fileName?: string
}

export const CreateNewPost = () => {
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
          fileName: e.target.files[0].name,
        },
      ])
      setIsBaseModalOpen(false)
      setIsModalOpen(true)
    }
  }

  const handleClick = () => {
    setIsBaseModalOpen(true)
    dispatch(setVariantIcon(`${RouteNames.CREATE_POST}`.slice(1) as variantIconLink))
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const styles = {
    check: clsx(s.btn, `${RouteNames.CREATE_POST}`.startsWith('/' + variantIcon) && s.active),
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
            <Button variant={'primary'} onClick={selectFileHandler} className={s.btnSelect}>
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
        <Button variant="link" onClick={handleClick} className={styles.check}>
          <CreateIcon
            fill={variantIcon === `${RouteNames.CREATE_POST}`.slice(1) ? '#397df6' : 'current'}
            className={s.logo}
          />
          <Typography variant="medium14" className={s.text + styles.check}>
            {t.profile.createPost}
          </Typography>
        </Button>
      </div>
    </div>
  )
}
