import React, { ComponentProps, ReactNode, useState } from 'react'

import { FilteredImages } from '@/features/posts/createPost/addDescription/filteredImages/ui/FilteredImages'
import { PostDescription } from '@/features/posts/createPost/addDescription/postDescription/ui/PostDescription'
import { AddDescriptionModal } from '@/features/posts/createPost/addDescription/ui/AddDescriptionModal'
import { GetCroppedImg } from '@/features/posts/createPost/croppedImage/ui/Crop'
import { CropArg } from '@/features/posts/createPost/croppedImage/ui/EasyCrop'
import { useAddPostMutation } from '@/features/posts/service'
import ArrowBackIcon from '@/public/icon/arrowBackIcon.svg'
import { filteredImg } from '@/shared/helpers/filteredImg'
import { useTranslate } from '@/shared/hooks'
import { Image } from '@/shared/types'
import { ImageFilter } from '@/shared/types/posts/postsTypes'
import { Button } from '@/ui/button'
import { Typography } from '@/ui/typography'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import s from '@/features/posts/createPost/editPhoto/filters/FiltersModal.module.scss'

export type ModalProps = {
  actionButtonName?: string // if no props , visibility = hidden
  activeFilter: ImageFilter
  addedImages: Image[]
  cancelButtonName?: string // if no props , visibility = hidden
  children?: ReactNode
  className?: string
  croppedAreaPixels: CropArg | null
  image?: string
  isModalOpen: boolean
  onCancel?: () => void
  onClose?: () => void
  openSureModal: boolean
  setActiveFilter: (activeFilter: ImageFilter) => void
  setAddedImages: (addedImages: Image[]) => void
  setImage: (image: string | undefined) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setIsModalOpen: (open: boolean) => void
  setOpenSureModal: (openSureModal: boolean) => void
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
} & ComponentProps<'div'>

export const FiltersModal = ({
  actionButtonName,
  addedImages,
  cancelButtonName,
  children,
  className,
  croppedAreaPixels,
  image,
  isModalOpen,
  onCancel,
  setActiveFilter,
  setAddedImages,
  setIsBaseModalOpen,
  setIsModalOpen,
  setOpenSureModal,
  showSeparator = true,
  title,
}: ModalProps) => {
  const classNames = {
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      s.actionButton
    ),
    content: getContentClassName(className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
  }
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
  const [postDescription, setPostDescription] = useState('')
  const { t } = useTranslate()
  const [addPost] = useAddPostMutation()

  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onBackHandler() {
    setIsFiltersModalOpen(false)
    setIsModalOpen(true)
  }

  const handleNext = async () => {
    setIsFiltersModalOpen(true)
    setIsBaseModalOpen(false)
    const images = await applyCropping(croppedAreaPixels, addedImages)

    if (!images) {
      return
    }
    setAddedImages(images)
  }

  const formData = new FormData()

  const sendFilteredImg = async () => {
    await Promise.all(
      addedImages.map(async (el, idx) => {
        const filteredImage = await filteredImg(el.image, el.activeFilter)

        if (!filteredImage) {
          return null
        }
        const file = new File([filteredImage], el.fileName ? el.fileName : '', {
          type: 'image/jpeg',
        })

        formData.append('images', file)

        return {
          image: filteredImage,
        }
      })
    )

    formData.append('description', postDescription)

    addPost(formData)
      .unwrap()
      .then(() => {
        setActiveFilter('none')
        setIsFiltersModalOpen(false)
        setIsDescriptionModalOpen(false)
        setIsModalOpen(false)
      })
  }

  return (
    <div>
      <Button className={s.nextButton} onClick={handleNext} variant={'text'}>
        {t.profile.next}
      </Button>
      <Dialog onOpenChange={open => !open && setOpenSureModal(true)} open={isFiltersModalOpen}>
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              <button className={s.arrowButton} onClick={onBackHandler}>
                <ArrowBackIcon />
              </button>
              <div className={s.next}>
                <AddDescriptionModal
                  addedImages={addedImages}
                  disabledDescription={postDescription?.length > 500 ?? false}
                  image={image}
                  isDescriptionModalOpen={isDescriptionModalOpen}
                  isFiltersModalOpen={isFiltersModalOpen}
                  isModalOpen={isModalOpen}
                  onCancel={cancelButtonHandler}
                  sendFilteredImg={sendFilteredImg}
                  setAddedImages={setAddedImages}
                  setIsDescriptionModalOpen={setIsDescriptionModalOpen}
                  setIsFiltersModalOpen={setIsFiltersModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  setOpenSureModal={setOpenSureModal}
                  title={t.posts.createPost.publication}
                >
                  <FilteredImages addedImages={addedImages} />
                  <PostDescription
                    disabledDescription={postDescription?.length > 500 ?? false}
                    setValue={setPostDescription}
                  />
                </AddDescriptionModal>
              </div>

              <DialogTitle className={s.DialogTitle}>
                <Typography variant={'h1'}>{title}</Typography>
                <Separator className={classNames.separator} />
              </DialogTitle>
            </div>
            <div className={s.contentBox}>{children}</div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

function getContentClassName(className?: string) {
  return clsx(className, s.DialogContent)
}

export const applyCropping = async (croppedAreaPixels: CropArg | null, addedImages: Image[]) => {
  if (croppedAreaPixels && addedImages.length) {
    try {
      const newImagesPromises = addedImages.map(async (img: Image) => {
        if (!img.image) {
          return
        }
        const croppedImage = await GetCroppedImg(img.image, croppedAreaPixels)

        return { ...img, image: croppedImage }
      })

      const newImages = await Promise.all(newImagesPromises)

      return newImages as Image[]
    } catch (e) {
      console.error(e)
    }
  }
}
