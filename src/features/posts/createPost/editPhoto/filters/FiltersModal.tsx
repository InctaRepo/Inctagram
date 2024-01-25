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
import { Image } from '@/features/posts/createPost/CreateNewPost'
import s from '@/features/posts/createPost/editPhoto/filters/FiltersModal.module.scss'
import { useAddPostMutation } from '@/features/posts/service'
import ArrowBackIcon from '@/public/icon/arrowBackIcon.svg'
import { filteredImg } from '@/shared/helpers/filteredImg'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Typography } from '@/ui/typography'

export type ModalProps = {
  image?: string
  isModalOpen: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  children?: ReactNode
  className?: string
  addedImages: Image[]
  setAddedImages: (addedImages: Image[]) => void
  activeFilter: string
  setActiveFilter: (activeFilter: string) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | undefined) => void
  openSureModal: boolean
  setOpenSureModal: (openSureModal: boolean) => void
  setIsModalOpen: (open: boolean) => void
} & ComponentProps<'div'>

export const FiltersModal = ({
  image,
  showSeparator = true,
  onAction,
  onCancel,
  isModalOpen,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  addedImages,
  setAddedImages,
  activeFilter,
  setActiveFilter,
  setOpenSureModal,
  setIsBaseModalOpen,
  setIsModalOpen,
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
  const [value, setValue] = useState('')
  const { t } = useTranslate()
  const [addPost] = useAddPostMutation()
  const actionButtonHandler = () => {
    onAction?.()
  }
  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onBackHandler() {
    setIsFiltersModalOpen(false)
    setIsModalOpen(true)
  }

  const handleNext = () => {
    setIsFiltersModalOpen(true)
    setIsBaseModalOpen(false)
    //setIsModalOpen(false)
  }

  const formData = new FormData()
  const sendFilteredImg = async (activeFilter: string) => {
    const updatedImages = await Promise.all(
      addedImages.map(async (el, idx) => {
        const filteredImage = await filteredImg(el.image, activeFilter)

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

    formData.append('description', value)

    addPost(formData)
      .unwrap()
      .then(() => {
        //setAddedImages(updatedImages)
        setActiveFilter('')
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
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
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
                  <FilteredImages addedImages={addedImages} activeFilter={activeFilter} />
                  <PostDescription value={value} setValue={setValue} />
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
