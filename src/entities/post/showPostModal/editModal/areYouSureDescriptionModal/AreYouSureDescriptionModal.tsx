import React from 'react'

import s from '@/entities/post/showPostModal/editModal/areYouSureDescriptionModal/areYouSureDescriptionModal.module.scss'
import CloseIcon from '@/public/icon/closeIcon.svg'
import { useTranslate } from '@/shared/hooks'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

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
      {/* <div className={s.close} onClick={clickHandler}>
        <CloseIcon />
      </div>
      <div hidden={!openSureDescriptionModal}>
        <Modal
          id={'areYouSureDescriptionModal'}
          modalWidth={'sm'}
          title={t.posts.editPost.closePost}
          open={openSureDescriptionModal}
          cancelButtonName={t.posts.editPost.no}
          actionButtonName={t.posts.editPost.yes}
          onClose={onModalClose}
          onCancel={onModalClose}
          onAction={discardHandler}
        >
          <Typography variant={'h3'}>{t.posts.editPost.question}</Typography>
        </Modal>
      </div> */}
    </>
  )
}
