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
import dynamic from 'next/dynamic'

import s from './crop-modal.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ArrowBack } from '@/src/assets/icons/arrow-back-icon'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'

export type ModalProps = {
  open: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  children?: ReactNode
  className?: string
} & ComponentProps<'div'>

const CropModal: FC<ModalProps> = ({
  showSeparator = true,
  onAction,
  onCancel,
  open,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
}) => {
  const classNames = {
    content: getContentClassName(className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      s.actionButton
    ),
  }
  const { t } = useTranslate()
  const actionButtonHandler = () => {
    onAction?.()
  }
  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onCancelHandler() {
    onCancel?.()
  }

  return (
    <Dialog open={open}>
      <DialogPortal>
        <DialogOverlay className={s.DialogOverlay} />
        <DialogContent className={classNames.content}>
          <div className={s.titleWrapper}>
            <button className={s.arrowButton} onClick={onCancelHandler}>
              <ArrowBack />
            </button>
            <button className={s.nextButton}>{t.profile.next}</button>
            <DialogTitle className={s.DialogTitle}>
              <Typography variant={'h1'}>{title}</Typography>
              <Separator className={classNames.separator} />
            </DialogTitle>
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

export default CropModal // do not export this , instead use dynamic import "Modal" for js bundle reduce
