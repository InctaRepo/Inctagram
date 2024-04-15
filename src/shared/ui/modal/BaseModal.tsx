import { ComponentPropsWithoutRef, ReactNode } from 'react'

import CloseIcon from '@/public/icon/closeIcon.svg'
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

import s from '@/ui/modal/baseModal.module.scss'

export type ModalSize = 'lg' | 'md' | 'sm'

type Props = {
  actionButtonName?: string // if no props , visibility = hidden
  cancelButtonName?: string // if no props , visibility = hidden
  children?: ReactNode
  className?: string
  fullWidthButton?: boolean
  modalWidth?: ModalSize //sm - 378px,md - 492px,lg - 644px.
  onAction?: () => void
  onCancel?: () => void
  onClose?: () => void
  open: boolean
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
} & ComponentPropsWithoutRef<'div'>

export const BaseModal = ({
  actionButtonName,
  cancelButtonName,
  children,
  className,
  fullWidthButton = false,
  modalWidth = 'sm',
  onAction,
  onCancel,
  onClose,
  open,
  showSeparator = true,
  title,
  ...rest
}: Props) => {
  const classNames = {
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      s.actionButton
    ),
    content: getContentClassName(modalWidth, className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
  }

  const actionButtonHandler = () => {
    onAction?.()
  }

  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onCloseHandler() {
    onClose?.()
  }

  return (
    <Dialog open={open}>
      <DialogPortal>
        <DialogOverlay className={s.DialogOverlay} />
        <DialogContent className={classNames.content} {...rest}>
          <div className={s.titleWrapper}>
            <button className={s.IconButton} onClick={onCloseHandler}>
              <CloseIcon />
            </button>
            <DialogTitle className={s.DialogTitle}>
              <Typography variant={'h1'}>{title}</Typography>
              <Separator className={classNames.separator} />
            </DialogTitle>
          </div>

          <div className={s.contentBox}>{children}</div>

          <div className={s.footerBlock}>
            <Button
              className={classNames.cancelButton}
              onClick={cancelButtonHandler}
              variant={'outlined'}
            >
              {cancelButtonName}
            </Button>
            <Button
              className={classNames.actionButton}
              fullWidth={fullWidthButton}
              onClick={actionButtonHandler}
            >
              {actionButtonName}
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

function getContentClassName(size: ModalSize, className?: string) {
  const sizeClassName = getSizeClassName(size)

  return clsx(className, s.DialogContent, sizeClassName)
}

function getSizeClassName(size: ModalSize) {
  if (size === 'sm') {
    return s.sm
  }
  if (size === 'md') {
    return s.md
  }
  if (size === 'lg') {
    return s.lg
  }
}
