import React, { ComponentProps, ReactNode, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import { FilteredImages } from '@/features/posts/createPost/addDescription/filteredImages/ui/FilteredImages'
import { PostDescription } from '@/features/posts/createPost/addDescription/postDescription/ui/PostDescription'
import { AddDescriptionModal } from '@/features/posts/createPost/addDescription/ui/AddDescriptionModal'
import { GetCroppedImg } from '@/features/posts/createPost/croppedImage/ui/Crop'
import { CropArg } from '@/features/posts/createPost/croppedImage/ui/EasyCrop'
import s from '@/features/posts/createPost/editPhoto/filters/FiltersModal.module.scss'
import { useAddPostMutation } from '@/features/posts/service'
import ArrowBackIcon from '@/public/icon/arrowBackIcon.svg'
import { filteredImg } from '@/shared/helpers/filteredImg'
import { useTranslate } from '@/shared/hooks'
import { Image } from '@/shared/types'
import { ImageFilter } from '@/shared/types/posts/postsTypes'
import { Button } from '@/ui/button'
import { Typography } from '@/ui/typography'

export type ModalProps = {
  image?: string
  isModalOpen: boolean
  onClose?: () => void
  onCancel?: () => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  children?: ReactNode
  className?: string
  addedImages: Image[]
  setAddedImages: (addedImages: Image[]) => void
  activeFilter: ImageFilter
  setActiveFilter: (activeFilter: ImageFilter) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | undefined) => void
  openSureModal: boolean
  setOpenSureModal: (openSureModal: boolean) => void
  setIsModalOpen: (open: boolean) => void
  croppedAreaPixels: CropArg | null
} & ComponentProps<'div'>

export const FiltersModal = ({
  image,
  showSeparator = true,
  onCancel,
  isModalOpen,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  addedImages,
  setAddedImages,
  setActiveFilter,
  setOpenSureModal,
  setIsBaseModalOpen,
  setIsModalOpen,
  croppedAreaPixels,
}: ModalProps) => {
  const classNames = {
    content: getContentClassName(className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      s.actionButton
    ),
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

    if (!images) return
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
      <Button variant="text" className={s.nextButton} onClick={handleNext}>
        {t.profile.next}
      </Button>
      <Dialog open={isFiltersModalOpen} onOpenChange={open => !open && setOpenSureModal(true)}>
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              <button className={s.arrowButton} onClick={onBackHandler}>
                <ArrowBackIcon />
              </button>
              <div className={s.next}>
                <AddDescriptionModal
                  image={image}
                  addedImages={addedImages}
                  setAddedImages={setAddedImages}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  onCancel={cancelButtonHandler}
                  title={t.posts.createPost.publication}
                  isFiltersModalOpen={isFiltersModalOpen}
                  setIsFiltersModalOpen={setIsFiltersModalOpen}
                  setOpenSureModal={setOpenSureModal}
                  isDescriptionModalOpen={isDescriptionModalOpen}
                  setIsDescriptionModalOpen={setIsDescriptionModalOpen}
                  sendFilteredImg={sendFilteredImg}
                >
                  <FilteredImages addedImages={addedImages} />
                  <PostDescription value={postDescription} setValue={setPostDescription} />
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
      let newImagesPromises = addedImages.map(async (img: Image) => {
        if (!img.image) return
        const croppedImage = await GetCroppedImg(img.image, croppedAreaPixels)

        return { ...img, image: croppedImage }
      })

      let newImages = await Promise.all(newImagesPromises)

      return newImages as Image[]
    } catch (e) {
      console.error(e)
    }
  }
}
