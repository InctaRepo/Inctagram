import React, { ChangeEvent, useRef, useState } from 'react'

import { CropModal } from '@/features/posts/createPost/cropModal'
import CroppedImage from '@/features/posts/createPost/croppedImage/ui/CroppedImage'
import { CropArg } from '@/features/posts/createPost/croppedImage/ui/EasyCrop'
import ImgOutline from '@/public/icon/imgOutlineIcon.svg'
import { CreateIcon } from '@/shared/assets/icons/CreateIcon'
import { RouteNames, variantIconLink } from '@/shared/const'
import { useAppDispatch, useAppSelector, useTranslate } from '@/shared/hooks'
import { setVariantIcon, sidebarVariantIconSelector } from '@/shared/sidebar'
import { Image } from '@/shared/types'
import { Button } from '@/ui/button'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'
import { clsx } from 'clsx'

import s from '@/features/posts/createPost/createNewPost.module.scss'

export const CreateNewPost = () => {
  const { t } = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState<string | undefined>(undefined)
  const [addedImages, setAddedImages] = useState<Image[]>([])
  const [draftOfImages, setDraftOfImages] = useState<Image[]>([])
  const [isDraftUploaded, setIsDraftUploaded] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArg | null>(null)
  const dispatch = useAppDispatch()
  const variantIcon = useAppSelector(sidebarVariantIconSelector)

  const imagesForUpload = isDraftUploaded ? draftOfImages : addedImages

  const handleCloseCreateModal = () => {
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
    setIsDraftUploaded(false)
    if (e.target.files && e.target.files.length) {
      setAddedImages([
        {
          activeFilter: 'none',
          fileName: e.target.files[0].name,
          image: URL.createObjectURL(e.target.files[0]),
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

  const handleSaveDraft = () => {
    setDraftOfImages([...addedImages])
    setIsModalOpen(false)
  }

  const handleOpenDraft = () => {
    if (!draftOfImages.length) {
      return
    }
    setIsDraftUploaded(true)
    setIsBaseModalOpen(false)
    setIsModalOpen(true)
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
          onClose={handleCloseCreateModal}
          open={isBaseModalOpen}
          title={t.posts.createPost.addPostPhoto}
        >
          <div className={`${s.photoContainer} ${image === null ? s.emptyPhotoContainer : ''}`}>
            <ImgOutline />
          </div>
          <div className={s.selectPhoto}>
            <Button className={s.btnSelect} onClick={selectFileHandler} variant={'primary'}>
              <Typography variant={'h3'}>{t.posts.createPost.selectFromComputer}</Typography>
            </Button>
            <Button className={s.btnOpenDraft} onClick={handleOpenDraft} variant={'outlined'}>
              <Typography className={s.btnOpenDraftText} variant={'h3'}>
                {t.posts.createPost.openDraft}
              </Typography>
            </Button>
            <input
              accept={'image/png, image/jpeg, image/jpg'}
              onChange={handleImageUpload}
              ref={inputRef}
              style={{ display: 'none' }}
              type={'file'}
            />
          </div>
        </Modal>
      ) : (
        <CropModal
          addedImages={imagesForUpload}
          croppedAreaPixels={croppedAreaPixels}
          handleSaveDraft={handleSaveDraft}
          image={image}
          onCancel={cancelButtonClick}
          onClose={handleCloseCreateModal}
          open={isModalOpen}
          setAddedImages={setAddedImages}
          setImage={setImage}
          setIsBaseModalOpen={setIsBaseModalOpen}
          title={t.posts.createPost.cropping}
        >
          <CroppedImage
            addedImages={imagesForUpload}
            croppedAreaPixels={croppedAreaPixels}
            image={image}
            setAddedImages={setAddedImages}
            setCroppedAreaPixels={setCroppedAreaPixels}
            setImage={setImage}
          />
        </CropModal>
      )}
      <div className={s.linkMenu}>
        <Button className={styles.check} onClick={handleClick} variant={'link'}>
          <CreateIcon
            className={s.logo}
            fill={variantIcon === `${RouteNames.CREATE_POST}`.slice(1) ? '#397df6' : 'current'}
          />
          <Typography className={s.text + styles.check} variant={'medium14'}>
            {t.sidebar.createPost}
          </Typography>
        </Button>
      </div>
    </div>
  )
}
