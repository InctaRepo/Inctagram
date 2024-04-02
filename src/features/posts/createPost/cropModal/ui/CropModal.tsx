import React, { ComponentProps, ReactNode, useRef, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import { AreYouSureCreatePostModal } from '@/entities/post/createPost/areYouSureСreatePostModal'
import s from '@/features/posts/createPost/cropModal/ui/cropModal.module.scss'
import { CropArg } from '@/features/posts/createPost/croppedImage/ui/EasyCrop'
import { FiltersModal } from '@/features/posts/createPost/editPhoto/filters/FiltersModal'
import { SelectedImages } from '@/features/posts/createPost/editPhoto/filters/selectedImages/SelectedImages'
import ArrowBackIcon from '@/public/icon/arrowBackIcon.svg'
import { useTranslate } from '@/shared/hooks'
import { Image } from '@/shared/types'
import { ImageFilter } from '@/shared/types/posts/postsTypes'
import { Typography } from '@/ui/typography'

type Props = {
  image?: string
  open: boolean
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
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | undefined) => void
  handleSaveDraft: () => void
  croppedAreaPixels: CropArg | null
} & ComponentProps<'div'>

export const CropModal = ({
  image,
  showSeparator = true,
  onAction,
  onCancel,
  open,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  addedImages,
  setAddedImages,
  setIsBaseModalOpen,
  setImage,
  handleSaveDraft,
  croppedAreaPixels,
}: Props) => {
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
        <Dialog open={open} onOpenChange={open => !open && setOpenSureModal(true)}>
          <DialogPortal>
            <DialogOverlay className={s.DialogOverlay} />
            <DialogContent className={classNames.content}>
              <div className={s.titleWrapper} id={'titleWrap'}>
                <button className={s.arrowButton} onClick={onCancelHandler}>
                  <ArrowBackIcon />
                </button>
                <div className={s.nextButton}>
                  <FiltersModal
                    image={image}
                    addedImages={addedImages}
                    setAddedImages={setAddedImages}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onCancel={cancelButtonHandler}
                    title={t.posts.createPost.filters}
                    activeFilter={activeFilter}
                    setActiveFilter={setFilterHandler}
                    setIsBaseModalOpen={setIsBaseModalOpen}
                    setImage={setImage}
                    openSureModal={openSureModal}
                    setOpenSureModal={setOpenSureModal}
                    croppedAreaPixels={croppedAreaPixels}
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
                  openSureModal={openSureModal}
                  setOpenSureModal={setOpenSureModal}
                  setIsModalOpen={setIsModalOpen}
                  setIsBaseModalOpen={setIsBaseModalOpen}
                  setImage={setImage}
                  handleSaveDraft={handleSaveDraft}
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
