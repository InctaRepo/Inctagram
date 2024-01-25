import React from 'react'

import { useDeletePostMutation } from '@/features/posts/editDeletePost/postDeleteModal/service/deletePost'
import s from '@/features/posts/editDeletePost/postDescription/editDescription/ui/editDescriptionModal.module.scss'
import Delete from '@/public/icon/deletePost.svg'
import { getUserId } from '@/shared/hoc'
import { useAppSelector, useTranslate } from '@/shared/hooks'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

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
        <Typography variant={'regular14'}>{t.posts.deletePost.delete}</Typography>
      </div>
      <div hidden={!openDeleteModal}>
        <Modal
          id={'deleteModal'}
          modalWidth={'sm'}
          title={t.posts.deletePost.delete}
          open={openDeleteModal}
          cancelButtonName={t.posts.deletePost.no}
          actionButtonName={t.posts.deletePost.yes}
          onClose={onModalClose}
          onCancel={onModalClose}
          onAction={discardHandler}
        >
          <Typography variant={'h3'}>{t.posts.deletePost.areYouSure}</Typography>
        </Modal>
      </div>
    </>
  )
}
