import { ComponentProps, FC, ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import CloseIcon from '@/src/assets/icons/close-icon'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'
import s from 'src/components/ui/BaseModal/base-modal.module.scss'

export type ModalSize = 'sm' | 'md' | 'lg'

export type ModalProps = {
  open: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  cancelButtonName?: string
  actionButtonName?: string
  showSeparator?: boolean
  showCloseButton?: boolean
  title?: string
  modalWidth?: ModalSize //sm - 378px,md - 492px,lg - 644px.
  children?: ReactNode
  className?: string
} & ComponentProps<'div'>

export const BaseModal: FC<ModalProps> = ({
  onClose,
  onAction,
  onCancel,
  open,
  cancelButtonName,
  actionButtonName,
  modalWidth = 'sm',
  title,
  className,
  children,
  showCloseButton = true,
  showSeparator = true,
}) => {
  const classNames = {
    content: getContentClassName(modalWidth, className),
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
      {open && (
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              {showCloseButton && (
                <button className={s.IconButton} onClick={onCloseHandler}>
                  <CloseIcon />
                </button>
              )}
              <DialogTitle className={s.DialogTitle}>
                <Typography variant={'h1'}>{title}</Typography>
                {showSeparator && <Separator className={s.separator} />}
              </DialogTitle>
            </div>

            <div className={s.contentBox}>{children}</div>

            <div className={s.footerBlock}>
              {cancelButtonName && (
                <Button className={s.widePaddingButton} onClick={cancelButtonHandler}>
                  {cancelButtonName}
                </Button>
              )}
              {actionButtonName && (
                <Button
                  className={`${s.widePaddingButton} ${s.actionButton}`}
                  onClick={actionButtonHandler}
                >
                  {actionButtonName}
                </Button>
              )}
            </div>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  )
}

function getContentClassName(size: ModalSize, className?: string) {
  const sizeClassName = getSizeClassName(size)

  return clsx(className, s.DialogContent, sizeClassName)
}

function getSizeClassName(size: ModalSize) {
  if (size === 'sm') return s.sm
  if (size === 'md') return s.md
  if (size === 'lg') return s.lg
}
