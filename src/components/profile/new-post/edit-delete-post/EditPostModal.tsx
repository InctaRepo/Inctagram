import React, { ComponentProps, ReactNode, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './EditPostModal.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import DescriptionModal from '@/src/components/profile/new-post/create-post/add-description/AddDescriptionModal'
import { RightDescription } from '@/src/components/profile/new-post/edit-delete-post/post-description/RightDescription'
import { PostImages } from '@/src/components/profile/new-post/edit-delete-post/post-photos/PostPhotos'

export type ModalProps = {
  open: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  showSeparator?: boolean
  children?: ReactNode
  className?: string
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string
  setDeletePostModal: (openSureModal: boolean) => void
} & ComponentProps<'div'>

export const EditPostModal = ({
  open,
  onClose,
  onAction,
  onCancel,
  showSeparator,
  cancelButtonName,
  actionButtonName,
  setDeletePostModal,
  children,
  className,
}: ModalProps) => {
  const classNames = {
    content: getContentClassName(className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
    wrapper: clsx(s.wrapper),
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      s.actionButton
    ),
  }
  const [isEditModalOpen, setIsEditModalOpen] = useState(true)

  const { t } = useTranslate()

  return (
    <Dialog open={isEditModalOpen} onOpenChange={open => !open && setDeletePostModal(true)}>
      <DialogPortal>
        <DialogOverlay className={s.DialogOverlay} />
        <DialogContent className={classNames.content}>
          <div className={classNames.wrapper}>
            <PostImages />
            <RightDescription
              isEditModalOpen={isEditModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </div>

          <div className={s.contentBox}>{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

function getContentClassName(className?: string) {
  return clsx(className, s.DialogContent)
}

export default DescriptionModal
