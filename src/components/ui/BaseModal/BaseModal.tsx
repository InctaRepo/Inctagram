import { ComponentProps, FC, ReactNode } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import CloseIcon from '@/src/assets/icons/close-icon'
import { Typography } from '@/src/components/ui/typography'
import s from 'src/components/ui/BaseModal/base-modal.module.scss'

export type ModalSize = 'sm' | 'md' | 'lg'

export type ModalProps = {
  open: boolean
  onClose?: () => void
  renderCancelButton?: () => ReactNode
  renderActionButton?: () => ReactNode
  showSeparator?: boolean
  showCloseButton?: boolean
  title?: string
  modalWidth?: ModalSize //sm - 378px,md - 492px,lg - 644px.
  children?: ReactNode
  className?: string
} & ComponentProps<'div'>

export const BaseModal: FC<ModalProps> = ({
  onClose,
  open,
  renderActionButton,
  renderCancelButton,
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

  function onCloseHandler() {
    onClose?.()
  }

  return (
    <Dialog open={open} onOpenChange={onCloseHandler}>
      {open && (
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              {showCloseButton && (
                <DialogClose>
                  <button className={s.IconButton}>
                    <CloseIcon />
                  </button>
                </DialogClose>
              )}
              <DialogTitle className={s.DialogTitle}>
                <Typography variant={'h1'}>{title}</Typography>
                {showSeparator && <Separator className={s.separator} />}
              </DialogTitle>
            </div>

            <div className={s.contentBox}>{children}</div>

            <div className={s.footerBlock}>
              <DialogClose>{renderCancelButton?.()}</DialogClose>
              <DialogClose className={s.actionButton}>{renderActionButton?.()}</DialogClose>
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
