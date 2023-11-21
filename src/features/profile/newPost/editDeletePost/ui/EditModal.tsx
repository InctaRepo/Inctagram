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
import s from './EditModal.module.scss'

export type ModalSize = 'edit'

export type ModalProps = {
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
} & ComponentPropsWithoutRef<'div'>

export const EditModal = ({
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
  const [isModalOpen, setIsModalOpen] = useState(true)

  const [openSureModal, setOpenSureModal] = useState<boolean>(false)

  function onCloseHandler() {
    onClose?.()
  }

  return (
    <>
      {isModalOpen && (
        <Dialog open={open} onOpenChange={open => !open && setOpenSureModal(true)}>
          <DialogPortal>
            <DialogOverlay className={s.DialogOverlay} />

            <DialogContent className={classNames.content} {...rest}>
              <button onClick={onCloseHandler} className={s.IconButton}>
                <CloseIcon />
              </button>
              <div className={s.contentBox}>{children}</div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
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
