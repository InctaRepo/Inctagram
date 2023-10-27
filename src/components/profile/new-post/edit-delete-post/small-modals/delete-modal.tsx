import React, { FC } from 'react'

import Image from 'next/image'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import trash from '@/src/assets/icons/trash.svg'
import s from '@/src/components/profile/new-post/edit-delete-post/post-description/edit-description/edit-description-modal.module.scss'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'
import { useDeletePostMutation } from '@/src/services/posts/post-api'

export type ModalProps = {
  openDeleteModal: boolean
  setOpenDeleteModal: (openDeleteModal: boolean) => void
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
}

export const DeleteModal: FC<ModalProps> = ({
  openDeleteModal,
  setOpenDeleteModal,
  setIsEditModalOpen,
}) => {
  const { t } = useTranslate()
  const [deletePost] = useDeletePostMutation()
  const onModalClose = () => {
    setOpenDeleteModal(false)
  }

  const discardHandler = () => {
    setOpenDeleteModal(false)
    if (setIsEditModalOpen) {
      setIsEditModalOpen(false)
    }
  }

  return (
    <>
      <div className={s.editOption} onClick={() => setOpenDeleteModal(true)}>
        <Image src={trash} alt={'edit'} width={24} height={24} />
        <Typography variant={'regular14'}>{t.profile.profileSetting.delete}</Typography>
      </div>
      <div hidden={!openDeleteModal}>
        <BaseModal
          id={'deleteModal'}
          modalWidth={'sm'}
          title={t.profile.deletePost.delete}
          open={openDeleteModal}
          cancelButtonName={t.profile.editPost.no}
          actionButtonName={t.profile.editPost.yes}
          onClose={onModalClose}
          onCancel={onModalClose}
          onAction={discardHandler}
        >
          <Typography variant={'h3'}>{t.profile.deletePost.areYouSure}</Typography>
        </BaseModal>
      </div>
    </>
  )
}
