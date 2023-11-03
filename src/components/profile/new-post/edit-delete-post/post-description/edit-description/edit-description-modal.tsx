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
import Image from 'next/image'

import s from './edit-description-modal.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import edit from '@/src/assets/icons/edit.svg'
import { PostDescription } from '@/src/components/profile/new-post/create-post/add-description/description/description'
import { PostImages } from '@/src/components/profile/new-post/edit-delete-post/post-photos/post-photos'
import { AreYouSureDescriptionModal } from '@/src/components/profile/new-post/edit-delete-post/small-modals/are-you-sure-description-modal'
import { Typography } from '@/src/components/ui/typography'

export type ModalProps = {
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  children?: ReactNode
  className?: string
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  setDeletePostModal?: (openSureModal: boolean) => void
} & ComponentProps<'div'>

export const EditDescriptionModal: FC<ModalProps> = ({
  showSeparator = true,
  onAction,
  onCancel,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  isEditModalOpen,
  setIsEditModalOpen,
  setDeletePostModal,
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
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)
  const [openSureDescriptionModal, setOpenSureDescriptionModal] = useState<boolean>(false)

  const { t } = useTranslate()

  const handlePublish = () => {
    if (setIsEditDescriptionModalOpen) {
      setIsEditDescriptionModalOpen(true)
    }

    if (setIsEditModalOpen) {
      setIsEditModalOpen(false)
    }
  }

  console.log(isEditDescriptionModalOpen)
  console.log(isEditModalOpen)

  return (
    <>
      <div className={s.editOption1} onClick={handlePublish}>
        <Image src={edit} alt={'edit'} width={24} height={24} />
        <Typography variant={'regular14'}>{t.profile.profileSetting.edit}</Typography>
      </div>
      <Dialog
        open={isEditDescriptionModalOpen}
        onOpenChange={open => !open && setOpenSureDescriptionModal(true)}
      >
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              <div className={s.next}>
                <DialogTitle className={s.DialogTitle}>
                  <Typography variant={'h1'}>{t.profile.editPost.edit}</Typography>
                  <Separator className={classNames.separator} />
                </DialogTitle>
              </div>
              <div>
                <AreYouSureDescriptionModal
                  openSureDescriptionModal={openSureDescriptionModal}
                  setOpenSureDescriptionModal={setOpenSureDescriptionModal}
                  setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
                />
              </div>
            </div>
            <div className={s.wrapper}>
              <PostImages />
              <PostDescription />
            </div>
            <div>
              <AreYouSureDescriptionModal
                openSureDescriptionModal={openSureDescriptionModal}
                setOpenSureDescriptionModal={setOpenSureDescriptionModal}
                setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
              />
            </div>
            <div className={s.contentBox}>{children}</div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

function getContentClassName(className?: string) {
  return clsx(className, s.DialogContent)
}

export default EditDescriptionModal
