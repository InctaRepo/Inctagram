import React from 'react'
import { CloseIconOutline } from '@/src/assets/icons/close-outline'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { Modal } from '@/src/shared/ui/Modal'
import { Typography } from '@/src/shared/ui/typography'
import s from '../../editDeletePost/postDescription/editDescription/EditDescriptionModal.module.scss'

type ModalProps = {
  openSureDescriptionModal: boolean

  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  setOpenSureDescriptionModal: (openSureDescriptionModal: boolean) => void
}

export const AreYouSureDescriptionModal = ({
  openSureDescriptionModal,
  setOpenSureDescriptionModal,
  setIsEditDescriptionModalOpen,
}: ModalProps) => {
  const { t } = useTranslate()
  const onModalClose = () => {
    setOpenSureDescriptionModal(false)
  }

  const discardHandler = () => {
    setOpenSureDescriptionModal(false)
    setIsEditDescriptionModalOpen(false)
  }

  return (
    <>
      <div className={s.close} onClick={() => setOpenSureDescriptionModal(true)}>
        <CloseIconOutline />
      </div>
      <div hidden={!openSureDescriptionModal}>
        <Modal
          id={'areYouSureDescriptionModal'}
          modalWidth={'sm'}
          title={t.profile.editPost.closePost}
          open={openSureDescriptionModal}
          cancelButtonName={t.profile.editPost.no}
          actionButtonName={t.profile.editPost.yes}
          onClose={onModalClose}
          onCancel={onModalClose}
          onAction={discardHandler}
        >
          <Typography variant={'h3'}>{t.profile.editPost.question}</Typography>
        </Modal>
      </div>
    </>
  )
}
