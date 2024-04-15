import React, { ComponentProps, ReactNode } from 'react'

import ArrowBackIcon from '@/public/icon/arrowBackIcon.svg'
import { useTranslate } from '@/shared/hooks/useTranslate'
import { Image } from '@/shared/types'
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

import s from '@/features/posts/createPost/addDescription/ui/addDescriptionModal.module.scss'

export type ModalProps = {
  actionButtonName?: string // if no props , visibility = hidden
  addedImages: Image[]
  cancelButtonName?: string // if no props , visibility = hidden
  children?: ReactNode
  className?: string
  image?: string
  isDescriptionModalOpen: boolean
  isFiltersModalOpen: boolean
  isModalOpen: boolean
  onAction?: () => void
  onCancel?: () => void
  onClose?: () => void
  sendFilteredImg: () => void
  setAddedImages: (addedImages: Awaited<Image[]>) => void
  setIsDescriptionModalOpen: (isDescriptionModalOpen: boolean) => void
  setIsFiltersModalOpen: (isFiltersModalOpen: boolean) => void
  setIsModalOpen: (isModalOpen: boolean) => void
  setOpenSureModal: (openSureModal: boolean) => void
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
} & ComponentProps<'div'>

export const AddDescriptionModal = ({
  actionButtonName,
  cancelButtonName,
  children,
  className,
  isDescriptionModalOpen,
  sendFilteredImg,
  setIsDescriptionModalOpen,
  setIsFiltersModalOpen,
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
      <Button className={s.nextButton} onClick={handleNext} variant={'text'}>
        {t.profile.next}
      </Button>
      <Dialog onOpenChange={open => !open && setOpenSureModal(true)} open={isDescriptionModalOpen}>
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
                <Button className={s.nextButton} onClick={handlePublish} variant={'text'}>
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
