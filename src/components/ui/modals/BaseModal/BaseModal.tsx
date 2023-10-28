import { ComponentProps, ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'
import dynamic from 'next/dynamic'

// eslint-disable-next-line import/no-named-as-default
import CloseIcon from '@/src/assets/icons/close-icon'
import { Button } from '@/src/components/ui/button'
import { AppLoader } from '@/src/components/ui/loader'
import s from '@/src/components/ui/modals/BaseModal/base-modal.module.scss'
import { Typography } from '@/src/components/ui/typography'

export type ModalSize = 'sm' | 'md' | 'lg'

export type ModalProps = {
  open: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  modalWidth?: ModalSize //sm - 378px,md - 492px,lg - 644px.
  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<'div'>

const BaseModal: FC<ModalProps> = ({
  showSeparator = true,
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
  ...rest
}) => {
  const classNames = {
    content: getContentClassName(modalWidth, className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      s.actionButton
    ),
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
            <Button className={classNames.actionButton} onClick={actionButtonHandler}>
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
  if (size === 'sm') return s.sm
  if (size === 'md') return s.md
  if (size === 'lg') return s.lg
}

export default BaseModal // do not export this , instead use dynamic import "Modal" for js bundle reduce
export const Modal = dynamic(() => import('@/src/components/ui/modals/BaseModal/BaseModal'), {
  loading: () => <AppLoader />,
  ssr: false,
})
