import React from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,@conarti/feature-sliced/absolute-relative
import { useDeletePostMutation } from '@/src/features/posts/service/postApi'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { Modal } from '@/src/shared/ui/Modal'
import { Typography } from '@/src/shared/ui/typography'
import Delete from '../../../../../../public/icon/deletePost.svg'
import s from '../../postDescription/editDescription/ui/EditDescriptionModal.module.scss'

export type ModalProps = {
  id: string
  openDeleteModal: boolean
  setOpenDeleteModal: (openDeleteModal: boolean) => void
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
}

export const DeleteModal = ({
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
