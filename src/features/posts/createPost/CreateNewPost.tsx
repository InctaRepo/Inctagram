import React, { ChangeEvent, useRef, useState } from 'react'

import { clsx } from 'clsx'

import s from '@/features/posts/createPost/createNewPost.module.scss'
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
          image: URL.createObjectURL(e.target.files[0]),
          fileName: e.target.files[0].name,
          activeFilter: 'none',
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
    if (!draftOfImages.length) return
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
          open={isBaseModalOpen}
          onClose={handleCloseCreateModal}
          title={t.posts.createPost.addPostPhoto}
        >
          <div className={`${s.photoContainer} ${image === null ? s.emptyPhotoContainer : ''}`}>
            <ImgOutline />
          </div>
          <div className={s.selectPhoto}>
            <Button variant={'primary'} onClick={selectFileHandler} className={s.btnSelect}>
              <Typography variant={'h3'}>{t.posts.createPost.selectFromComputer}</Typography>
            </Button>
            <Button variant={'outlined'} onClick={handleOpenDraft} className={s.btnOpenDraft}>
              <Typography className={s.btnOpenDraftText} variant={'h3'}>
                {t.posts.createPost.openDraft}
              </Typography>
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
          onClose={handleCloseCreateModal}
          onCancel={cancelButtonClick}
          title={t.posts.createPost.cropping}
          addedImages={imagesForUpload}
          setAddedImages={setAddedImages}
          setIsBaseModalOpen={setIsBaseModalOpen}
          setImage={setImage}
          handleSaveDraft={handleSaveDraft}
          croppedAreaPixels={croppedAreaPixels}
        >
          <CroppedImage
            image={image}
            setImage={setImage}
            addedImages={imagesForUpload}
            setAddedImages={setAddedImages}
            croppedAreaPixels={croppedAreaPixels}
            setCroppedAreaPixels={setCroppedAreaPixels}
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
            {t.sidebar.createPost}
          </Typography>
        </Button>
      </div>
    </div>
  )
}
