import React from 'react'

import { useDeletePostMutation } from '@/src/features/posts/editDeletePost/postDeleteModal/service/deletePost'
import { useTranslate } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui/typography'
import Delete from 'public/icon/deletePost.svg'
import s from 'src/features/posts/editDeletePost/postDescription/editDescription/ui/editDescriptionModal.module.scss'
import { Modal } from 'src/shared/ui/modal'

export type ModalProps = {
  id: string | string[] | undefined
  openDeleteModal: boolean
  setOpenDeleteModal: (openDeleteModal: boolean) => void
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
}

export const PostDeleteModal = ({
  id,
  openDeleteModal,
  setOpenDeleteModal,
  setIsEditModalOpen,
}: ModalProps) => {
  const { t } = useTranslate()
  const [deletePost] = useDeletePostMutation()
  const onModalClose = () => {
    setOpenDeleteModal(false)
  }

  const discardHandler = () => {
    deletePost(id)
      .unwrap()
      .then(() => {
        setOpenDeleteModal(false)
        if (setIsEditModalOpen) {
          setIsEditModalOpen(false)
        }
      })
  }

  return (
    <>
      <div className={s.editOption} onClick={() => setOpenDeleteModal(true)}>
        <Delete alt={'delete post'} width={24} height={24} />
        <Typography variant={'regular14'}>{t.profile.editPost.delete}</Typography>
      </div>
      <div hidden={!openDeleteModal}>
        <Modal
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
        </Modal>
      </div>
    </>
  )
}
