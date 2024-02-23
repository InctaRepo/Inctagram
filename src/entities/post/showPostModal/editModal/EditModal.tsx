import React, { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from '@/entities/post/showPostModal/editModal/editModal.module.scss'
import CloseIcon from '@/public/icon/closeIcon.svg'

// export type ModalSize = 'edit'

type Props = {
  setIsEditModalOpen: (open: boolean) => void
  open?: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  showSeparator?: boolean
  children?: ReactNode
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
  title,
  className,
  children,
  ...rest
}: Props) => {
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
  if (size === 'edit') return s.edit
}
