import React from 'react'

import { useDeletePostMutation } from '@/src/features/posts/editDeletePost/postDeleteModal/service/deletePost'
import s from '@/src/features/posts/editDeletePost/postDescription/editDescription/ui/editDescriptionModal.module.scss'
import { getUserId } from '@/src/shared/hoc'
import { useAppSelector, useTranslate } from '@/src/shared/hooks'
import { Modal } from '@/src/shared/ui/modal'
import { Typography } from '@/src/shared/ui/typography'
import Delete from 'public/icon/deletePost.svg'

type Props = {
  id: string
  openDeleteModal: boolean
  setOpenDeleteModal: (openDeleteModal: boolean) => void
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
}

export const PostDeleteModal = ({
  id,
  openDeleteModal,
  setOpenDeleteModal,
  setIsEditModalOpen,
}: Props) => {
  const { t } = useTranslate()
  const userId = useAppSelector(getUserId)
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
          window.history.pushState(null, 'post', `/profile/${userId}`)
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
