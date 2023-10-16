import React, { ComponentProps, FC, ReactNode, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import s from './edit-post-modal.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import { ArrowBack } from '@/src/assets/icons/arrow-back-icon'
import DescriptionModal from '@/src/components/profile/new-post/add-description/add-description-modal'
import { PostDescription } from '@/src/components/profile/new-post/edit-delete-post/post-description/post-description'
import { PostImages } from '@/src/components/profile/new-post/edit-delete-post/post-photos/post-photos'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'

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

export const EditPostModal: FC<ModalProps> = ({
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
}) => {
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
    <div>
      <Dialog open={isEditModalOpen} onOpenChange={open => !open && setDeletePostModal(true)}>
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={classNames.wrapper}>
              <PostImages />
              <PostDescription />
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

export default DescriptionModal
