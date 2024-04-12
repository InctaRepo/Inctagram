import React from 'react'

import { useDeletePostMutation } from '@/features/posts/editDeletePost/postDeleteModal/service/deletePost'
import Delete from '@/public/icon/deletePost.svg'
import { getUserId } from '@/shared/hoc'
import { useAppSelector, useTranslate } from '@/shared/hooks'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

import s from '@/features/posts/editDeletePost/postDescription/editDescription/ui/editDescriptionModal.module.scss'

type Props = {
  id: string
  openDeleteModal: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  setOpenDeleteModal: (openDeleteModal: boolean) => void
}

export const PostDeleteModal = ({
  id,
  openDeleteModal,
  setIsEditModalOpen,
  setOpenDeleteModal,
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
        <Delete alt={'delete post'} height={24} width={24} />
        <Typography variant={'regular14'}>{t.posts.deletePost.delete}</Typography>
      </div>
      <div hidden={!openDeleteModal}>
        <Modal
          actionButtonName={t.posts.deletePost.yes}
          cancelButtonName={t.posts.deletePost.no}
          id={'deleteModal'}
          modalWidth={'sm'}
          onAction={discardHandler}
          onCancel={onModalClose}
          onClose={onModalClose}
          open={openDeleteModal}
          title={t.posts.deletePost.delete}
        >
          <Typography variant={'h3'}>{t.posts.deletePost.areYouSure}</Typography>
        </Modal>
      </div>
    </>
  )
}
