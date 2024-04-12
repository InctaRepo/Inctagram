import React, { ComponentPropsWithoutRef, ReactNode } from 'react'

import CloseIcon from '@/public/icon/closeIcon.svg'
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from '@/entities/post/showPostModal/editModal/editModal.module.scss'

// export type ModalSize = 'edit'

type Props = {
  actionButtonName?: string
  cancelButtonName?: string // if no props , visibility = hidden
  children?: ReactNode
  className?: string
  isDescription?: boolean
  onAction?: () => void
  onCancel?: () => void
  onClose?: () => void
  open?: boolean
  openSureDescriptionModal: boolean
  setDeletePostModal?: (openSureModal: boolean) => void
  setIsEditDescriptionModalOpen?: (isEditDescriptionModalOpen: boolean) => void
  setIsEditModalOpen: (open: boolean) => void
  setOpenSureDescriptionModal?: (openSureDescriptionModal: boolean) => void
  showSeparator?: boolean
} & ComponentPropsWithoutRef<'div'>

export const EditModal = ({
  actionButtonName,
  cancelButtonName,
  children,
  className,
  isDescription,
  onAction,
  onCancel,
  onClose,
  open,
  openSureDescriptionModal,
  setIsEditDescriptionModalOpen,
  setIsEditModalOpen,
  setOpenSureDescriptionModal,
  showSeparator = true,
  title,
  ...rest
}: Props) => {
  const classNames = {
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      <s className={'actionButton'}></s>
    ),
    content: getContentClassName(className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
    wrapper: clsx(s.wrapper),
  }

  function onCloseHandler() {
    onClose?.()
  }

  return (
    <>
      <Dialog
        onOpenChange={open =>
          !open && setOpenSureDescriptionModal && setOpenSureDescriptionModal(true)
        }
        open={open}
      >
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />

          <DialogContent className={classNames.content} {...rest}>
            {!isDescription ? (
              <div className={s.IconButtonNone}></div>
            ) : (
              <div className={s.IconButton} onClick={onCloseHandler}>
                <CloseIcon />
              </div>
            )}

            <div className={s.contentBox}>{children}</div>
          </DialogContent>
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
  if (size === 'edit') {
    return s.edit
  }
}
