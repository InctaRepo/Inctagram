import React, { ComponentProps, ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import s from '@/features/posts/createPost/addDescription/ui/addDescriptionModal.module.scss'
import ArrowBackIcon from '@/public/icon/arrowBackIcon.svg'
import { useTranslate } from '@/shared/hooks/useTranslate'
import { Image } from '@/shared/types'
import { Button } from '@/ui/button'
import { Typography } from '@/ui/typography'

export type ModalProps = {
  image?: string
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  isFiltersModalOpen: boolean
  setIsFiltersModalOpen: (isFiltersModalOpen: boolean) => void
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  children?: ReactNode
  className?: string
  setOpenSureModal: (openSureModal: boolean) => void
  addedImages: Image[]
  setAddedImages: (addedImages: Awaited<Image[]>) => void
  sendFilteredImg: () => void
  isDescriptionModalOpen: boolean
  setIsDescriptionModalOpen: (isDescriptionModalOpen: boolean) => void
} & ComponentProps<'div'>

export const AddDescriptionModal = ({
  setIsFiltersModalOpen,
  showSeparator = true,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  setOpenSureModal,
  sendFilteredImg,
  setIsDescriptionModalOpen,
  isDescriptionModalOpen,
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
  const { t } = useTranslate()

  const handleBackClick = () => {
    setIsDescriptionModalOpen(false)
    setIsFiltersModalOpen(true)
  }

  const handleNext = () => {
    setIsDescriptionModalOpen(true)
  }

  const handlePublish = () => {
    sendFilteredImg()
  }

  return (
    <div>
      <Button variant="text" className={s.nextButton} onClick={handleNext}>
        {t.profile.next}
      </Button>
      <Dialog open={isDescriptionModalOpen} onOpenChange={open => !open && setOpenSureModal(true)}>
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              <button className={s.arrowButton} onClick={handleBackClick}>
                <ArrowBackIcon />
              </button>

              <DialogTitle className={s.DialogTitle}>
                <Typography variant={'h1'}>{title}</Typography>
              </DialogTitle>
              <div className={s.next}>
                <Button variant="text" className={s.nextButton} onClick={handlePublish}>
                  {t.posts.createPost.publish}
                </Button>
              </div>
            </div>
            <Separator className={classNames.separator} />
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
