import React, { ComponentProps, ReactNode, useRef, useState } from 'react'

import { AreYouSureCreatePostModal } from '@/entities/post/createPost/areYouSureСreatePostModal'
import { CropArg } from '@/features/posts/createPost/croppedImage/ui/EasyCrop'
import { FiltersModal } from '@/features/posts/createPost/editPhoto/filters/FiltersModal'
import { SelectedImages } from '@/features/posts/createPost/editPhoto/filters/selectedImages/SelectedImages'
import ArrowBackIcon from '@/public/icon/arrowBackIcon.svg'
import { useTranslate } from '@/shared/hooks'
import { Image } from '@/shared/types'
import { ImageFilter } from '@/shared/types/posts/postsTypes'
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

import s from '@/features/posts/createPost/cropModal/ui/cropModal.module.scss'

type Props = {
  actionButtonName?: string // if no props , visibility = hidden
  addedImages: Image[]
  cancelButtonName?: string // if no props , visibility = hidden
  children?: ReactNode
  className?: string
  croppedAreaPixels: CropArg | null
  handleSaveDraft: () => void
  image?: string
  onAction?: () => void
  onCancel?: () => void
  onClose?: () => void
  open: boolean
  setAddedImages: (addedImages: Image[]) => void
  setImage: (image: string | undefined) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
} & ComponentProps<'div'>

export const CropModal = ({
  actionButtonName,
  addedImages,
  cancelButtonName,
  children,
  className,
  croppedAreaPixels,
  handleSaveDraft,
  image,
  onAction,
  onCancel,
  open,
  setAddedImages,
  setImage,
  setIsBaseModalOpen,
  showSeparator = true,
  title,
}: Props) => {
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
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [activeFilter, setActiveFilter] = useState<ImageFilter>('none')
  const [openSureModal, setOpenSureModal] = useState<boolean>(false)
  const areYouSureRef = useRef(null)

  const { t } = useTranslate()

  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onCancelHandler() {
    setIsModalOpen(false)
    setIsBaseModalOpen(true)
    setAddedImages([])
  }

  const setFilterHandler = (activeFilter: ImageFilter) => {
    setActiveFilter(activeFilter)
  }

  return (
    <div>
      {isModalOpen && (
        <Dialog onOpenChange={open => !open && setOpenSureModal(true)} open={open}>
          <DialogPortal>
            <DialogOverlay className={s.DialogOverlay} />
            <DialogContent className={classNames.content}>
              <div className={s.titleWrapper} id={'titleWrap'}>
                <button className={s.arrowButton} onClick={onCancelHandler}>
                  <ArrowBackIcon />
                </button>
                <div className={s.nextButton}>
                  <FiltersModal
                    activeFilter={activeFilter}
                    addedImages={addedImages}
                    croppedAreaPixels={croppedAreaPixels}
                    image={image}
                    isModalOpen={isModalOpen}
                    onCancel={cancelButtonHandler}
                    openSureModal={openSureModal}
                    setActiveFilter={setFilterHandler}
                    setAddedImages={setAddedImages}
                    setImage={setImage}
                    setIsBaseModalOpen={setIsBaseModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setOpenSureModal={setOpenSureModal}
                    title={t.posts.createPost.filters}
                  >
                    <SelectedImages
                      addedImages={addedImages}
                      setActiveFilter={setActiveFilter}
                      setAddedImages={setAddedImages}
                    />
                  </FiltersModal>
                </div>
                <DialogTitle className={s.DialogTitle}>
                  <Typography variant={'h1'}>{title}</Typography>
                  <Separator className={classNames.separator} />
                </DialogTitle>
              </div>
              <div ref={areYouSureRef}>
                <AreYouSureCreatePostModal
                  handleSaveDraft={handleSaveDraft}
                  openSureModal={openSureModal}
                  setImage={setImage}
                  setIsBaseModalOpen={setIsBaseModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  setOpenSureModal={setOpenSureModal}
                />
              </div>
              <div className={s.contentBox}>{children}</div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  )
}

function getContentClassName(className?: string) {
  return clsx(className, s.DialogContent)
}
