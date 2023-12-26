import React from 'react'

import { useTranslate } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui/typography'
import CloseIconOutline from 'public/icon/closeOutlineIcon.svg'
import s from 'src/entities/post/showPostModal/editModal/areYouSureDescriptionModal/areYouSureDescriptionModal.module.scss'
import { Modal } from 'src/shared/ui/modal'

type Props = {
  openSureDescriptionModal: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  setIsEditDescriptionModalOpen?: (isEditDescriptionModalOpen: boolean) => void
  setOpenSureDescriptionModal?: (openSureDescriptionModal: boolean) => void
}

export const AreYouSureDescriptionModal = ({
  setIsEditModalOpen,
  openSureDescriptionModal,
  setOpenSureDescriptionModal,
  setIsEditDescriptionModalOpen,
}: Props) => {
  const { t } = useTranslate()
  const onModalClose = () => {
    if (setOpenSureDescriptionModal) {
      setOpenSureDescriptionModal(false)
    }
  }
  const clickHandler = () => {
    if (setOpenSureDescriptionModal) {
      setOpenSureDescriptionModal(true)
    }
  }

  const discardHandler = () => {
    if (setIsEditModalOpen) {
      setIsEditModalOpen(false)
    }
    if (setOpenSureDescriptionModal) {
      setOpenSureDescriptionModal(false)
    }
    if (setIsEditDescriptionModalOpen) {
      setIsEditDescriptionModalOpen(false)
    }
  }

  return (
    <>
      <div className={s.close} onClick={clickHandler}>
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
