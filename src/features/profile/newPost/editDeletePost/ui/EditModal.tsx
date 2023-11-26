import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'
import React, { ComponentPropsWithoutRef, ReactNode, useState } from 'react'
import { CloseIcon } from '@/src/assets/icons/close-icon'
import { CloseIconOutline } from '@/src/assets/icons/close-outline'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { AreYouSureDescriptionModal } from '@/src/features/profile/newPost/editDeletePost/smallModals/AreYouSureDescriptionModal'
import s from './EditModal.module.scss'

export type ModalSize = 'edit'

export type ModalProps = {
  setIsEditModalOpen: (open: boolean) => void
  open?: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  showSeparator?: boolean
  children?: ReactNode
  modalWidth?: ModalSize
  className?: string
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string
  setDeletePostModal?: (openSureModal: boolean) => void
  isDescription?: boolean
  setIsEditDescriptionModalOpen?: (isEditDescriptionModalOpen: boolean) => void
  openSureDescriptionModal: boolean
  setOpenSureDescriptionModal?: (openSureDescriptionModal: boolean) => void
} & ComponentPropsWithoutRef<'div'>

export const EditModal = ({
  openSureDescriptionModal,
  setOpenSureDescriptionModal,
  setIsEditModalOpen,
  setIsEditDescriptionModalOpen,
  isDescription,
  showSeparator = true,
  onClose,
  onAction,
  onCancel,
  open,
  cancelButtonName,
  actionButtonName,
  modalWidth,
  title,
  className,
  children,
  ...rest
}: ModalProps) => {
  const classNames = {
    content: getContentClassName(className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
    wrapper: clsx(s.wrapper),
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      <s className="actionButton"></s>
    ),
  }

  function onCloseHandler() {
    onClose?.()
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={open =>
          !open && setOpenSureDescriptionModal && setOpenSureDescriptionModal(true)
        }
      >
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />

          <DialogContent className={classNames.content} {...rest}>
            {!isDescription ? (
              <div className={s.IconButtonNone}></div>
            ) : (
              <div onClick={onCloseHandler} className={s.IconButton}>
                <CloseIconOutline />
              </div>
            )}

            <div className={s.contentBox}>{children}</div>
          </DialogContent>
          <AreYouSureDescriptionModal
            setIsEditModalOpen={setIsEditModalOpen}
            setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            openSureDescriptionModal={openSureDescriptionModal}
            setOpenSureDescriptionModal={setOpenSureDescriptionModal}
          />
        </DialogPortal>
      </Dialog>
    </>
  )
}

function getContentClassName(size: string | undefined, className?: string) {
  const sizeClassName = getSizeClassName(size)

  return clsx(className, s.DialogContent, sizeClassName)
}

function getSizeClassName(size: string | undefined) {
  if (size === 'edit') return s.edit
}

export default EditModal
